import { motion, type Variants } from "framer-motion";
import { PenLine, Sparkles, TrendingUp, ArrowDown } from 'lucide-react';

interface Step {
  number: number;
  icon: typeof PenLine;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  lineColor: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: PenLine,
    title: 'Capture Your Ideas',
    description:
      'Write, record, or import your notes effortlessly. NotePilot supports rich text, markdown, and voice input so you never lose a thought.',
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/40',
    lineColor: 'bg-indigo-200 dark:bg-indigo-800',
  },
  {
    number: 2,
    icon: Sparkles,
    title: 'AI Organizes Everything',
    description:
      'Our AI automatically summarizes, tags, and categorizes your notes. Smart organization keeps your knowledge base clutter-free and searchable.',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/40',
    lineColor: 'bg-purple-200 dark:bg-purple-800',
  },
  {
    number: 3,
    icon: TrendingUp,
    title: 'Take Action Faster',
    description:
      'Get contextual insights, smart recommendations, and productivity boosts. Turn your notes into actionable outcomes with AI-powered assistance.',
    color: 'text-pink-600 dark:text-pink-400',
    bgColor: 'bg-pink-100 dark:bg-pink-900/40',
    lineColor: 'bg-pink-200 dark:bg-pink-800',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const HowItWorksSection = () => {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 lg:px-8 dark:bg-gray-950">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -left-48 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-indigo-100/30 blur-3xl dark:bg-indigo-900/10" />
        <div className="absolute -right-48 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-purple-100/30 blur-3xl dark:bg-purple-900/10" />
      </div>

      <motion.div
        className="mx-auto max-w-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: 'easeOut' },
          },
        }}
      >
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:border-indigo-800/50 dark:bg-indigo-950/40 dark:text-indigo-300">
            <Sparkles className="h-4 w-4" />
            <span>Simple Workflow</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            How{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              NotePilot
            </span>{' '}
            Works
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-500 sm:text-lg dark:text-gray-400">
            Three simple steps to transform the way you capture, organize, and
            act on your ideas with the power of AI.
          </p>
        </div>

        {/* Steps */}
        <motion.div
          className="relative mt-16 grid gap-8 md:grid-cols-3 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Connecting line (desktop) */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-16 hidden h-0.5 md:block"
            aria-hidden="true"
          >
            <div className="h-full w-full bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800" />
          </div>

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="group relative flex flex-col items-center text-center"
              >
                {/* Number badge */}
                <div className="relative mb-6">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${step.bgColor}`}
                  >
                    <span
                      className={`text-2xl font-bold transition-transform duration-300 group-hover:scale-105 ${step.color}`}
                    >
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Card */}
                <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700">
                  {/* Icon */}
                  <div
                    className={`mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${step.bgColor}`}
                  >
                    <Icon className={`h-6 w-6 ${step.color}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HowItWorksSection;