'use client';

import { EnhancedFooter } from '@/components/enhanced-footer';
import GooeyNav from '@/components/gooey-nav';
import Particles from '@/components/particles-background';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Login', href: '/login' },
  { label: 'Register', href: '/register' },
];

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <header className="sticky top-0 z-50 w-full border-b bg-black/50 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-xl font-bold text-white hover:text-gray-300 transition-colors drop-shadow-2xl"
              >
                MERN Tutorial
              </Link>
            </div>
            <div className="hidden md:flex items-center">
              <GooeyNav items={navLinks} initialActiveIndex={1} />
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-gray-200 hover:text-white hover:bg-white/10 backdrop-blur-sm drop-shadow-lg"
                asChild
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                className="bg-blue-600/60 hover:bg-blue-700/70 backdrop-blur-sm border border-blue-400/30 text-white font-semibold shadow-xl"
                asChild
              >
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 relative flex items-center justify-center py-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Particles
            particleCount={320}
            particleColors={["#f59e0b", "#fbbf24", "#fcd34d", "#fde68a"]}
            speed={0.06}
            particleSpread={16}
            alphaParticles={true}
            particleBaseSize={95}
          />
        </div>
        <div className="relative z-10 w-full max-w-md mx-auto px-4">
          <Card className="shadow-2xl border-0 bg-black/5 backdrop-blur-[2px] border border-white/10">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-white drop-shadow-2xl animate-fade-in-up">
                Forgot Password
              </CardTitle>
              <CardDescription className="text-gray-100 drop-shadow-xl">
                Enter your email address and we'll send you a link to reset your password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {message && (
                  <Alert className="border-green-200 bg-green-50">
                    <AlertDescription className="text-green-800">
                      {message}
                    </AlertDescription>
                  </Alert>
                )}

                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-800">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>

                <div className="text-center">
                  <Link
                    href="/login"
                    className="text-sm text-blue-400 hover:text-blue-300 font-medium underline drop-shadow-lg"
                  >
                    Back to Login
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <EnhancedFooter />
    </div>
  );
}
