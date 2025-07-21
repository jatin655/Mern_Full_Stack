"use client";

import { EnhancedFooter } from '@/components/enhanced-footer';
import GooeyNav from '@/components/gooey-nav';
import Particles from '@/components/particles-background';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Lock } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Login', href: '/login' },
  { label: 'Register', href: '/register' },
];

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('Invalid reset link. Please request a new password reset.');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      setError('Invalid reset link. Please request a new password reset.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset successfully! You can now login with your new password.');
        setPassword('');
        setConfirmPassword('');
      } else {
        setError(data.error || 'Failed to reset password');
      }
    } catch (err) {
      setError('Failed to reset password. Please try again.');
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
            particleColors={["#34d399", "#6ee7b7", "#a7f3d0", "#10b981"]}
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
                Reset Password
              </CardTitle>
              <CardDescription className="text-gray-100 drop-shadow-xl">
                Enter your new password below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-white">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-white">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
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
                  disabled={isLoading || !token}
                >
                  {isLoading ? 'Resetting...' : 'Reset Password'}
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
