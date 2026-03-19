import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  TrendingUp,
  Heart,
  Monitor,
  Clock,
  BookOpen,
  Smile,
  Calendar,
  BarChart2,
  MapPin,
  ArrowRight,
  Send,
  Briefcase,
  X,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  Linkedin,
  Star,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */
interface Job {
  title: string;
  type: string;
  team: string;
  location: string;
  tag: string;
  deadline: string;
  description: string;
  requirements: string[];
  preferred: string[];
  contactMethods: string[];
}

/* ------------------------------------------------------------------ */
/*  Job Data (enriched)                                                 */
/* ------------------------------------------------------------------ */
const jobs: Job[] = [
  {
    title: "Senior Frontend Developer",
    type: "Full Time",
    team: "Engineering",
    location: "Remote",
    tag: "engineering",
    deadline: "April 15, 2025",
    description:
      "We're looking for a passionate Senior Frontend Developer to lead the development of our next-generation learning platform. You'll own the architecture of our React-based interfaces, mentor junior engineers, and work closely with product and design to ship features that millions of students depend on every day.",
    requirements: [
      "5+ years of experience in frontend development",
      "Expert-level proficiency in React and TypeScript",
      "Strong understanding of performance optimisation and accessibility (WCAG 2.1)",
      "Experience with design systems and component libraries",
      "Comfortable in an async-first remote environment",
    ],
    preferred: [
      "Experience with Framer Motion or GSAP animations",
      "Familiarity with EdTech products or platforms",
      "Previous experience in a startup or scale-up environment",
      "Open source contributions",
    ],
    contactMethods: ["Email", "LinkedIn", "Portfolio URL"],
  },
  {
    title: "AI Content Specialist",
    type: "Full Time",
    team: "Content Ops",
    location: "London / Hybrid",
    tag: "content",
    deadline: "April 30, 2025",
    description:
      "As our AI Content Specialist, you'll be at the intersection of education and artificial intelligence. You'll design, curate and quality-assure AI-generated educational content, develop prompt engineering frameworks, and ensure every piece of content meets DotClass's curriculum standards and tone of voice.",
    requirements: [
      "3+ years of content creation or curriculum design experience",
      "Demonstrated experience working with LLMs (GPT-4, Claude, Gemini, etc.)",
      "Strong writing and editorial skills in English",
      "Ability to evaluate AI output for accuracy, bias and pedagogical quality",
      "Familiarity with instructional design principles",
    ],
    preferred: [
      "Degree or background in Education, Linguistics or a related field",
      "Experience with Bloom's Taxonomy or similar frameworks",
      "Previous work in an EdTech or publishing company",
      "Proficiency in a second language",
    ],
    contactMethods: ["Email", "LinkedIn"],
  },
  {
    title: "UX Researcher",
    type: "Contract",
    team: "Product Design",
    location: "New York",
    tag: "design",
    deadline: "March 31, 2025",
    description:
      "Join our Product Design team as a UX Researcher and help us deeply understand the learners and educators who use DotClass every day. You'll plan and execute mixed-methods research, synthesise insights, facilitate usability studies and translate findings into actionable recommendations that shape our product roadmap.",
    requirements: [
      "3+ years of UX research experience in a product environment",
      "Proficiency in both qualitative and quantitative research methods",
      "Experience with tools such as Maze, Lookback, UserTesting or similar",
      "Strong presentation and storytelling skills",
      "Ability to turn ambiguous problems into clear research questions",
    ],
    preferred: [
      "Background in cognitive psychology or human-computer interaction",
      "Experience researching products used in educational settings",
      "Familiarity with Figma for annotating prototypes",
      "Experience working in an agile product team",
    ],
    contactMethods: ["Email", "Portfolio URL", "LinkedIn"],
  },
];

/* ------------------------------------------------------------------ */
/*  Static Data                                                         */
/* ------------------------------------------------------------------ */
const perks = [
  { icon: Heart,     label: "Comprehensive Health",  desc: "Medical, dental & vision for you and your family." },
  { icon: Clock,     label: "Flexible Hours",         desc: "Work when you're at your best — async-first culture." },
  { icon: BookOpen,  label: "Learning Stipend",       desc: "$1,500/yr for courses, books & conferences." },
  { icon: Smile,     label: "Wellness Programs",      desc: "Monthly wellness budget + mental health days." },
  { icon: Calendar,  label: "Paid Time Off",          desc: "Unlimited PTO — we mean it. Rest matters." },
  { icon: BarChart2, label: "Equity Options",         desc: "Everyone owns a piece of what we're building." },
];

