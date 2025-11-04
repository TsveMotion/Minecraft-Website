'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Copy, Check, Server, ExternalLink, Shield, Zap, Users } from 'lucide-react'

const SERVER_IP = process.env.NEXT_PUBLIC_MINECRAFT_SERVER || 'Play.tsvweb.co.uk'

export default function Home() {
  const [copied, setCopied] = useState(false)

  const copyServerIP = () => {
    navigator.clipboard.writeText(SERVER_IP)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-5xl w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500">
            Streetly SMP
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 font-light px-4">
            Hosted & Sponsored by TSVWEB.CO.UK
          </p>
        </div>

        {/* Server IP Card - Enhanced */}
        <Card className="bg-gradient-to-br from-blue-900/40 to-slate-800/40 border-blue-500/40 backdrop-blur-sm shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-white flex items-center justify-center gap-3 text-2xl">
              <Server className="w-8 h-8 text-blue-400" />
              Server Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-950/60 p-4 sm:p-6 rounded-xl border-2 border-blue-500/30 hover:border-blue-500/50 transition-all">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <code className="text-xl sm:text-2xl md:text-3xl font-mono text-blue-400 font-bold tracking-wider break-all">{SERVER_IP}</code>
                <Button
                  onClick={copyServerIP}
                  variant="outline"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 border-blue-500 text-white transition-all transform hover:scale-105"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Copy IP
                    </>
                  )}
                </Button>
              </div>
            </div>
            <p className="text-center text-slate-400 text-sm sm:text-base px-2">
              Copy and paste into your Minecraft multiplayer server list
            </p>
          </CardContent>
        </Card>

        {/* Navigation Cards - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <Card className="bg-slate-800/40 border-slate-700/50 backdrop-blur-sm hover:border-blue-500/50 hover:bg-slate-800/60 transition-all duration-300 transform hover:-translate-y-1 shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-white text-xl">New Players</CardTitle>
                  <CardDescription className="text-slate-400">
                    First time joining? Start here
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <p className="text-slate-300 text-sm pt-1">Join the Minecraft server</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <p className="text-slate-300 text-sm pt-1">Type <code className="bg-slate-950 px-2 py-1 rounded text-blue-400 font-mono">/register</code></p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <p className="text-slate-300 text-sm pt-1">Click your unique registration link</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                  <p className="text-slate-300 text-sm pt-1">Complete the form and start playing!</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/40 border-slate-700/50 backdrop-blur-sm hover:border-green-500/50 hover:bg-slate-800/60 transition-all duration-300 transform hover:-translate-y-1 shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-white text-xl">Existing Players</CardTitle>
                  <CardDescription className="text-slate-400">
                    Already registered? Welcome back
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="bg-slate-950/40 p-3 rounded-lg border border-green-500/20">
                  <p className="text-slate-300 text-sm mb-1">
                    <strong className="text-green-400">In-Game Login:</strong>
                  </p>
                  <code className="text-green-400 bg-slate-950/60 px-3 py-2 rounded font-mono text-sm block">/login &lt;password&gt;</code>
                </div>
                <div className="bg-slate-950/40 p-3 rounded-lg border border-blue-500/20">
                  <p className="text-slate-300 text-sm mb-2">
                    <strong className="text-blue-400">Web Dashboard:</strong>
                  </p>
                  <Link href="/login">
                    <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg shadow-green-500/30 transform hover:scale-105 transition-all">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Access Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section - Enhanced */}
        <Card className="bg-slate-800/40 border-slate-700/50 backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-xl sm:text-2xl">Why Play on Streetly SMP?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-slate-900/60 to-slate-800/60 rounded-xl border border-slate-700/50 hover:border-blue-500/30 transition-all transform hover:-translate-y-1">
                <div className="inline-flex p-3 bg-blue-500/20 rounded-full mb-3">
                  <Shield className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Secure</h3>
                <p className="text-slate-400 text-sm">Military-grade bcrypt encryption protects your account</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-slate-900/60 to-slate-800/60 rounded-xl border border-slate-700/50 hover:border-purple-500/30 transition-all transform hover:-translate-y-1">
                <div className="inline-flex p-3 bg-purple-500/20 rounded-full mb-3">
                  <Zap className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Lightning Fast</h3>
                <p className="text-slate-400 text-sm">Instant authentication with optimized server performance</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-slate-900/60 to-slate-800/60 rounded-xl border border-slate-700/50 hover:border-green-500/30 transition-all transform hover:-translate-y-1">
                <div className="inline-flex p-3 bg-green-500/20 rounded-full mb-3">
                  <Users className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">User Friendly</h3>
                <p className="text-slate-400 text-sm">Simple 4-step registration gets you playing in minutes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer - Enhanced with link */}
        <div className="text-center space-y-2 pt-4">
          <p className="text-slate-400 text-sm">
            Powered by{' '}
            <a 
              href="https://tsvweb.co.uk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors underline decoration-blue-400/30 hover:decoration-blue-300"
            >
              tsvweb.co.uk
            </a>
          </p>
          <p className="text-slate-500 text-xs">TSV Network © 2025 • Minecraft Authentication System</p>
        </div>
      </div>
    </main>
  )
}
