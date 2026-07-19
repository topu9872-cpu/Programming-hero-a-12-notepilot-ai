import React from 'react';
import { motion } from 'framer-motion';
import { Compass, ArrowLeft, Home, FileText, Sparkles, BrainCircuit } from 'lucide-react';

export default function NotFoundPage() {
  const goBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 flex items-center justify-center p-4 sm:p-6 transition-colors duration-300">
      
      {/* Dynamic Blurred Background Blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-500/20 dark:bg-indigo-600/15 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-purple-500/20 dark:bg-purple-600/15 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none animate-pulse duration-[6000ms]" />

      {/* Main Container */}
      <div className="w-full max-w-2xl relative z-10 flex flex-col items-center text-center space-y-8">
        
        {/* Brand Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-md shadow-xs select-none"
        >
          <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            NotePilot AI
          </span>
        </motion.div>

        {/* 404 Visual Showcase (Glassmorphism Frame) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full bg-white/40 dark:bg-slate-900/40 border border-white/40 dark:border-slate-800/50 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-xl dark:shadow-2xl/30 flex flex-col items-center"
        >
          
          {/* Custom Interactive AI-Theme Tech Illustration */}
          <div className="relative w-full max-w-[280px] aspect-square flex items-center justify-center mb-4 select-none">
            {/* Background Digital Grid Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70" />
            
            {/* Animated Orbital Rings */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-44 h-44 rounded-full border border-dashed border-indigo-400/40 dark:border-indigo-500/30 flex items-center justify-center"
            >
              <div className="w-2 h-2 rounded-full bg-indigo-500 absolute -top-1" />
            </motion.div>
            
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute w-56 h-56 rounded-full border border-slate-300 dark:border-slate-800 flex items-center justify-center"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400 absolute -bottom-0.5" />
            </motion.div>

            {/* Core Graphic Anchor */}
            <div className="relative z-10 p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-white dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center group">
              <BrainCircuit className="w-14 h-14 text-indigo-500 dark:text-indigo-400 stroke-[1.5]" />
              
              {/* Floating Paper Sheets (Note Theme) */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm"
              >
                <FileText className="w-5 h-5 text-purple-500 dark:text-purple-400" />
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-3 -left-5 p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm -rotate-12"
              >
                <Compass className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              </motion.div>
            </div>
          </div>

          {/* Core Large 404 Code */}
          <h2 className="text-6xl sm:text-7xl font-black tracking-tighter bg-gradient-to-b from-slate-950 to-slate-500 dark:from-white dark:to-slate-600 bg-clip-text text-transparent select-none leading-none">
            404
          </h2>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mt-4">
            Lost in the Knowledge Graph
          </h3>
          
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2 max-w-md">
            The page you are looking for doesn't exist, has been moved, or was structurally unindexed by our system.
          </p>

          {/* Humorous Message Box */}
          <div className="mt-5 px-4 py-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-950/40 border border-slate-200/40 dark:border-slate-800/40 text-xs sm:text-sm text-indigo-600 dark:text-indigo-300 italic font-medium">
            "Looks like this page wandered off to take notes somewhere else."
          </div>

        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto"
        >
          {/* Primary Action Button */}
          <a
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 active:bg-indigo-700 transition-all shadow-md shadow-indigo-600/10 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Go Back Home
          </a>

          {/* Secondary Action Button */}
          <button
            type="button"
            onClick={goBack}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 focus:outline-hidden focus:ring-2 focus:ring-slate-500/10 active:bg-slate-100 dark:active:bg-slate-800 transition-all shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </motion.div>

      </div>
    </div>
  );
}