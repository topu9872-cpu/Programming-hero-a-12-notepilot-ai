import { Sparkles } from 'lucide-react';

const Features = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:border-indigo-800/50 dark:bg-indigo-950/40 dark:text-indigo-300">
          <Sparkles className="h-4 w-4" />
          <span>Features</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
          Explore Our Features
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-gray-500 dark:text-gray-400">
          Discover how NotePilot AI can transform your note-taking experience
          with intelligent automation and smart organization.
        </p>
      </div>
    </div>
  );
};

export default Features;