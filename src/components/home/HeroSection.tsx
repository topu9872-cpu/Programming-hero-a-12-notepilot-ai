
import { ArrowRight, Sparkles, FileText, Zap, Brain, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  title?: string;
  description?: string;
}

const HeroSection = ({
  title = 'AI-Powered Notes That Think With You',
  description = 'Transform your ideas into action with intelligent note-taking. Let AI organize, summarize, and enhance your notes so you can focus on what matters most.',
}: HeroSectionProps) => {
  return (
<section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 pb-24 pt-36 sm:px-6 lg:px-8 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -left-48 -top-48 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-200/60 to-purple-200/40 blur-3xl dark:from-indigo-800/20 dark:to-purple-800/10" />
        <div className="absolute -right-48 -bottom-48 h-96 w-96 rounded-full bg-gradient-to-br from-purple-200/60 to-indigo-200/40 blur-3xl dark:from-purple-800/20 dark:to-indigo-800/10" />
        <div className="absolute left-1/3 top-1/3 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-100/30 blur-2xl dark:bg-indigo-800/10" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm backdrop-blur-sm dark:border-indigo-800/50 dark:bg-indigo-950/40 dark:text-indigo-300">
              <Sparkles className="h-4 w-4" />
              <span>Intelligent Note Management</span>
            </div>

            {/* Headline with gradient text */}
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
             <span className="text-gray-900 dark:text-white">
  {title}
</span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-lg text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-300">
              {description}
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-4">
              <Link
                to="/signup"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-200/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-300/50 active:scale-[0.97] dark:shadow-indigo-900/30 dark:hover:shadow-indigo-800/40"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative flex items-center gap-2">
                  Get Started
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>

              <Link
                to="/explore"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-8 py-3.5 text-base font-semibold text-gray-700 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-gray-300 hover:bg-white hover:shadow-md active:scale-[0.97] dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-900"
              >
                <FileText className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                Explore Notes
              </Link>
            </div>

            {/* Trusted section */}
            <div className="mt-12 flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex -space-x-2">
                  {[
                    { bg: 'bg-indigo-500', img: 'bg-gradient-to-br from-indigo-400 to-indigo-600' },
                    { bg: 'bg-purple-500', img: 'bg-gradient-to-br from-purple-400 to-purple-600' },
                    { bg: 'bg-pink-500', img: 'bg-gradient-to-br from-pink-400 to-pink-600' },
                    { bg: 'bg-teal-500', img: 'bg-gradient-to-br from-teal-400 to-teal-600' },
                  ].map((avatar, i) => (
                    <div
                      key={i}
                      className={`h-9 w-9 rounded-full border-2 border-white ${avatar.img} dark:border-gray-950`}
                    />
                  ))}
                </div>
                <span className="ml-1">
                  <span className="font-semibold text-gray-700 dark:text-gray-200">2,000+</span>{' '}
                  creators already using NotePilot
                </span>
              </div>
            </div>
          </div>

          {/* Right Glassmorphism Card */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative">
              {/* Main glass card */}
              <div className="relative h-80 w-80 overflow-hidden rounded-3xl border border-white/20 bg-white/60 p-8 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl sm:h-96 sm:w-96 lg:h-[28rem] lg:w-[28rem] dark:border-white/10 dark:bg-gray-900/60 dark:shadow-indigo-900/20">
                {/* Inner glow */}
                <div className="pointer-events-none absolute -inset-20 bg-gradient-to-br from-indigo-400/10 via-transparent to-purple-400/10 dark:from-indigo-400/5 dark:to-purple-400/5" />

                {/* Window dots */}
                <div className="relative mb-6 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                  <div className="h-3 w-3 rounded-full bg-green-400/80" />
                </div>

                {/* Card content */}
                <div className="relative space-y-5">
                  {/* Title skeleton */}
                  <div className="space-y-2.5">
                    <div className="h-3 w-3/4 rounded-full bg-gradient-to-r from-indigo-200 to-indigo-100 dark:from-indigo-800/50 dark:to-indigo-700/30" />
                    <div className="h-3 w-1/2 rounded-full bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700/50 dark:to-gray-600/30" />
                    <div className="h-3 w-5/6 rounded-full bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700/50 dark:to-gray-600/30" />
                  </div>

                  {/* AI Summary card */}
                  <div className="rounded-xl border border-indigo-100/60 bg-gradient-to-br from-indigo-50/80 to-purple-50/60 p-4 dark:border-indigo-900/30 dark:from-indigo-950/40 dark:to-purple-950/30">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-500/10">
                        <Brain className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                        AI Summary
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full rounded-full bg-indigo-200/50 dark:bg-indigo-700/30" />
                      <div className="h-2 w-4/5 rounded-full bg-indigo-200/30 dark:bg-indigo-700/20" />
                      <div className="h-2 w-3/5 rounded-full bg-indigo-200/20 dark:bg-indigo-700/10" />
                    </div>
                  </div>

                  {/* Tag pills */}
                  <div className="flex flex-wrap gap-2">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-1.5 text-xs font-medium text-green-700 dark:from-green-950/40 dark:to-emerald-950/30 dark:text-green-400">
                      <Zap className="h-3 w-3" />
                      Quick Capture
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1.5 text-xs font-medium text-blue-700 dark:from-blue-950/40 dark:to-indigo-950/30 dark:text-blue-400">
                      <Shield className="h-3 w-3" />
                      Secure
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-50 to-pink-50 px-3 py-1.5 text-xs font-medium text-purple-700 dark:from-purple-950/40 dark:to-pink-950/30 dark:text-purple-400">
                      <Sparkles className="h-3 w-3" />
                      Smart Tags
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating icon decorations */}
              <div className="absolute -right-5 -top-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-200/50 bg-white/70 shadow-lg shadow-indigo-500/10 backdrop-blur-md dark:border-indigo-800/30 dark:bg-gray-900/70">
                <Sparkles className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
              </div>
              <div className="absolute -bottom-5 -left-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-200/50 bg-white/70 shadow-lg shadow-purple-500/10 backdrop-blur-md dark:border-purple-800/30 dark:bg-gray-900/70">
                <Zap className="h-6 w-6 text-purple-500 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

