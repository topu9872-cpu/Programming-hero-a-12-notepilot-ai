import { Sparkles } from 'lucide-react';

const Pricing = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:border-indigo-800/50 dark:bg-indigo-950/40 dark:text-indigo-300">
          <Sparkles className="h-4 w-4" />
          <span>Pricing</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
          Simple, Transparent Pricing
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-gray-500 dark:text-gray-400">
          Choose the plan that fits your workflow. All plans include AI-powered
          features to supercharge your productivity.
        </p>
      </div>
    </div>
  );
};

export default Pricing;