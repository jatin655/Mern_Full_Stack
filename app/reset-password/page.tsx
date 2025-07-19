'use client';

import { EnhancedFooter } from "@/components/enhanced-footer";
import GooeyNav from "@/components/gooey-nav";
import Particles from "@/components/particles-background";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from 'next-auth/react';
import Link from "next/link";
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function ResetPasswordContent() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
  ];

  const { data: session, status } = useSession();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [tokenValid, setTokenValid] = useState(false);
  const [token, setToken] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      // Validate token
      validateToken(tokenFromUrl);
    } else {
      setError('Invalid reset link. Please request a new password reset.');
    }
  }, [searchParams]);

  const validateToken = async (token: string) => {
    try {
      const response = await fetch(`/api/reset-password/validate?token=${token}`);
      if (response.ok) {
        setTokenValid(true);
      } else {
        setError('Invalid or expired reset link. Please request a new password reset.');
      }
    } catch (err) {
      setError('Failed to validate reset link. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

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
        setMessage('Password reset successfully! You can now sign in with your new password.');
        setPassword('');
        setConfirmPassword('');
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setError(data.error || 'Failed to reset password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (session) {
    router.push('/dashboard');
    return null;
  }

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
            particleColors={["#10b981", "#34d399", "#6ee7b7", "#a7f3d0"]}
            speed={0.06}
            particleSpread={16}
            alphaParticles={true}
            particleBaseSize={95}
          />
        </div>
        <div className="relative z-10 w-full max-w-md mx-auto px-4">
          <Card className="shadow-2xl border-0 bg-black/5 backdrop-blur-[2px] border border-white/10">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-white drop-shadow-2xl">Reset Password</CardTitle>
              <CardDescription className="text-gray-100 drop-shadow-xl">
                Enter your new password below
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-400/20 rounded-md backdrop-blur-sm">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-sm text-red-300">{error}</p>
                  </div>
                </div>
              )}
              
              {message && (
                <div className="p-3 bg-green-500/10 border border-green-400/20 rounded-md backdrop-blur-sm">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <p className="text-sm text-green-300">{message}</p>
                  </div>
                </div>
              )}

              {tokenValid && !message && (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-100 drop-shadow-lg">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="w-full px-3 py-2 border border-white/20 bg-white/5 text-white rounded-md shadow-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors backdrop-blur-sm"
                      placeholder="Enter your new password"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-100 drop-shadow-lg">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={6}
                      className="w-full px-3 py-2 border border-white/20 bg-white/5 text-white rounded-md shadow-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors backdrop-blur-sm"
                      placeholder="Confirm your new password"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full py-2.5 text-base font-medium bg-blue-600/60 hover:bg-blue-700/70 backdrop-blur-sm border border-blue-400/30 text-white font-semibold shadow-2xl"
                    disabled={loading}
                  >
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </Button>
                </form>
              )}

              <div className="text-center pt-4 border-t border-white/20">
                <p className="text-sm text-gray-200 drop-shadow-lg">
                  Remember your password?{' '}
                  <Link
                    href="/login"
                    className="text-blue-400 hover:text-blue-300 font-medium underline drop-shadow-lg"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <EnhancedFooter />
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
