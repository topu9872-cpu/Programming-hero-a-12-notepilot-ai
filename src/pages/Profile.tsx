import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  RiUser3Line,
  RiShieldFlashLine,
  RiCheckDoubleLine,
  RiErrorWarningLine,
  RiSave3Line,
  RiDeleteBin6Line,
  RiCalendar2Line,
  RiShieldStarLine,
  RiArrowRightLine,
  RiLockPasswordLine,
} from "react-icons/ri";
import { authClient } from "../lib/auth-client";
import { ImageBBUpload } from "../lib/ImageBBUpload";

// Fixed form type to separate the file list input from the final uploaded string
type ProfileFormValues = {
  name: string;
  image: FileList | null;
};

type BetterAuthUser = {
  id?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  email?: string;
  emailVerified?: boolean;
  name?: string;
  image?: string; // Standard BetterAuth image is a URL string
  role?: string;
  plan?: string;
};

type BetterAuthActionClient = {
  updateUser?: (payload: { name?: string; image?: string }) => Promise<unknown>;
  update?: (payload: { name?: string; image?: string }) => Promise<unknown>;
  deleteAccount?: () => Promise<unknown>;
  delete?: () => Promise<unknown>;
  account?: {
    delete?: () => Promise<unknown>;
    update?: (payload: { name?: string; image?: string }) => Promise<unknown>;
  };
  user?: {
    delete?: () => Promise<unknown>;
    update?: (payload: { name?: string; image?: string }) => Promise<unknown>;
  };
};

