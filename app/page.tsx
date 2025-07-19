import { EnhancedFooter } from "@/components/enhanced-footer";
import GooeyNav from "@/components/gooey-nav";
import Particles from "@/components/particles-background";
import SplitText from "@/components/SplitText";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ClientHomeContent from "./components/ClientHomeContent";

export default function HomePage() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Admin", href: "/admin" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-black/50 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="text-xl font-bold text-white hover:text-gray-300 transition-colors drop-shadow-2xl"
              >
                MERN Tutorial
              </Link>
            </div>

            {/* Desktop Navigation with GooeyNav */}
            <div className="hidden md:flex items-center">
              <GooeyNav items={navItems} initialActiveIndex={0} />
            </div>

            {/* Client-side auth component */}
            <ClientHomeContent />

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" className="text-gray-200 hover:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden border-t bg-black/80 backdrop-blur-md border-white/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 text-base font-medium text-white bg-white/10 rounded-md">
                Home
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-base font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              >
                About
              </Link>
              <Link
                href="/dashboard"
                className="block px-3 py-2 text-base font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/admin"
                className="block px-3 py-2 text-base font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              >
                Admin
              </Link>
              {/* Mobile auth component */}
              <ClientHomeContent mobile />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Centered Home Page */}
      <main className="flex-1 relative flex items-center justify-center overflow-hidden pt-8">
        {/* Particles Background */}
        <div className="absolute inset-0 z-0">
          <Particles
            particleCount={350}
            particleColors={["#60a5fa", "#34d399", "#f59e0b", "#ef4444", "#8b5cf6"]}
            speed={0.08}
            particleSpread={20}
            alphaParticles={true}
            moveParticlesOnHover={true}
            particleHoverFactor={0.8}
            particleBaseSize={120}
          />
        </div>

        {/* Content overlay - Ultra transparent */}
        <div className="relative z-10 bg-black/10 backdrop-blur-[2px] rounded-3xl border border-white/10 shadow-2xl mt-8">
          {/* Welcome Section */}
          <div className="max-w-4xl mx-auto px-8 py-12 sm:px-12 lg:px-16 text-center">
            {/* Welcome Section */}
            <div className="space-y-8">
              {/* Large Welcome Heading */}
              <div className="space-y-4">
                <SplitText
                  text="Welcome to"
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight"
                  splitType="words"
                  delay={150}
                  duration={0.8}
                  from={{ opacity: 0, y: 60 }}
                  to={{ opacity: 1, y: 0 }}
                  textAlign="center"
                />
                <SplitText
                  text="MERN Tutorial"
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold text-blue-400 leading-tight"
                  splitType="words"
                  delay={200}
                  duration={0.8}
                  from={{ opacity: 0, y: 60 }}
                  to={{ opacity: 1, y: 0 }}
                  textAlign="center"
                />
              </div>

              {/* Short Description */}
              <p className="text-xl sm:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed drop-shadow-xl">
                Learn full-stack web development with MongoDB, Express.js, React, and Node.js. Build modern web
                applications from scratch with our comprehensive tutorial series.
              </p>

              {/* Get Started Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-8 py-4 text-lg bg-blue-600/60 hover:bg-blue-700/70 backdrop-blur-sm border border-blue-400/30 text-white font-semibold shadow-2xl"
                  asChild
                >
                  <Link href="/register">Get Started - Register</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-8 py-4 text-lg border-2 border-white/30 text-white hover:bg-white/10 hover:text-white bg-white/5 backdrop-blur-sm font-semibold shadow-2xl"
                  asChild
                >
                  <Link href="/login">Already have an account? Login</Link>
                </Button>
              </div>

              {/* Additional Info */}
              <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/5 border border-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm shadow-xl">
                    <svg
                      className="w-8 h-8 text-green-400 drop-shadow-2xl"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-white mb-2 drop-shadow-xl">Learn by Doing</h3>
                  <p className="text-gray-200 text-sm drop-shadow-lg">Hands-on tutorials with real projects</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/5 border border-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm shadow-xl">
                    <svg
                      className="w-8 h-8 text-blue-400 drop-shadow-2xl"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-white mb-2 drop-shadow-xl">Modern Stack</h3>
                  <p className="text-gray-200 text-sm drop-shadow-lg">Latest technologies and best practices</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/5 border border-purple-400/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm shadow-xl">
                    <svg
                      className="w-8 h-8 text-purple-400 drop-shadow-2xl"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-white mb-2 drop-shadow-xl">Community</h3>
                  <p className="text-gray-200 text-sm drop-shadow-lg">Join thousands of developers learning together</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <EnhancedFooter />
    </div>
  );
}
