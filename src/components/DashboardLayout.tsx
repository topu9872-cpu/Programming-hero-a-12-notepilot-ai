import { Navigate, Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import { authClient } from "../lib/auth-client";
import { toast } from "sonner";

const DashboardLayout = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session?.user) {
    toast.warning('please login')
    return <Navigate to="/login" />;
  }
  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-200">
      {/* Left Sidebar */}
      <aside className="w-64 shrink-0">
        <DashboardSidebar />
      </aside>

      {/* Right Dashboard Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Dashboard Pages */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50/50 dark:bg-slate-900/40">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