const formatDate = (value?: string | Date | null) => {
  if (!value) return "Unknown";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "Unknown";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function ProfilePage(): React.JSX.Element {
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as BetterAuthUser | undefined;

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
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

  const displayName = useMemo(
    () => user?.name || user?.email || "Guest User",
    [user],
  );

  const profileImage = user?.image || "/avatar.jpg";
  const emailAddress = user?.email ?? "Not available";
  const createdDate = formatDate(user?.createdAt);
  const updatedDate = formatDate(user?.updatedAt);
  const isVerified = Boolean(user?.emailVerified ?? false);
  const roleLabel = user?.role ?? "Member";
  const planLabel = user?.plan ?? "Starter";

  const providerLabel = useMemo(() => {
    const provider = session && typeof session === 'object' && 'provider' in session
      ? (session as Record<string, unknown>).provider as string | undefined
      : undefined;
      
    if (provider) return provider.charAt(0).toUpperCase() + provider.slice(1);
    if (typeof emailAddress === "string" && emailAddress.includes("@google")) {
      return "Google";
    }
    return "Credentials";
  }, [emailAddress, session]);

  // Safe traversal matching BetterAuth fallback API methods
  const authActions = authClient as unknown as BetterAuthActionClient;
  const updateProfileFn =
    authActions.updateUser ??
    authActions.update ??
    authActions.account?.update ??
    authActions.user?.update;
  const deleteAccountFn =
    authActions.deleteAccount ??
    authActions.delete ??
    authActions.account?.delete ??
    authActions.user?.delete;

  const handleSaveProfile = async (values: ProfileFormValues) => {
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
    } catch (error) {
      console.error("Unable to update profile", error);
      toast.error("Unable to save profile. Please try again.");
    } finally {
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
    } catch (error) {
      console.error("Account delete failed", error);
      toast.error("Unable to delete account. Please try again.");
    } finally {
      setIsDeleting(false);
      setDeleteConfirmOpen(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <p className="text-sm font-medium">Loading profile…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 p-4 sm:p-6 lg:p-8 selection:bg-indigo-500/20">
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-2xl shadow-slate-200/10 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/90"
      >
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-indigo-500/20 via-transparent to-transparent blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <img
                src={profileImage}
                alt={`${displayName} avatar`}
                className="h-full w-full object-cover"
              />
              {isVerified && (
                <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/95 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
                  <RiCheckDoubleLine className="h-3.5 w-3.5" /> Verified
                </span>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-600">
                Account
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {displayName}
              </h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {emailAddress}
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  <RiCalendar2Line className="mr-2 h-4 w-4 text-indigo-500" />{" "}
                  Joined {createdDate}
                </span>
                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  <RiShieldStarLine className="mr-2 h-4 w-4 text-emerald-500" />{" "}
                  {providerLabel} Account
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-flow-col sm:auto-cols-max">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
              onClick={() => toast("Profile is synced with Better Auth.")}
            >
              <RiArrowRightLine className="h-4 w-4" /> Refresh
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/10 transition hover:brightness-105"
              onClick={() =>
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                })
              }
            >
              Explore actions
            </button>
          </div>
        </div>
      </motion.header>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1.8fr_1fr]">
        <section className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-2xl shadow-slate-200/10 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/90"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-4 dark:border-slate-800">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
                  Profile settings
                </p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                  Personal information
                </h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {providerLabel}
              </span>
            </div>

            <form
              onSubmit={handleSubmit(handleSaveProfile)}
              className="mt-6 space-y-6"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span>Name</span>
                  <input
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 3,
                        message: "Enter at least 3 characters.",
                      },
                    })}
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/20"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-500">
                      {errors.name.message}
                    </p>
                  )}
                </label>

                <label className="flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span>Profile Picture File</span>
                  <input
                    type="file"
                    accept="image/*"
                    {...register("image")}
                    className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-slate-800 dark:file:text-slate-200"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                    Email
                  </p>
                  <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {emailAddress}
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                    Role
                  </p>
                  <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {roleLabel}
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                    Plan
                  </p>
                  <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {planLabel}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                    Joined
                  </p>
                  <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {createdDate}
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                    Last updated
                  </p>
                  <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {updatedDate}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Save changes to keep your Better Auth profile synchronized.
                </p>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center justify-center gap-2 rounded-3xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? (
                    <span className="inline-flex items-center gap-2">
                      <RiSave3Line className="h-4 w-4 animate-spin" /> Saving...
                    </span>
                  ) : (
                    <>
                      <RiSave3Line className="h-4 w-4" /> Save changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-2xl shadow-slate-200/10 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/90"
          >
            <div className="flex items-center gap-3 border-b border-slate-200/80 pb-4 dark:border-slate-800">
              <RiShieldFlashLine className="h-5 w-5 text-indigo-500" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  Security
                </p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                  Authentication controls
                </h2>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                  Provider
                </p>
                <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {providerLabel}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                  Verified status
                </p>
                <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {isVerified ? "Verified" : "Not verified"}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-3xl bg-slate-50 p-4 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-900 dark:text-white">
                <RiLockPasswordLine className="h-5 w-5 text-indigo-500 animate-pulse" />
                <span>
                  Use your auth provider to manage passwords and security settings.
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                If your provider supports account recovery, follow its security workflows.
              </p>
            </div>
          </motion.div>
        </section>

        <aside className="space-y-6 lg:sticky lg:top-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-2xl shadow-slate-200/10 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/90"
          >
            <div className="flex items-center gap-3 border-b border-slate-200/80 pb-4 dark:border-slate-800">
              <RiUser3Line className="h-5 w-5 text-indigo-500" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                  Quick summary
                </p>
                <p className="text-base text-slate-900 dark:text-white">
                  Current account snapshot.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                  Full name
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {displayName}
                </p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                  Email
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {emailAddress}
                </p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                  Account type
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {providerLabel}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-2xl shadow-slate-200/10 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/90"
          >
            <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 pb-4 dark:border-slate-800">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-500">
                  Danger zone
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Remove your Better Auth account permanently.
                </p>
              </div>
              <RiErrorWarningLine className="h-5 w-5 text-red-500" />
            </div>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmOpen(true)}
                disabled={isDeleting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeleting ? (
                  "Deleting account..."
                ) : (
                  <>
                    <RiDeleteBin6Line className="h-4 w-4" /> Delete account
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() =>
                  toast("Manage provider settings through your auth provider.")
                }
                className="inline-flex w-full items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
              >
                Manage provider settings
              </button>
            </div>
          </motion.div>
        </aside>
      </div>

      {deleteConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full max-w-xl rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-2xl shadow-slate-900/10 dark:border-slate-800/80 dark:bg-slate-950"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-red-500/10 text-red-600 ring-1 ring-red-500/20">
                <RiErrorWarningLine className="h-6 w-6" />
              </div>
              <div>
                <h3
                  id="delete-modal-title"
                  className="text-xl font-semibold text-slate-900 dark:text-white"
                >
                  Confirm account deletion
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Deleting your account will sign you out and remove your Better
                  Auth profile. This cannot be undone.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setDeleteConfirmOpen(false)}
                className="inline-flex items-center justify-center rounded-3xl border border-slate-300 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="inline-flex items-center justify-center rounded-3xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeleting ? "Deleting…" : "Confirm delete"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}