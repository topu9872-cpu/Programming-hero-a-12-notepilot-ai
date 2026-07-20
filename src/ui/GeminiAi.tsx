import { useState } from "react";
import {
  RiCheckDoubleLine,
  RiMagicLine,
  RiPriceTag3Line,
  RiSparkling2Line,
  RiText,
  RiTranslate2,
} from "react-icons/ri";
import { classifyNote, generateSummary } from "../api/ServerRoute.js";
import { toast } from "sonner";
type GeminiAiProps = {
  title: string;
  content: string;
  onApplyClassification: (data: {
    category: string;
    tags: string[];
    difficulty: string;
  }) => void;
};

const GeminiAi = ({
  title,
  content,
  onApplyClassification,
}: GeminiAiProps) => {
  const [selectedAiFeature, setSelectedAiFeature] = useState<string | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [classification, setClassification] = useState<any>(null);

  const handleSummary = async () => {
    if (!(title ?? "").trim() || !(content ?? "").trim()) {
      toast.error("Please enter a title and content first.");
      return;
    }

    try {
      setLoading(true);

      const data = await generateSummary(title ?? "", content ?? "");

      setSummary(data.summary);

      toast.success("Summary generated.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate summary.");
    } finally {
      setLoading(false);
    }
  };

  const handleSchema = async () => {
    if (!(title ?? "").trim() || !(content ?? "").trim()) {
      toast.error("Please enter a title and content first.");
      return;
    }

    try {
      setLoading(true);

      const data = await classifyNote(title ?? "", content ?? "");

      setClassification(data.result);
      onApplyClassification(data.result);
      toast.success("Tags generated.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to classify note.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-855">
        <div className="flex items-center gap-2">
          <RiSparkling2Line className="w-4 h-4 text-indigo-500 animate-pulse" />
          <h2 className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-500 dark:from-indigo-400 dark:to-purple-300 bg-clip-text text-transparent">
            Gemini Core Context
          </h2>
        </div>
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30">
          Sync
        </span>
      </div>

      <div className="space-y-2">
        {[
          {
            id: "summary",
            label: "Generate Summary",
            shortcut: "⌥S",
            icon: <RiMagicLine />,
          },
          {
            id: "schema",
            label: "Suggest Schema Tags",
            shortcut: "⌥T",
            icon: <RiPriceTag3Line />,
          },
        ].map((btn) => {
          const isSelected = selectedAiFeature === btn.id;
          return (
            <button
              key={btn.id}
              type="button"
              onClick={async () => {
                setSelectedAiFeature(btn.id);

                if (btn.id === "summary") {
                  await handleSummary();
                }

                if (btn.id === "schema") {
                  await handleSchema();
                }
              }}
              className={`w-full flex items-center justify-between p-2.5 text-left text-xs font-medium rounded-xl border transition-all ${
                isSelected
                  ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-500/30 shadow-xs"
                  : "border-slate-150 dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-950/40 hover:bg-slate-100/50 dark:hover:bg-slate-800/40"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={isSelected ? "text-indigo-500" : "text-slate-400"}
                >
                  {btn.icon}
                </span>
                <span>{btn.label}</span>
              </div>
              <span
                className={`text-[10px] ${isSelected ? "text-indigo-400" : "text-slate-400"}`}
              >
                {btn.shortcut}
              </span>
            </button>
          );
        })}
      </div>

     {loading && (
  <div className="relative overflow-hidden rounded-xl border border-indigo-200/60 dark:border-indigo-800/50 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/30 dark:to-purple-950/30 p-4 shadow-sm transition-all duration-300">
    
    {/* Animated Shimmer / Pulse Effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/5 to-transparent animate-pulse" />
    
    <div className="relative flex items-center gap-3.5">
      {/* Spinning Icon Container */}
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-slate-900 shadow-sm border border-indigo-100 dark:border-indigo-800/80">
        <RiSparkling2Line className="h-4.5 w-4.5 animate-spin text-indigo-500" />
      </div>
      
      {/* Text Container */}
      <div className="flex flex-col">
        <span className="text-sm font-semibold bg-gradient-to-r from-indigo-700 to-purple-600 dark:from-indigo-300 dark:to-purple-300 bg-clip-text text-transparent">
          Gemini is thinking...
        </span>
        <span className="text-[11px] font-medium text-indigo-500/70 dark:text-indigo-400/60 animate-pulse">
          Analyzing your context & crafting response
        </span>
      </div>
    </div>
    
  </div>
)}

  
      {
      summary && (
        <div className="mt-4 rounded-xl border border-green-200 bg-green-50 dark:bg-slate-800 p-4">
          <h3 className="font-semibold mb-2">AI Summary</h3>
          <p className="text-sm whitespace-pre-wrap">{summary}</p>
        </div>
      )}

      {classification && (
        <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 dark:bg-slate-800 p-4">
          <h3 className="font-semibold mb-2">AI Classification</h3>

          <p>
            <strong>Category:</strong> {classification.category}
          </p>

          <p>
            <strong>Difficulty:</strong> {classification.difficulty}
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            {classification.tags.map((tag: any) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
      
    </div>
  );
};

export default GeminiAi;
