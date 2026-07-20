import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { RiUser3Line, RiShieldFlashLine, RiCheckDoubleLine, RiErrorWarningLine, RiSave3Line, RiDeleteBin6Line, RiCalendar2Line, RiShieldStarLine, RiLockPasswordLine, } from "react-icons/ri";
import { authClient } from "../lib/auth-client.js";
import { ImageBBUpload } from "../lib/ImageBBUpload.js";
const formatDate = (value) => {
    if (!value)
        return "Unknown";
    const date = typeof value === "string" ? new Date(value) : value;
    if (Number.isNaN(date.getTime()))
        return "Unknown";
    return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};
export default function ProfilePage() {
    const navigate = useNavigate();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const { register, handleSubmit, reset, formState: { errors }, } = useForm({
        defaultValues: {
            name: user?.name ?? "",
            image: null,
        },
        mode: "onBlur",
    });
    // Keep form synchronized with active session data updates
    useEffect(() => {
        if (user) {
            reset({
                name: user.name ?? "",
                image: null,
            });
        }
    }, [user, reset]);
    const displayName = useMemo(() => user?.name || user?.email || "Guest User", [user]);
    const profileImage = user?.image || "/avatar.jpg";
    const emailAddress = user?.email ?? "Not available";
    const createdDate = formatDate(user?.createdAt);
    const updatedDate = formatDate(user?.updatedAt);
    const isVerified = Boolean(user?.emailVerified ?? false);
    const roleLabel = user?.role ?? "Member";
    const planLabel = user?.plan ?? "Starter";
    const providerLabel = useMemo(() => {
        const provider = session && typeof session === 'object' && 'provider' in session
            ? session.provider
            : undefined;
        if (provider)
            return provider.charAt(0).toUpperCase() + provider.slice(1);
        if (typeof emailAddress === "string" && emailAddress.includes("@google")) {
            return "Google";
        }
        return "Credentials";
    }, [emailAddress, session]);
    // Safe traversal matching BetterAuth fallback API methods
    const authActions = authClient;
    const updateProfileFn = authActions.updateUser ??
        authActions.update ??
        authActions.account?.update ??
        authActions.user?.update;
    const deleteAccountFn = authActions.deleteAccount ??
        authActions.delete ??
        authActions.account?.delete ??
        authActions.user?.delete;
    const handleSaveProfile = async (values) => {
        setIsSaving(true);
        try {
            if (!updateProfileFn) {
                toast.error("Profile editing is unavailable for this account.");
                return;
            }
            let finalImageUrl = user?.image;
            // Safe asynchronous asset transmission to ImageBB if selected
            if (values.image && values.image[0]) {
                finalImageUrl = await ImageBBUpload(values.image[0]);
            }
            await updateProfileFn({
                name: values.name.trim() || undefined,
                image: finalImageUrl || undefined,
            });
            toast.success("Profile updated successfully.");
        }
        catch (error) {
            console.error("Unable to update profile", error);
            toast.error("Unable to save profile. Please try again.");
        }
        finally {
            setIsSaving(false);
        }
    };
    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        try {
            if (!deleteAccountFn) {
                toast.error("Account deletion is unavailable for this provider.");
                return;
            }
            await deleteAccountFn();
            await authClient.signOut();
            toast.success("Your account has been deleted.");
            navigate("/login");
        }
        catch (error) {
            console.error("Account delete failed", error);
            toast.error("Unable to delete account. Please try again.");
        }
        finally {
            setIsDeleting(false);
            setDeleteConfirmOpen(false);
        }
    };
    if (isPending) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100", children: _jsx("p", { className: "text-sm font-medium", children: "Loading profile\u2026" }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 p-4 sm:p-6 lg:p-8 selection:bg-indigo-500/20", children: [_jsxs(motion.header, { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, ease: "easeOut" }, className: "relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-2xl shadow-slate-200/10 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/90", children: [_jsx("div", { className: "absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-indigo-500/20 via-transparent to-transparent blur-3xl" }), _jsx("div", { className: "relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm dark:border-slate-800 dark:bg-slate-950", children: [_jsx("img", { src: profileImage, alt: `${displayName} avatar`, className: "h-full w-full object-cover" }), isVerified && (_jsxs("span", { className: "absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/95 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm", children: [_jsx(RiCheckDoubleLine, { className: "h-3.5 w-3.5" }), " Verified"] }))] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.24em] text-indigo-600", children: "Account" }), _jsx("h1", { className: "mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white", children: displayName }), _jsx("p", { className: "mt-2 text-sm text-slate-600 dark:text-slate-400", children: emailAddress }), _jsxs("div", { className: "mt-4 flex flex-wrap gap-3 text-sm", children: [_jsxs("span", { className: "inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-slate-700 dark:bg-slate-800 dark:text-slate-200", children: [_jsx(RiCalendar2Line, { className: "mr-2 h-4 w-4 text-indigo-500" }), " ", "Joined ", createdDate] }), _jsxs("span", { className: "inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-slate-700 dark:bg-slate-800 dark:text-slate-200", children: [_jsx(RiShieldStarLine, { className: "mr-2 h-4 w-4 text-emerald-500" }), " ", providerLabel, " Account"] })] })] })] }) })] }), _jsxs("div", { className: "mt-8 grid gap-8 xl:grid-cols-[1.8fr_1fr]", children: [_jsxs("section", { className: "space-y-6", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: 0.05 }, className: "rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-2xl shadow-slate-200/10 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/90", children: [_jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-4 dark:border-slate-800", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600", children: "Profile settings" }), _jsx("h2", { className: "mt-2 text-xl font-semibold text-slate-900 dark:text-white", children: "Personal information" })] }), _jsx("span", { className: "inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 dark:bg-slate-800 dark:text-slate-300", children: providerLabel })] }), _jsxs("form", { onSubmit: handleSubmit(handleSaveProfile), className: "mt-6 space-y-6", children: [_jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [_jsxs("label", { className: "flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-300", children: [_jsx("span", { children: "Name" }), _jsx("input", { ...register("name", {
                                                                    required: "Name is required",
                                                                    minLength: {
                                                                        value: 3,
                                                                        message: "Enter at least 3 characters.",
                                                                    },
                                                                }), className: "w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/20", placeholder: "Enter your full name" }), errors.name && (_jsx("p", { className: "text-xs text-rose-500", children: errors.name.message }))] }), _jsxs("label", { className: "flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-300", children: [_jsx("span", { children: "Profile Picture File" }), _jsx("input", { type: "file", accept: "image/*", ...register("image"), className: "w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-400 dark:file:bg-slate-800 dark:file:text-slate-200" })] })] }), _jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [_jsxs("div", { className: "rounded-3xl bg-slate-50 p-4 dark:bg-slate-950", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400", children: "Email" }), _jsx("p", { className: "mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100", children: emailAddress })] }), _jsxs("div", { className: "rounded-3xl bg-slate-50 p-4 dark:bg-slate-950", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400", children: "Role" }), _jsx("p", { className: "mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100", children: roleLabel })] }), _jsxs("div", { className: "rounded-3xl bg-slate-50 p-4 dark:bg-slate-950", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400", children: "Plan" }), _jsx("p", { className: "mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100", children: planLabel })] })] }), _jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [_jsxs("div", { className: "rounded-3xl bg-slate-50 p-4 dark:bg-slate-950", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400", children: "Joined" }), _jsx("p", { className: "mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100", children: createdDate })] }), _jsxs("div", { className: "rounded-3xl bg-slate-50 p-4 dark:bg-slate-950", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400", children: "Last updated" }), _jsx("p", { className: "mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100", children: updatedDate })] })] }), _jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [_jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Save changes to keep your Better Auth profile synchronized." }), _jsx("button", { type: "submit", disabled: isSaving, className: "inline-flex items-center justify-center gap-2 rounded-3xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60", children: isSaving ? (_jsxs("span", { className: "inline-flex items-center gap-2", children: [_jsx(RiSave3Line, { className: "h-4 w-4 animate-spin" }), " Saving..."] })) : (_jsxs(_Fragment, { children: [_jsx(RiSave3Line, { className: "h-4 w-4" }), " Save changes"] })) })] })] })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: 0.1 }, className: "rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-2xl shadow-slate-200/10 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/90", children: [_jsxs("div", { className: "flex items-center gap-3 border-b border-slate-200/80 pb-4 dark:border-slate-800", children: [_jsx(RiShieldFlashLine, { className: "h-5 w-5 text-indigo-500" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400", children: "Security" }), _jsx("h2", { className: "mt-2 text-xl font-semibold text-slate-900 dark:text-white", children: "Authentication controls" })] })] }), _jsxs("div", { className: "mt-6 grid gap-4 md:grid-cols-2", children: [_jsxs("div", { className: "rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400", children: "Provider" }), _jsx("p", { className: "mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100", children: providerLabel })] }), _jsxs("div", { className: "rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400", children: "Verified status" }), _jsx("p", { className: "mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100", children: isVerified ? "Verified" : "Not verified" })] })] }), _jsxs("div", { className: "mt-6 rounded-3xl bg-slate-50 p-4 dark:bg-slate-950 border border-slate-200 dark:border-slate-800", children: [_jsxs("div", { className: "flex items-center gap-3 text-sm font-semibold text-slate-900 dark:text-white", children: [_jsx(RiLockPasswordLine, { className: "h-5 w-5 text-indigo-500 animate-pulse" }), _jsx("span", { children: "Use your auth provider to manage passwords and security settings." })] }), _jsx("p", { className: "mt-3 text-sm text-slate-500 dark:text-slate-400", children: "If your provider supports account recovery, follow its security workflows." })] })] })] }), _jsxs("aside", { className: "space-y-6 lg:sticky lg:top-6", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: 0.15 }, className: "rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-2xl shadow-slate-200/10 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/90", children: [_jsxs("div", { className: "flex items-center gap-3 border-b border-slate-200/80 pb-4 dark:border-slate-800", children: [_jsx(RiUser3Line, { className: "h-5 w-5 text-indigo-500" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400", children: "Quick summary" }), _jsx("p", { className: "text-base text-slate-900 dark:text-white", children: "Current account snapshot." })] })] }), _jsxs("div", { className: "mt-6 grid gap-4", children: [_jsxs("div", { className: "rounded-3xl bg-slate-50 p-4 dark:bg-slate-950", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400", children: "Full name" }), _jsx("p", { className: "mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100", children: displayName })] }), _jsxs("div", { className: "rounded-3xl bg-slate-50 p-4 dark:bg-slate-950", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400", children: "Email" }), _jsx("p", { className: "mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100", children: emailAddress })] }), _jsxs("div", { className: "rounded-3xl bg-slate-50 p-4 dark:bg-slate-950", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400", children: "Account type" }), _jsx("p", { className: "mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100", children: providerLabel })] })] })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: 0.2 }, className: "rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-2xl shadow-slate-200/10 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/90", children: [_jsxs("div", { className: "flex items-center justify-between gap-3 border-b border-slate-200/80 pb-4 dark:border-slate-800", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.25em] text-red-500", children: "Danger zone" }), _jsx("p", { className: "mt-1 text-sm text-slate-500 dark:text-slate-400", children: "Remove your Better Auth account permanently." })] }), _jsx(RiErrorWarningLine, { className: "h-5 w-5 text-red-500" })] }), _jsxs("div", { className: "mt-6 space-y-3", children: [_jsx("button", { type: "button", onClick: () => setDeleteConfirmOpen(true), disabled: isDeleting, className: "inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60", children: isDeleting ? ("Deleting account...") : (_jsxs(_Fragment, { children: [_jsx(RiDeleteBin6Line, { className: "h-4 w-4" }), " Delete account"] })) }), _jsx("button", { type: "button", onClick: () => toast("Manage provider settings through your auth provider."), className: "inline-flex w-full items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900", children: "Manage provider settings" })] })] })] })] }), deleteConfirmOpen && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.25, ease: "easeOut" }, className: "w-full max-w-xl rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-2xl shadow-slate-900/10 dark:border-slate-800/80 dark:bg-slate-950", role: "dialog", "aria-modal": "true", "aria-labelledby": "delete-modal-title", children: [_jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-3xl bg-red-500/10 text-red-600 ring-1 ring-red-500/20", children: _jsx(RiErrorWarningLine, { className: "h-6 w-6" }) }), _jsxs("div", { children: [_jsx("h3", { id: "delete-modal-title", className: "text-xl font-semibold text-slate-900 dark:text-white", children: "Confirm account deletion" }), _jsx("p", { className: "mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400", children: "Deleting your account will sign you out and remove your Better Auth profile. This cannot be undone." })] })] }), _jsxs("div", { className: "mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end", children: [_jsx("button", { type: "button", onClick: () => setDeleteConfirmOpen(false), className: "inline-flex items-center justify-center rounded-3xl border border-slate-300 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800", children: "Cancel" }), _jsx("button", { type: "button", onClick: handleDeleteAccount, disabled: isDeleting, className: "inline-flex items-center justify-center rounded-3xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60", children: isDeleting ? "Deleting…" : "Confirm delete" })] })] }) }))] }));
}
