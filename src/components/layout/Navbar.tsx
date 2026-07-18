import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, LogIn, LogOut, Sparkles } from 'lucide-react';
import { authClient } from '../../lib/auth-client';

interface NavLinkItem {
  label: string;
  href: string;
}

const navLinks: NavLinkItem[] = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Dashboard", href: "/dashboard" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const navigate = useNavigate();
 
  const [isDark, setIsDark] = useState(() => 
    document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark'
  );

  const toggleTheme = () => {
    const isNowDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isNowDark ? 'dark' : 'light');
    setIsDark(isNowDark);
  };

  const location = useLocation(); 
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const { data: session } = authClient.useSession();
  const user = session?.user;
console.log(user)
  // Handle Logout Event Action
  const handleLogout = async () => {
    try {
      await authClient.signOut();
      setIsOpen(false);
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group select-none flex-shrink-0">
          <div className="h-8 w-8 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20 transition-transform group-hover:scale-105">
            <Sparkles className="h-4 w-4 fill-indigo-200/20" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            NotePilot<span className="text-indigo-600 font-medium">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-indigo-600 dark:text-indigo-400' 
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="relative overflow-hidden rounded-xl p-2.5 text-slate-500 transition-all duration-300 hover:bg-slate-100 hover:text-slate-900 active:scale-95 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100"
            aria-label="Toggle theme"
          >
            <div className="transition-transform duration-500 transform-3d backface-hidden">
              {isDark ? (
                <Sun className="h-4 w-4 text-yellow-500 animate-[spin_10s_linear_infinite]" />
              ) : (
                <Moon className="h-4 w-4 text-cyan-500" />
              )}
            </div>
          </button>

          {/* Conditional Auth States Rendering */}
          {user ? (
            <div className="flex items-center gap-3">
              {/* Expanding Hover Container Block */}
              <div className="group/user relative flex max-w-[120px] hover:max-w-[240px] items-center gap-2 overflow-hidden rounded-xl border border-slate-200/60 bg-slate-50/50 px-3 py-1.5 transition-all duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-900/40">
                <img 
                  src={user.image || "/avatar.jpg"} 
                  alt={user.name || "User"} 
                  className="h-5 w-5 flex-shrink-0 rounded-full object-cover ring-1 ring-purple-500/20"
                />
                <span className="truncate text-xs font-semibold text-slate-700 dark:text-zinc-300 whitespace-nowrap transition-all duration-300">
                  {user.name || "Active Pilot"}
                </span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-slate-100"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>

              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-indigo-500/10 transition-colors hover:bg-purple-700"
              >
                Get Started
                <Sparkles className="h-4 w-4" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-xl p-2.5 text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          
          <button
            type="button"
            onClick={toggleMenu}
            className="rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content Panel */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-4 pb-6 pt-4 md:hidden animate-in fade-in slide-in-from-top-5 duration-200 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = currentPath === link.href || window.location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-xl transition-colors ${
                    isActive 
                      ? 'bg-indigo-50 text-purple-600 dark:bg-indigo-950/50 dark:text-indigo-400' 
                      : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <hr className="my-2 border-slate-200 dark:border-slate-800" />

            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/60">
                  <img src={user.image || "/avatar.jpg"} alt={user.name || "User"} className="h-6 w-6 rounded-full object-cover" />
                  <span className="text-sm font-bold text-slate-800 dark:text-zinc-200">{user.name}</span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 px-4 py-2.5 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50 dark:border-rose-900/30 dark:text-rose-400 dark:hover:bg-rose-950/20"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={toggleMenu}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-purple-700"
                >
                  Get Started
                  <Sparkles className="h-4 w-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;