"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  FileText,
  Download,
  Palette,
  Shield,
  Zap,
  Star,
  ChevronRight,
  Check,
  Globe,
  Lock,
  Layers,
} from "lucide-react";
import { HeroBackground } from "@/components/hero-background";
import { LandingHeader } from "@/components/landing-header";

export default function HomePage() {
  const features = [
    {
      icon: FileText,
      title: "Intuitive Builder",
      description: "A guided 7-step form that feels effortless. No learning curve — just fill in and go.",
    },
    {
      icon: Palette,
      title: "6 ATS Templates",
      description: "Six hand-crafted designs, all scoring 100/100 on ATS compatibility. Switch anytime.",
    },
    {
      icon: Download,
      title: "Instant PDF Export",
      description: "One-click export to high-quality, ATS-friendly PDF. Ready for any job application.",
    },
    {
      icon: Shield,
      title: "Secure Sharing",
      description: "Generate private shareable links. Control exactly who sees your professional profile.",
    },
    {
      icon: Zap,
      title: "Real-time Preview",
      description: "Watch your CV come to life as you type. Every keystroke updates the preview instantly.",
    },
    {
      icon: Globe,
      title: "Works Everywhere",
      description: "No account needed. No data stored on servers. Everything lives in your browser.",
    },
    {
      icon: Lock,
      title: "100% Private",
      description: "Your data never leaves your device. No tracking, no analytics, no compromises.",
    },
    {
      icon: Layers,
      title: "Unlimited CVs",
      description: "Create as many CVs as you need. Duplicate, edit, and manage them all in one place.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Fill In Your Details",
      description: "Name, experience, education, skills — our step-by-step form guides you through everything.",
    },
    {
      number: "02",
      title: "Choose a Template",
      description: "Pick from Minimal, Modern, or Creative. Switch anytime — your content stays intact.",
    },
    {
      number: "03",
      title: "Preview & Refine",
      description: "See your CV update in real-time. Tweak details until it's exactly how you want it.",
    },
    {
      number: "04",
      title: "Export or Share",
      description: "Download as PDF, print directly, or share via a unique link. Your choice.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      text: "CVForge helped me land interviews at top tech companies. The Modern template was perfect for my industry.",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Product Designer at Figma",
      text: "I've tried dozens of CV builders. CVForge is the only one that felt premium without the premium price tag.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Data Scientist at Meta",
      text: "The live preview feature is a game-changer. I could see exactly how my CV would look while building it.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-white overflow-x-hidden">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-dark">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
              <FileText className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">CVForge</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/templates" className="text-sm text-zinc-400 hover:text-white transition-colors duration-300">
              Templates
            </Link>
            <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-white transition-colors duration-300">
              Dashboard
            </Link>
            <Link href="/builder">
              <Button className="bg-white text-zinc-900 hover:bg-zinc-100 text-sm font-semibold px-5 h-9 rounded-lg shadow-lg shadow-white/10 transition-all duration-300 hover:shadow-white/20">
                Create CV
                <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <HeroBackground />

        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-10 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              <span className="text-sm font-medium text-zinc-300">Free forever. No credit card. No catch.</span>
            </div>

            {/* Headline */}
            <h1 className="text-display mb-7">
              <span className="text-white">Craft Your</span>
              <br />
              <span className="gradient-text">Perfect CV</span>
            </h1>

            {/* Subheadline */}
            <p className="text-body md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Build stunning, professional resumes in minutes. 
              Choose from curated templates, export to PDF, and share with the world.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Link href="/builder">
                <Button size="lg" className="btn-premium text-base font-semibold px-10 h-14 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 rounded-xl shadow-2xl shadow-violet-600/30 hover:shadow-violet-600/50 transition-all duration-500">
                  Start Building Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/templates">
                <Button size="lg" variant="outline" className="text-base font-medium px-10 h-14 rounded-xl border-zinc-700 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white hover:border-zinc-500 transition-all duration-300">
                  Browse Templates
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 max-w-lg mx-auto">
              {[
                { value: "10K+", label: "Resumes Created" },
                { value: "6", label: "ATS Templates" },
                { value: "0$", label: "Cost. Forever." },
              ].map((stat, i) => (
                <div key={i} className={`text-center ${i === 1 ? "border-x border-zinc-800" : ""}`}>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs md:text-sm text-zinc-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-zinc-500 to-transparent" />
        </div>
      </section>

      {/* Social Proof Ticker */}
      <section className="py-6 border-y border-zinc-800/50 bg-zinc-950/50 overflow-hidden">
        <div className="marquee-container">
          <div className="animate-marquee flex gap-12 items-center text-zinc-500 text-sm font-medium">
            {["Google", "Meta", "Apple", "Netflix", "Stripe", "Figma", "Vercel", "Notion", "Linear", "Arc", "Google", "Meta", "Apple", "Netflix", "Stripe", "Figma", "Vercel", "Notion", "Linear", "Arc"].map((company, i) => (
              <span key={i} className="flex items-center gap-3 whitespace-nowrap">
                <span className="text-zinc-600">•</span>
                Used by engineers at {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* App Preview */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400 mb-4 block">The Interface</span>
            <h2 className="text-h2 text-white mb-4">Beautifully Simple</h2>
            <p className="text-body text-zinc-400 max-w-xl mx-auto">
              A distraction-free editor that lets you focus on what matters — your story.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Glow behind */}
            <div className="absolute -inset-8 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-fuchsia-600/20 rounded-3xl blur-3xl" />
            
            {/* Browser mockup */}
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-950 shadow-2xl shadow-black/50">
              {/* Title bar */}
              <div className="h-12 bg-zinc-900/80 border-b border-zinc-800/80 flex items-center px-5 gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-zinc-800/60 rounded-md px-4 py-1 text-xs text-zinc-500 font-mono">
                    cvforge.app/builder
                  </div>
                </div>
              </div>
              
              {/* App content */}
              <div className="aspect-[16/9] bg-zinc-900/50 p-6">
                <div className="flex gap-6 h-full">
                  {/* Form side */}
                  <div className="flex-1 bg-zinc-800/30 rounded-xl p-5 space-y-4">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="flex gap-1">
                        {[1,2,3,4,5,6,7].map(i => (
                          <div key={i} className={`w-8 h-1 rounded-full ${i <= 3 ? "bg-violet-500" : "bg-zinc-700"}`} />
                        ))}
                      </div>
                      <span className="text-xs text-zinc-500 ml-2">Step 3 of 7</span>
                    </div>
                    <div className="h-5 bg-zinc-700/50 rounded w-1/3" />
                    <div className="h-3 bg-zinc-700/30 rounded w-2/3" />
                    <div className="space-y-3 mt-4">
                      <div className="h-10 bg-zinc-800/60 rounded-lg border border-zinc-700/50 flex items-center px-3">
                        <span className="text-xs text-zinc-500">Bachelor of Technology</span>
                      </div>
                      <div className="h-10 bg-zinc-800/60 rounded-lg border border-zinc-700/50 flex items-center px-3">
                        <span className="text-xs text-zinc-500">MIT University</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="h-10 bg-zinc-800/60 rounded-lg border border-zinc-700/50 flex items-center px-3">
                          <span className="text-xs text-zinc-500">2020 - 2024</span>
                        </div>
                        <div className="h-10 bg-zinc-800/60 rounded-lg border border-zinc-700/50 flex items-center px-3">
                          <span className="text-xs text-zinc-500">8.5 CGPA</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Preview side */}
                  <div className="flex-1 bg-white rounded-xl p-5 shadow-inner">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-violet-100" />
                      <div>
                        <div className="h-3 bg-gray-800 rounded w-24 mb-1.5" />
                        <div className="h-2 bg-gray-300 rounded w-32" />
                      </div>
                    </div>
                    <div className="h-px bg-gray-200 mb-3" />
                    <div className="space-y-2">
                      <div className="h-2 bg-violet-600 rounded w-16 mb-2" />
                      <div className="h-1.5 bg-gray-200 rounded w-full" />
                      <div className="h-1.5 bg-gray-200 rounded w-5/6" />
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="h-2 bg-violet-600 rounded w-20 mb-2" />
                      <div className="flex justify-between">
                        <div>
                          <div className="h-2 bg-gray-800 rounded w-24 mb-1" />
                          <div className="h-1.5 bg-gray-300 rounded w-20" />
                        </div>
                        <div className="h-4 bg-violet-100 text-violet-700 rounded-full w-16 flex items-center justify-center">
                          <span className="text-[8px] font-medium">2024</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400 mb-4 block">Why CVForge</span>
            <h2 className="text-h2 text-white mb-4">Everything You Need. Nothing You Don&apos;t.</h2>
            <p className="text-body text-zinc-400 max-w-xl mx-auto">
              We stripped away the bloat and kept only what matters for building the perfect CV.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:border-violet-500/30 card-luxury"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="h-5 w-5 text-violet-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 relative bg-zinc-950/50">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="text-center mb-20">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400 mb-4 block">The Process</span>
            <h2 className="text-h2 text-white mb-4">Four Steps to Your Perfect CV</h2>
            <p className="text-body text-zinc-400 max-w-xl mx-auto">
              From blank page to polished resume in under 10 minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-px bg-gradient-to-r from-violet-500/50 via-purple-500/50 to-fuchsia-500/50" />
            
            {steps.map((step, index) => (
              <div key={index} className="relative text-center group">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-violet-600/20 group-hover:shadow-violet-600/40 transition-all duration-500 group-hover:scale-110">
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Showcase */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400 mb-4 block">Templates</span>
            <h2 className="text-h2 text-white mb-4">Six ATS-Perfect Templates</h2>
            <p className="text-body text-zinc-400 max-w-xl mx-auto">
              Every template scores 100/100 on ATS compatibility. Single-column, clean, professional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Minimal", desc: "Clean lines, perfect whitespace. The timeless default.", color: "from-gray-600 to-gray-800", tag: "Classic" },
              { name: "Professional", desc: "Serif headings, corporate polish. Finance & law.", color: "from-gray-700 to-gray-900", tag: "Corporate" },
              { name: "Executive", desc: "Refined elegance for senior leadership roles.", color: "from-slate-600 to-slate-800", tag: "Senior" },
              { name: "Modern", desc: "Blue accents, tech-forward. Engineering & product.", color: "from-blue-600 to-blue-800", tag: "Tech" },
              { name: "Creative", desc: "Gradient header, vibrant yet ATS-safe.", color: "from-violet-600 to-fuchsia-600", tag: "Creative" },
              { name: "Classic", desc: "Dense, traditional. Maximum content, minimum space.", color: "from-black to-gray-800", tag: "Dense" },
            ].map((template, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden border border-zinc-800/50 hover:border-violet-500/30 card-luxury bg-zinc-900/30"
              >
                {/* Template preview */}
                <div className="aspect-[3/4] p-5 bg-zinc-950 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-5`} />
                  <div className="relative h-full rounded-xl bg-white/95 p-5 shadow-2xl transform group-hover:scale-[1.03] transition-transform duration-700">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${template.color}`} />
                      <div className="flex-1">
                        <div className="h-2 bg-gray-800 rounded w-20 mb-1" />
                        <div className="h-1.5 bg-gray-300 rounded w-28" />
                      </div>
                    </div>
                    <div className="h-px bg-gray-200 mb-3" />
                    <div className="space-y-2">
                      <div className={`h-1.5 rounded w-12 bg-gradient-to-r ${template.color} mb-2`} />
                      <div className="h-1 bg-gray-200 rounded w-full" />
                      <div className="h-1 bg-gray-200 rounded w-4/5" />
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className={`h-1.5 rounded w-16 bg-gradient-to-r ${template.color} mb-2`} />
                      <div className="h-1 bg-gray-200 rounded w-full" />
                      <div className="h-1 bg-gray-200 rounded w-3/4" />
                    </div>
                    <div className="mt-3">
                      <div className={`h-1.5 rounded w-10 bg-gradient-to-r ${template.color} mb-2`} />
                      <div className="h-1 bg-gray-200 rounded w-full" />
                      <div className="h-1 bg-gray-200 rounded w-5/6" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-semibold text-white">{template.name}</h3>
                    <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                      ATS 100
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 mb-4">{template.desc}</p>
                  <Link href="/templates">
                    <Button variant="outline" className="w-full border-zinc-700 bg-transparent hover:bg-white/5 text-zinc-300 hover:text-white text-sm h-10 rounded-xl transition-all duration-300">
                      Use Template
                      <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/templates">
              <Button variant="outline" className="border-zinc-700 bg-transparent hover:bg-white/5 text-zinc-300 hover:text-white text-sm h-11 px-8 rounded-xl transition-all duration-300">
                View All Templates
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 relative bg-zinc-950/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400 mb-4 block">Testimonials</span>
            <h2 className="text-h2 text-white mb-4">Loved by Professionals</h2>
            <p className="text-body text-zinc-400 max-w-xl mx-auto">
              Join thousands who have upgraded their job applications with CVForge.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:border-violet-500/20 transition-all duration-500">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed mb-5 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{t.name}</div>
                    <div className="text-xs text-zinc-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Check, label: "No account required" },
              { icon: Lock, label: "Data stays in your browser" },
              { icon: Zap, label: "No tracking or analytics" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                  <item.icon className="h-4 w-4 text-violet-400" />
                </div>
                <span className="text-sm text-zinc-400 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-purple-600/10 to-fuchsia-600/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-violet-600/30 to-purple-600/30 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <h2 className="text-h1 mb-5">
            <span className="text-white">Ready to Build</span>
            <br />
            <span className="gradient-text">Your Perfect CV?</span>
          </h2>
          <p className="text-body text-zinc-400 mb-10 max-w-lg mx-auto">
            It takes less than 10 minutes. No sign-up. No credit card. Just you and your story.
          </p>
          <Link href="/builder">
            <Button size="lg" className="btn-premium text-base font-semibold px-12 h-14 bg-white text-zinc-900 hover:bg-zinc-100 rounded-xl shadow-2xl shadow-white/20 hover:shadow-white/30 transition-all duration-500">
              Create Your CV Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-base text-white">CVForge</span>
            </div>
            <div className="flex items-center gap-8 text-sm">
              <Link href="/templates" className="text-zinc-500 hover:text-white transition-colors duration-300">Templates</Link>
              <Link href="/builder" className="text-zinc-500 hover:text-white transition-colors duration-300">Builder</Link>
              <Link href="/dashboard" className="text-zinc-500 hover:text-white transition-colors duration-300">Dashboard</Link>
            </div>
            <p className="text-sm text-zinc-600">&copy; 2026 CVForge. Crafted with precision.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
