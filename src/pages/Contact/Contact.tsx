import React, { useState } from 'react';
import { toast } from 'sonner';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
 
  Globe, 
  ChevronDown, 
  Send, 
  Sparkles, 
  ArrowRight,
  MessageSquare,
  Shield,
  Zap,
  HelpCircle
} from 'lucide-react';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  value: string;
  details: string;
}

interface SocialLink {
  icon: React.ReactNode;
  name: string;
  url: string;
  username: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface FormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  // Form State
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Mock Contact Info Data
  const contactInfoData: ContactInfo[] = [
    {
      icon: <Mail className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />,
      title: 'Email Us',
      value: 'topu9872@notepilot.ai',
      details: 'Online support team response within 24 hours',
    },
    {
      icon: <Phone className="w-5 h-5 text-violet-500 dark:text-violet-400" />,
      title: 'Call Us',
      value: '+880 1770977764',
      details: 'Available for instant high-tier enterprise assistance',
    },
    {
      icon: <MapPin className="w-5 h-5 text-purple-500 dark:text-purple-400" />,
      title: 'Location',
      value: 'Dhaka, Bangladesh',
      details: 'HQ operations and global engineering hub',
    },
    {
      icon: <Clock className="w-5 h-5 text-fuchsia-500 dark:text-fuchsia-400" />,
      title: 'Working Hours',
      value: 'Sunday–Thursday',
      details: '9:00 AM – 6:00 PM (GMT+6)',
    },
  ];

  // Mock Social Links Data
  const socialLinksData: SocialLink[] = [
    {
      icon: <FaGithub className="w-5 h-5" />,
      name: 'GitHub',
      url: 'https://github.com/topu9872-cpu',
      username: '@topu9872-cpu',
    },
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/mehedi-hasan-topu',
      username: 'mehedi-hasan-topu',
    },
    {
      icon: <FaFacebook className="w-5 h-5" />,
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61578488636020',
      username: 'NotePilot AI Official',
    },
    {
      icon: <Globe className="w-5 h-5" />,
      name: 'Portfolio',
      url: 'https://topudev.vercel.app',
      username: 'topudev.vercel.app',
    },
  ];

  // Mock FAQ Data
  const faqData: FaqItem[] = [
    {
      question: 'Is NotePilot AI free?',
      answer: 'Yes! NotePilot AI offers a robust Free Tier that includes essential AI note generation, core structuring options, and daily credits. Premium tiers are available for heavy workloads and unlimited AI integration.',
    },
    {
      question: 'How secure are my notes?',
      answer: 'Security is our baseline. All data handled by NotePilot AI is encrypted both in transit using TLS 1.3 and at rest with AES-256 standard encryption. Your notes are fully isolated and secure.',
    },
    {
      question: 'Can I use Google Login?',
      answer: 'Absolutely. NotePilot AI supports seamless standard single sign-on (SSO) authentication flows including Google Login to ensure fast and secure access to your personal digital dashboard.',
    },
    {
      question: 'Do you support AI note summarization?',
      answer: 'Yes, our custom language models specialize in instant multi-format summarization. You can condense dense documentation, meetings, or lecture notes into clean bulleted action steps in seconds.',
    },
  ];

  // Handle Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields before sending.');
      return;
    }

    setIsSubmitting(true);

    // Mock response delay
    setTimeout(() => {
      toast.success('Message sent successfully! Our AI coordination team will be in touch soon.');
      setFormData({ fullName: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  // Toggle FAQ Accordion
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden transition-colors duration-300">
      
      {/* Decorative AI Aesthetic Background Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[800px] right-1/4 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />

      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-16 px-4 max-w-7xl mx-auto text-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-sm font-medium tracking-wide rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 backdrop-blur-sm">
          <Sparkles className="w-4 h-4" />
          <span>Connect Instantly</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 dark:from-white dark:via-slate-200 dark:to-slate-400">
          Contact Us
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
          Have structural questions about NotePilot AI, feature requests, or enterprise scaling goals? Get in touch with our engineering team today.
        </p>
      </section>

      {/* Grid Layout Container for Contact Form & Info Cards */}
      <section className="max-w-7xl mx-auto px-4 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 2. Contact Form Container */}
          <div className="lg:col-span-7 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-xl shadow-slate-100/50 dark:shadow-none">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight">Drop us a Line</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Fill out our encrypted communication channel input matrix.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Mehedi Hasan"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@domain.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-300">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="How can we assist you?"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project requirements..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 resize-none animate-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium px-6 py-3.5 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                <span>{isSubmitting ? 'Processing Network Transmission...' : 'Send Message'}</span>
                <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </button>
            </form>
          </div>

          {/* 3. Contact Information Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {contactInfoData.map((info, idx) => (
                <div 
                  key={idx} 
                  className="group bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      {info.icon}
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">{info.title}</p>
                      <p className="text-base font-semibold text-slate-900 dark:text-slate-100">{info.value}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">{info.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 4. Social Links Cards */}
            <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold mb-4 tracking-wide text-slate-900 dark:text-slate-100">Global Synchronizations</h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinksData.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col p-3 rounded-xl bg-slate-100/50 hover:bg-indigo-500/5 dark:bg-slate-800/40 dark:hover:bg-indigo-500/10 border border-slate-200/50 dark:border-slate-800/50 group transition-all duration-300 hover:border-indigo-500/30 dark:hover:border-indigo-500/30"
                  >
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                      <div className="group-hover:rotate-12 transition-transform duration-300">
                        {social.icon}
                      </div>
                      <span className="text-sm font-semibold">{social.name}</span>
                    </div>
                    <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 truncate">{social.username}</span>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FAQ Preview Section */}
      <section className="max-w-4xl mx-auto px-4 pb-24 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 text-xs font-semibold rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Knowledge Base</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-2">Get quick answers to common structural paradigms.</p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors duration-200 focus:outline-none"
                >
                  <span className="text-base md:text-lg font-semibold pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transform transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-indigo-500' : ''}`} />
                </button>
                
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-48 border-t border-slate-100 dark:border-slate-800/50' : 'max-h-0'
                  }`}
                >
                  <p className="p-5 text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50/50 dark:bg-slate-950/20">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Call To Action (CTA) Section */}
      <section className="max-w-6xl mx-auto px-4 pb-24 relative z-10">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 text-white p-8 md:p-14 text-center border border-indigo-500/20 shadow-2xl shadow-indigo-950/20">
          
          {/* Subtle overlay grid lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-60" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Let's Build Smarter Notes Together
            </h2>
            <p className="text-slate-300 text-base md:text-lg font-normal leading-relaxed opacity-90">
              Empower your knowledge mapping lifecycle. Tap into structural AI parsing matrix frameworks with customized workspace synchronization models.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-950 font-bold px-6 py-3.5 rounded-xl hover:bg-slate-100 active:scale-[0.98] transition-all duration-200 shadow-md">
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-6 py-3.5 rounded-xl backdrop-blur-sm active:scale-[0.98] transition-all duration-200">
                <span>Explore Notes</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;