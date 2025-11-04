import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, fullName, email, password } = body

    // Validate input
    if (!token || !fullName || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Find and validate the registration token
    const registrationToken = await prisma.registrationToken.findUnique({
      where: { token },
    })

    if (!registrationToken) {
      return NextResponse.json(
        { error: 'Invalid registration token' },
        { status: 404 }
      )
    }

    // Check if token has expired
    if (new Date() > registrationToken.expiresAt) {
      await prisma.registrationToken.delete({
        where: { token },
      })

      return NextResponse.json(
        { error: 'Registration token has expired' },
        { status: 410 }
      )
    }

    // Check if email is already in use
    const existingEmailUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingEmailUser) {
      return NextResponse.json(
        { error: 'Email address is already registered' },
        { status: 409 }
      )
    }

    // Check if username is already registered
    const existingUsernameUser = await prisma.user.findUnique({
      where: { minecraftUsername: registrationToken.minecraftUsername },
    })

    if (existingUsernameUser && existingUsernameUser.verified) {
      return NextResponse.json(
        { error: 'Minecraft username is already registered' },
        { status: 409 }
      )
    }

    // Hash the password with bcrypt (cost factor 12)
    const passwordHash = await bcrypt.hash(password, 12)

    // Create or update the user
    const user = await prisma.user.upsert({
      where: { minecraftUsername: registrationToken.minecraftUsername },
      update: {
        email,
        passwordHash,
        fullName,
        verified: true,
      },
      create: {
        email,
        passwordHash,
        fullName,
        minecraftUsername: registrationToken.minecraftUsername,
        verified: true,
      },
    })

    // Delete the used registration token
    await prisma.registrationToken.delete({
      where: { token },
    })

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: user.id,
        minecraftUsername: user.minecraftUsername,
        email: user.email,
        fullName: user.fullName,
      },
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    )
  }
}
