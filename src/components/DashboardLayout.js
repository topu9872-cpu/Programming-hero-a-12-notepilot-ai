import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import { authClient } from "../lib/auth-client";
import { toast } from "sonner";
import { NotePilotLoader } from "./NotePilotLoader";
const DashboardLayout = () => {
    const { data: session, isPending } = authClient.useSession();
    if (isPending) {
        return _jsx(NotePilotLoader, {});
    }
    if (!session?.user) {
        toast.warning('please login');
        return _jsx(Navigate, { to: "/login" });
    }
    return (_jsxs("div", { className: "flex h-screen overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-200", children: [_jsx("aside", { className: "w-64 shrink-0", children: _jsx(DashboardSidebar, {}) }), _jsx("div", { className: "flex flex-1 flex-col overflow-hidden", children: _jsx("main", { className: "flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50/50 dark:bg-slate-900/40", children: _jsx(Outlet, {}) }) })] }));
};
export default DashboardLayout;