const whyItems = [
  { icon: Globe,      title: "Remote First",   desc: "Work from anywhere in the world with flexible schedules." },
  { icon: TrendingUp, title: "Growth Driven",  desc: "Dedicated learning budgets and clear career progression." },
  { icon: Monitor,    title: "Real Impact",    desc: "Build tools that empower millions of students worldwide." },
];

const filters = ["All", "Engineering", "Design", "Content"];

const contactIcons: Record<string, React.ElementType> = {
  Email: Mail,
  LinkedIn: Linkedin,
  "Portfolio URL": Globe,
  Phone: Phone,
};

/* ------------------------------------------------------------------ */
/*  Fade-up helper                                                      */
/* ------------------------------------------------------------------ */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

/* ------------------------------------------------------------------ */
/*  Application Modal                                                   */
/* ------------------------------------------------------------------ */
function ApplicationModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const [contactMethod, setContactMethod] = useState(job.contactMethods[0]);
  const [form, setForm] = useState({ name: "", email: "", contact: "", coverLetter: "", resumeLink: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      />

      {/* Drawer */}
      <motion.div
        key="drawer"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 280 }}
        className="fixed top-0 right-0 h-full w-full max-w-2xl z-50 bg-white shadow-2xl flex flex-col overflow-hidden"
      >
        {/* ── Header ── */}
        <div className="flex items-start justify-between px-8 pt-8 pb-6 border-b border-gray-100 flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                job.type === "Full Time" ? "bg-[#47BA74]/10 text-[#47BA74]" : "bg-amber-50 text-amber-600"
              }`}>
                {job.type}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <MapPin size={11} /> {job.location}
              </span>
            </div>
            <h2 className="text-2xl font-black text-gray-900">{job.title}</h2>
            <p className="text-sm text-gray-400 mt-0.5 flex items-center gap-1.5">
              <Briefcase size={13} /> {job.team}
              <span className="mx-2 text-gray-200">|</span>
              <AlertCircle size={13} className="text-rose-400" />
              <span className="text-rose-400 font-medium">Deadline: {job.deadline}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:border-rose-300 hover:bg-rose-50 transition-colors flex-shrink-0"
          >
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">

          {/* Job Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">About the Role</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{job.description}</p>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Requirements</h3>
            <ul className="space-y-2">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <CheckCircle2 size={15} className="text-[#47BA74] flex-shrink-0 mt-0.5" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Preferred */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
              Special Requirements
              <span className="ml-2 text-[10px] normal-case font-medium bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">Preferred</span>
            </h3>
            <p className="text-xs text-gray-400 mb-3">Nice to haves — don't let these stop you from applying.</p>
            <ul className="space-y-2">
              {job.preferred.map((pref, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-500">
                  <Star size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  {pref}
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-[#47BA74]/30 to-transparent" />

          {/* Application Form */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-10 gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#47BA74] flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-gray-900">Application Submitted!</h3>
              <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                Thanks for applying for <strong>{job.title}</strong>. We'll review your application and get back to you before the deadline.
              </p>
              <button
                onClick={onClose}
                className="mt-2 bg-gradient-to-r from-[#47BA74] to-[#3ea664] text-white font-bold px-8 py-3 rounded-2xl shadow-lg"
              >
                Done
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Your Application</h3>

              {/* Name */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Full Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Jane Smith"
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#47BA74] focus:ring-2 focus:ring-[#47BA74]/15 transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Email Address *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={set("email")}
                  placeholder="jane@example.com"
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#47BA74] focus:ring-2 focus:ring-[#47BA74]/15 transition"
                />
              </div>

              {/* Contact Method */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                  Preferred Contact Method *
                </label>
                <div className="flex flex-wrap gap-2">
                  {job.contactMethods.map((method) => {
                    const Icon = contactIcons[method] ?? Mail;
                    const active = contactMethod === method;
                    return (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setContactMethod(method)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                          active
                            ? "bg-[#47BA74] text-white border-[#47BA74] shadow-md"
                            : "border-gray-200 text-gray-600 hover:border-[#47BA74]/50"
                        }`}
                      >
                        <Icon size={13} /> {method}
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic contact input */}
                <input
                  required
                  value={form.contact}
                  onChange={set("contact")}
                  placeholder={
                    contactMethod === "Email" ? "your@email.com"
                    : contactMethod === "LinkedIn" ? "linkedin.com/in/yourname"
                    : contactMethod === "Portfolio URL" ? "yourportfolio.com"
                    : "Your phone number"
                  }
                  className="w-full mt-3 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#47BA74] focus:ring-2 focus:ring-[#47BA74]/15 transition"
                />
              </div>

              {/* Resume Link */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  Resume / CV Link *
                  <span className="ml-2 text-[10px] normal-case font-normal text-gray-400">(Google Drive, Dropbox, etc.)</span>
                </label>
                <input
                  required
                  value={form.resumeLink}
                  onChange={set("resumeLink")}
                  placeholder="https://drive.google.com/..."
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#47BA74] focus:ring-2 focus:ring-[#47BA74]/15 transition"
                />
              </div>

              {/* Cover Letter */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  Cover Letter / Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.coverLetter}
                  onChange={set("coverLetter")}
                  placeholder="Tell us why you're the perfect fit for this role..."
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#47BA74] focus:ring-2 focus:ring-[#47BA74]/15 transition resize-none"
                />
              </div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-[#47BA74] to-[#3ea664] text-white font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow flex items-center justify-center gap-2"
              >
                Submit Application <Send size={15} />
              </motion.button>

              <p className="text-center text-xs text-gray-400">
                By applying you agree to our{" "}
                <span className="text-[#47BA74] cursor-pointer hover:underline">Privacy Policy</span>.
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                      */
/* ------------------------------------------------------------------ */
export default function Careers() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [email, setEmail] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [sent, setSent] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const openingsRef = useRef<HTMLDivElement>(null);

  const filteredJobs = jobs.filter(
    (j) => activeFilter === "All" || j.tag === activeFilter.toLowerCase()
  );

  const scrollToOpenings = () => openingsRef.current?.scrollIntoView({ behavior: "smooth" });
  const handleSend = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };

  return (
    <div className="min-h-screen bg-[#f4faf6] text-gray-900 antialiased">

      {/* Application Modal */}
      {selectedJob && (
        <ApplicationModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}

      {/* ============================================================
          HERO
      ============================================================ */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2e21]/80 via-[#1d3b26]/70 to-[#47BA74]/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-32 flex flex-col items-start gap-6">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 bg-[#47BA74]/20 border border-[#47BA74]/40 text-[#47BA74] text-sm font-semibold px-4 py-1.5 rounded-full backdrop-blur-sm mb-4">
              <Briefcase size={14} /> We're Hiring
            </span>
          </motion.div>

          <motion.h1 {...fadeUp(0.08)} className="text-5xl md:text-6xl font-bold text-white leading-tight max-w-2xl">
            Shape the Future of <span className="text-[#47BA74]">Learning.</span>
          </motion.h1>

          <motion.p {...fadeUp(0.16)} className="text-white/75 text-lg max-w-xl leading-relaxed">
            Join a team dedicated to innovation, growth, and making a real impact in global education.
          </motion.p>

          <motion.button
            {...fadeUp(0.22)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToOpenings}
            className="mt-2 bg-[#47BA74] hover:bg-[#3ea664] text-white font-semibold px-8 py-4 rounded-2xl shadow-xl transition-colors flex items-center gap-2"
          >
            View Openings <ArrowRight size={16} />
          </motion.button>
        </div>
      </section>

      {/* ============================================================
          WHY WORK WITH US
      ============================================================ */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <motion.h2 {...fadeUp()} className="text-3xl font-bold mb-14 text-gray-900">Why Work With Us</motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {whyItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                {...fadeUp(i * 0.1)}
                className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#47BA74]/10 flex items-center justify-center mb-5 group-hover:bg-[#47BA74]/20 transition-colors">
                  <Icon size={22} className="text-[#47BA74]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ============================================================
          PERKS & BENEFITS
      ============================================================ */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-8">
          <motion.h2 {...fadeUp()} className="text-3xl font-bold mb-3">Perks &amp; Benefits</motion.h2>
          <motion.p {...fadeUp(0.06)} className="text-gray-500 mb-14 text-base">We invest in the whole person — not just the role.</motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <motion.div
                  key={perk.label}
                  {...fadeUp(i * 0.07)}
                  className="flex items-start gap-4 bg-[#f4faf6] rounded-2xl p-6 border border-[#e2f4eb] hover:border-[#47BA74]/40 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#47BA74]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={18} className="text-[#47BA74]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">{perk.label}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{perk.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          CURRENT OPENINGS
      ============================================================ */}
      <section ref={openingsRef} className="max-w-7xl mx-auto px-8 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <motion.h2 {...fadeUp()} className="text-3xl font-bold mb-2">Current Openings</motion.h2>
            <motion.p {...fadeUp(0.06)} className="text-gray-500 text-sm">Find your next challenge.</motion.p>
          </div>

          <motion.div {...fadeUp(0.1)} className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
                  activeFilter === f
                    ? "bg-[#47BA74] text-white border-[#47BA74] shadow-md"
                    : "border-gray-200 text-gray-600 hover:border-[#47BA74]/50"
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="flex flex-col gap-5">
          {filteredJobs.map((job, i) => (
            <motion.div
              key={job.title}
              {...fadeUp(i * 0.08)}
              className="group bg-white rounded-3xl border border-gray-100 px-8 py-7 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm hover:shadow-xl hover:border-[#47BA74]/30 transition-all duration-300"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <span className={`text-xs font-bold px-3 py-0.5 rounded-full ${
                    job.type === "Full Time" ? "bg-[#47BA74]/10 text-[#47BA74]" : "bg-amber-50 text-amber-600"
                  }`}>
                    {job.type}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                  <span className="flex items-center gap-1"><Briefcase size={13} /> {job.team}</span>
                  <span className="flex items-center gap-1"><MapPin size={13} /> {job.location}</span>
                  <span className="flex items-center gap-1 text-rose-400">
                    <AlertCircle size={13} /> Closes {job.deadline}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedJob(job)}
                className="flex-shrink-0 bg-gradient-to-r from-[#47BA74] to-[#3ea664] text-white font-semibold px-8 py-3.5 rounded-2xl shadow-md hover:shadow-xl transition-shadow flex items-center gap-2"
              >
                Apply Now <ArrowRight size={15} />
              </motion.button>
            </motion.div>
          ))}

          {filteredJobs.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              No openings in this category right now. Check back soon!
            </div>
          )}
        </div>
      </section>

      {/* ============================================================
          CAN'T FIND THE RIGHT FIT
      ============================================================ */}
      <section className="bg-white py-24">
        <div className="max-w-2xl mx-auto px-8">
          <motion.div
            {...fadeUp()}
            className="bg-gradient-to-br from-[#f4faf6] to-white rounded-[32px] border border-[#e2f4eb] shadow-lg p-12 text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#47BA74]/10 flex items-center justify-center mx-auto mb-6">
              <Send size={22} className="text-[#47BA74]" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Can't find the right fit?</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Drop your resume and we'll keep you in mind for future roles.
            </p>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3 py-6"
              >
                <div className="w-14 h-14 rounded-full bg-[#47BA74] flex items-center justify-center shadow-lg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-semibold text-gray-800">Details sent! We'll be in touch 🎉</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSend} className="flex flex-col gap-4 text-left">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-[#47BA74] focus:ring-2 focus:ring-[#47BA74]/20 transition"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Resume Link or Role</label>
                  <input
                    type="text"
                    value={resumeLink}
                    onChange={(e) => setResumeLink(e.target.value)}
                    placeholder="LinkedIn URL or Title"
                    className="w-full border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-[#47BA74] focus:ring-2 focus:ring-[#47BA74]/20 transition"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#1a2e21] to-[#2d4a35] text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2 mt-2"
                >
                  Send Details <Send size={15} />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

    </div>
  );
}