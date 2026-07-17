import { FaGithub, FaFacebook, FaLinkedin, FaGlobe } from 'react-icons/fa';

interface NavLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: typeof FaGithub;
  label: string;
  href: string;
}

const productLinks: NavLink[] = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'AI Notes', href: '#ai-notes' },
  { label: 'Explore Notes', href: '#explore' },
];

const companyLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'Careers', href: '#careers' },
  { label: 'Blog', href: '#blog' },
];

const resourceLinks: NavLink[] = [
  { label: 'Documentation', href: '#docs' },
  { label: 'Help Center', href: '#help' },
  { label: 'Community', href: '#community' },
  { label: 'Support', href: '#support' },
];

const socialLinks: SocialLink[] = [
  { icon: FaGithub, label: 'GitHub', href: 'https://github.com/topu9872-cpu' },
  {
    icon: FaFacebook,
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61578488636020',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mehedi-hasan-topu',
  },
  { icon: FaGlobe, label: 'Portfolio', href: 'https://topudev.vercel.app' },
];

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 px-4 pt-16 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="text-xl font-bold text-white">
              NotePilot{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                AI
              </span>
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
              AI-powered note management that helps you organize, summarize, and
              transform ideas into action.
            </p>
            <a
              href="https://topudev.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-900 px-4 py-2 text-sm font-medium text-gray-300 transition-all duration-300 hover:scale-[1.02] hover:border-indigo-500/50 hover:bg-gray-800 hover:text-white"
            >
              <FaGlobe className="h-4 w-4 text-indigo-400" />
              topudev.vercel.app
            </a>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-200">
              Product
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition-all duration-300 hover:translate-x-0.5 hover:text-indigo-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-200">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition-all duration-300 hover:translate-x-0.5 hover:text-indigo-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-200">
              Resources
            </h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition-all duration-300 hover:translate-x-0.5 hover:text-indigo-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social + Bottom Section */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-800 bg-gray-900 text-gray-400 transition-all duration-300 hover:scale-110 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-400"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>

            {/* Bottom Links */}
            <div className="flex items-center gap-6">
              <a
                href="#privacy"
                className="text-sm text-gray-500 transition-all duration-300 hover:text-indigo-400"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="text-sm text-gray-500 transition-all duration-300 hover:text-indigo-400"
              >
                Terms of Service
              </a>
            </div>
          </div>

          {/* Copyright */}
          <p className="mt-6 text-center text-sm text-gray-500 sm:text-left">
            &copy; {currentYear} NotePilot AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;