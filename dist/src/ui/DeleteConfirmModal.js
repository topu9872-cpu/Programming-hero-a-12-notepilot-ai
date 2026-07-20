import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2, X } from 'lucide-react';
export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, noteTitle }) => {
    // Close modal on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape')
                onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            // Prevent scrolling on body when modal is open
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);
    return (_jsx(AnimatePresence, { children: isOpen && (_jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: onClose, className: "absolute inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm" }), _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95, y: 10 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 10 }, transition: { type: "spring", duration: 0.4 }, className: "relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-slate-100", role: "dialog", "aria-modal": "true", "aria-labelledby": "modal-title", children: [_jsx("button", { onClick: onClose, className: "absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition", "aria-label": "Close dialog", children: _jsx(X, { size: 16 }) }), _jsxs("div", { className: "flex gap-4 items-start sm:items-center mb-6", children: [_jsx("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400", children: _jsx(AlertTriangle, { size: 22, strokeWidth: 2 }) }), _jsxs("div", { children: [_jsx("h3", { id: "modal-title", className: "text-base sm:text-lg font-semibold tracking-tight", children: "Delete Note" }), _jsxs("p", { className: "text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5", children: ["Are you sure you want to delete ", noteTitle ? _jsxs("strong", { className: "font-medium text-slate-700 dark:text-slate-300", children: ["\"", noteTitle, "\""] }) : 'this note', "? This action cannot be undone."] })] })] }), _jsxs("div", { className: "flex flex-col-reverse sm:flex-row justify-end gap-2.5 sm:gap-2", children: [_jsx("button", { type: "button", onClick: onClose, className: "w-full sm:w-auto px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 rounded-xl border border-slate-200 dark:border-slate-700 active:scale-[0.98] transition duration-150", children: "Cancel" }), _jsxs("button", { type: "button", onClick: onConfirm, className: "w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-600 shadow-md shadow-red-600/10 dark:shadow-none rounded-xl flex items-center justify-center gap-1.5 active:scale-[0.98] transition duration-150", children: [_jsx(Trash2, { size: 14 }), "Delete Permanently"] })] })] })] })) }));
};
