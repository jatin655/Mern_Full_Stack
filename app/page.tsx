"use client";
import { EnhancedFooter } from "@/components/enhanced-footer";
import GooeyNav from "@/components/gooey-nav";
import Particles from "@/components/particles-background";
import SplitText from "@/components/SplitText";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ClientAboutContent from "./about/components/ClientAboutContent";
import SplineRobot from "./components/SplineRobot"; // Use relative path if needed

export default function HomePage() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Admin", href: "/admin" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-black/50 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 h-16 items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="text-xl font-bold text-white hover:text-gray-300 transition-colors drop-shadow-2xl"
              >
                MERN Tutorial
              </Link>
            </div>
            {/* Centered Navbar */}
            <div className="hidden md:flex justify-center items-center">
              <GooeyNav items={navItems} initialActiveIndex={0} />
            </div>
            {/* Auth/User Info */}
            <div className="flex justify-end items-center">
              <ClientAboutContent />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative flex items-center justify-center overflow-hidden pt-8">
        {/* Particles */}
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

        {/* Main content card (left) */}
        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-3xl mx-auto">
          <div className="bg-black/10 backdrop-blur-[2px] rounded-3xl border border-white/10 shadow-2xl mt-8 p-8">
            <div className="space-y-8">
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
              <p className="text-xl sm:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed drop-shadow-xl">
                Learn full-stack web development with MongoDB, Express.js, React, and Node.js. Build modern web
                applications from scratch with our comprehensive tutorial series.
              </p>
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
              {/* ...additional info blocks here if needed... */}
            </div>
          </div>
        </div>

        {/* Robot (fixed, not in flex flow) */}
        <div className="hidden lg:block w-[420px] h-[600px] fixed top-24 right-0 z-[100] pointer-events-none">
          <SplineRobot />
        </div>
      </main>

      <EnhancedFooter />
    </div>
  );
}
