'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [minecraftUsername, setMinecraftUsername] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [validatingToken, setValidatingToken] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Validate token on mount
  useEffect(() => {
    if (!token) {
      setError('Invalid or missing registration token')
      setValidatingToken(false)
      return
    }

    fetch(`/api/validate-token?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.valid) {
          setMinecraftUsername(data.minecraftUsername)
        } else {
          setError(data.error || 'Invalid or expired token')
        }
      })
      .catch(() => setError('Failed to validate token'))
      .finally(() => setValidatingToken(false))
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // Basic validation
    if (!formData.email || !formData.fullName || !formData.password || !formData.confirmPassword) {
      setError('All fields are required')
      setLoading(false)
      return
    }

    // Validate email domain
    if (!formData.email.endsWith('@thestreetlyacademy.co.uk')) {
      setError('Only @thestreetlyacademy.co.uk email addresses are allowed')
      setLoading(false)
      return
    }

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
      } else {
        setError(data.error || 'Registration failed')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (validatingToken) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6 flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
            <p className="text-slate-300">Validating registration token...</p>
          </CardContent>
        </Card>
      </main>
    )
  }

  if (success) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="w-16 h-16 text-green-400" />
            </div>
            <CardTitle className="text-white text-2xl">Registration Successful!</CardTitle>
            <CardDescription className="text-slate-400">
              Your account has been created
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-900/50 p-4 rounded-lg space-y-2">
              <p className="text-slate-300">
                <strong className="text-white">Minecraft Username:</strong> {minecraftUsername}
              </p>
              <p className="text-slate-300">
                <strong className="text-white">Email:</strong> {formData.email}
              </p>
            </div>
            <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
              <h3 className="text-white font-semibold mb-2">Next Steps:</h3>
              <ol className="list-decimal list-inside text-slate-300 space-y-1 text-sm">
                <li>Return to the Minecraft server</li>
                <li>Type: <code className="bg-slate-900 px-2 py-1 rounded text-blue-400">/login &lt;your-password&gt;</code></li>
                <li>Start playing!</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </main>
    )
  }

  if (error && !minecraftUsername) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="w-16 h-16 text-red-400" />
            </div>
            <CardTitle className="text-white text-2xl">Invalid Token</CardTitle>
            <CardDescription className="text-slate-400">
              {error}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 text-center text-sm">
              Please return to the Minecraft server and use <code className="bg-slate-900 px-2 py-1 rounded text-blue-400">/register</code> to get a new link.
            </p>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-2xl">Create Your Account</CardTitle>
          <CardDescription className="text-slate-400">
            Complete registration for Minecraft username: <span className="text-blue-400 font-semibold">{minecraftUsername}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="bg-slate-900/50 border-slate-600 text-white"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email Address</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-slate-900/50 border-slate-600 text-white"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-slate-900/50 border-slate-600 text-white"
                placeholder="••••••••"
                minLength={8}
              />
              <p className="text-xs text-slate-400">Must be at least 8 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="bg-slate-900/50 border-slate-600 text-white"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-500/30 p-3 rounded-lg flex gap-2 items-start">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
