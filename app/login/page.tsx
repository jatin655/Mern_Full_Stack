'use client';

import { EnhancedFooter } from "@/components/enhanced-footer";
import GooeyNav from "@/components/gooey-nav";
import Particles from "@/components/particles-background";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn, useSession } from 'next-auth/react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Admin", href: "/admin" },
  ];

  const { data: session, status } = useSession();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/"); // Redirect to home page
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: '/',
    });
    setLoading(false);
    if (res?.ok) {
      router.push('/');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    const res = await signIn('google', {
      redirect: false,
      callbackUrl: '/',
    });
    setLoading(false);
    if (res?.ok) {
      router.push('/');
    } else {
      setError('Google sign-in failed. Please try again.');
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // If authenticated, show a loading message while redirecting
  if (status === 'authenticated') {
    return <div className="min-h-screen flex items-center justify-center text-white">Redirecting to home...</div>;
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
              <CardTitle className="text-2xl font-bold text-white drop-shadow-2xl">Sign In</CardTitle>
              <CardDescription className="text-gray-100 drop-shadow-xl">
                Access your MERN tutorial dashboard
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
              
              {/* Google Sign-In Button */}
              <Button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full py-2.5 text-base font-medium bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold shadow-2xl flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>{loading ? 'Signing In...' : 'Continue with Google'}</span>
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-black/5 backdrop-blur-sm px-2 text-gray-300">Or continue with</span>
                </div>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-100 drop-shadow-lg">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-white/20 bg-white/5 text-white rounded-md shadow-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors backdrop-blur-sm"
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-100 drop-shadow-lg">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="w-full px-3 py-2 border border-white/20 bg-white/5 text-white rounded-md shadow-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors backdrop-blur-sm"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-200">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link
                      href="/forgot-password"
                      className="text-blue-400 hover:text-blue-300 font-medium underline drop-shadow-lg"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full py-2.5 text-base font-medium bg-blue-600/60 hover:bg-blue-700/70 backdrop-blur-sm border border-blue-400/30 text-white font-semibold shadow-2xl"
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
              <div className="text-center pt-4 border-t border-white/20">
                <p className="text-sm text-gray-200 drop-shadow-lg">
                  Don&apos;t have an account?{' '}
                  <Link
                    href="/register"
                    className="text-blue-400 hover:text-blue-300 font-medium underline drop-shadow-lg"
                  >
                    Register here
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