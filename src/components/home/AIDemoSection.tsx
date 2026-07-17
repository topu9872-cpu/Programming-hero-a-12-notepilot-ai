import { Sparkles, CheckCircle, Brain, Tag, BarChart3, ArrowRight, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIDemoSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 pb-24 pt-36 sm:px-6 lg:px-8 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute right-0 top-0 h-96 w-96 bg-gradient-to-bl from-indigo-100/40 to-transparent blur-3xl dark:from-indigo-900/15" />
        <div className="absolute bottom-0 left-0 h-64 w-64 bg-gradient-to-tr from-purple-100/30 to-transparent blur-3xl dark:from-purple-900/10" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left Side - Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 shadow-sm transition-all duration-300 hover:shadow-md dark:border-indigo-800/50 dark:bg-indigo-950/40 dark:text-indigo-300">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Transformation</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Turn Notes Into{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Smart Insights
              </span>
            </h2>

            {/* Description */}
            <p className="mt-4 max-w-lg text-base leading-relaxed text-gray-500 sm:text-lg dark:text-gray-400">
              Watch your raw notes transform into structured, actionable insights
              automatically. NotePilot AI does the heavy lifting so you can focus
              on what matters.
            </p>

            {/* Feature bullets */}
            <div className="mt-8 space-y-4">
              {[
                {
                  icon: Brain,
                  text: 'AI generates concise summaries instantly',
                  color: 'text-indigo-600 dark:text-indigo-400',
                  bg: 'bg-indigo-100 dark:bg-indigo-900/40',
                },
                {
                  icon: Tag,
                  text: 'Auto-tags notes with relevant categories',
                  color: 'text-purple-600 dark:text-purple-400',
                  bg: 'bg-purple-100 dark:bg-purple-900/40',
                },
                {
                  icon: BarChart3,
                  text: 'Extracts key insights and action items',
                  color: 'text-pink-600 dark:text-pink-400',
                  bg: 'bg-pink-100 dark:bg-pink-900/40',
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.text}
                    className="group flex items-start gap-3 transition-all duration-300 hover:-translate-x-0.5"
                  >
                    <div
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110 ${item.bg}`}
                    >
                      <Icon className={`h-4 w-4 ${item.color}`} />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-10">
              <Link
                to="/signup"
                className="group inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-200/50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-300/50 active:scale-[0.97] dark:shadow-indigo-900/30 dark:hover:shadow-indigo-800/40"
              >
                Try AI Features Free
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Side - Dashboard Preview */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="group relative">
              {/* Main glassmorphism card */}
              <div className="relative w-80 overflow-hidden rounded-3xl border border-white/20 bg-white/60 p-6 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-3xl hover:shadow-indigo-500/20 sm:w-96 dark:border-white/10 dark:bg-gray-900/60 dark:shadow-indigo-900/20 dark:hover:shadow-indigo-900/30">
                {/* Inner glow */}
                <div className="pointer-events-none absolute -inset-20 bg-gradient-to-br from-indigo-400/10 via-transparent to-purple-400/10 dark:from-indigo-400/5 dark:to-purple-400/5" />

                {/* Window dots */}
                <div className="relative mb-5 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                  <div className="h-3 w-3 rounded-full bg-green-400/80" />
                  <span className="ml-3 text-xs font-medium text-gray-400 dark:text-gray-500">
                    NotePilot AI — Dashboard Preview
                  </span>
                </div>

                {/* Note Title */}
                <div className="relative mb-4">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    Recent Note
                  </h4>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    Product Strategy Meeting Notes
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                    Created 2 hours ago · 3 min read
                  </p>
                </div>

                {/* AI Summary */}
                <div className="relative mb-4 rounded-xl border border-indigo-100/60 bg-gradient-to-br from-indigo-50/80 to-purple-50/60 p-4 transition-all duration-300 group-hover:shadow-md dark:border-indigo-900/30 dark:from-indigo-950/40 dark:to-purple-950/30">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-500/10">
                      <Brain className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      AI Summary
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    Discussed Q3 product roadmap priorities including AI
                    features, mobile app redesign, and user onboarding
                    improvements. Key decisions: launch AI summarization in Q3.
                  </p>
                </div>

                {/* Tags */}
                <div className="relative mb-4 flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-1.5 text-xs font-medium text-green-700 transition-all duration-300 hover:scale-105 dark:from-green-950/40 dark:to-emerald-950/30 dark:text-green-400">
                    <Tag className="h-3 w-3" />
                    Product
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition-all duration-300 hover:scale-105 dark:from-blue-950/40 dark:to-indigo-950/30 dark:text-blue-400">
                    <Tag className="h-3 w-3" />
                    Strategy
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-50 to-pink-50 px-3 py-1.5 text-xs font-medium text-purple-700 transition-all duration-300 hover:scale-105 dark:from-purple-950/40 dark:to-pink-950/30 dark:text-purple-400">
                    <Tag className="h-3 w-3" />
                    Q3 Planning
                  </div>
                </div>

                {/* Insights */}
                <div className="relative rounded-xl border border-gray-100 bg-white/50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-500/10">
                      <BarChart3 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                      Key Insights
                    </span>
                  </div>
                  <div className="space-y-2">
                    {[
                      'Prioritize AI features for Q3 launch',
                      'Mobile redesign needs UX research',
                      'Onboarding flow: 3 improvement areas identified',
                    ].map((insight) => (
                      <div key={insight} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                        <span className="text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                          {insight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating icon decorations */}
              <div className="absolute -right-4 -top-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-200/50 bg-white/70 shadow-lg shadow-indigo-500/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-indigo-800/30 dark:bg-gray-900/70">
                <Zap className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
              </div>
              <div className="absolute -bottom-4 -left-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-200/50 bg-white/70 shadow-lg shadow-purple-500/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-purple-800/30 dark:bg-gray-900/70">
                <Shield className="h-5 w-5 text-purple-500 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIDemoSection;