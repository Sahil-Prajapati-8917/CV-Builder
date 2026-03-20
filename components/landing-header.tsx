"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/templates", label: "Templates" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#09090b]/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl shadow-black/20"
            : "bg-transparent"
        }`}
      >
        {/* Top glow line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow duration-500">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-400 to-purple-500 opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-white leading-none">CVForge</span>
              <span className="text-[9px] text-zinc-500 tracking-[0.2em] uppercase leading-none mt-0.5">Resume Builder</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-violet-500 to-purple-500 group-hover:w-3/4 transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/builder">
              <Button className="relative group bg-white text-zinc-900 hover:bg-zinc-100 text-sm font-semibold px-6 h-9 rounded-lg shadow-lg shadow-white/10 hover:shadow-white/20 transition-all duration-300 overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Create CV
                  <ChevronRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                </span>
                {/* Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 w-72 h-full bg-[#09090b]/95 backdrop-blur-2xl border-l border-white/[0.06] transition-transform duration-500 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 pt-20 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <Link href="/builder" onClick={() => setMobileOpen(false)}>
                <Button className="w-full bg-white text-zinc-900 hover:bg-zinc-100 text-sm font-semibold rounded-lg shadow-lg shadow-white/10">
                  Create CV
                  <ChevronRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
