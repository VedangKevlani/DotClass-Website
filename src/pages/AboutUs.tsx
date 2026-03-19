import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Lightbulb,
  Users,
  Heart,
  ArrowRight,
  Sparkles,
  Globe,
  BookOpen,
  Award,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */
const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We push the boundaries of what's possible in education tech, turning bold ideas into tools that actually work in classrooms.",
  },
  {
    icon: Globe,
    title: "Accessibility",
    desc: "Education has no borders. We eliminate barriers — geographic, financial, linguistic — so everyone can learn.",
  },
  {
    icon: Heart,
    title: "Student-First",
    desc: "Every decision we make starts with a single question: does this make the journey better for the student?",
  },
];

const stats = [
  { value: "120K+", label: "Students Empowered" },
  { value: "40+",   label: "Countries Reached" },
  { value: "2015",  label: "Founded" },
  { value: "98%",   label: "Satisfaction Rate" },
];

const team = [
  {
    name: "Sophia Khan",
    role: "Co-Founder & CEO",
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
  },
  {
    name: "Marcus Wright",
    role: "Chief Technology Officer",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    name: "Elena Rodriguez",
    role: "Head of Curriculum",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
  {
    name: "David Kim",
    role: "VP of Growth",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
  },
];

const lifePhotos = [
  {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
    span: "col-span-2 row-span-2",
    caption: "Team offsite, Kingston 2024",
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
    span: "col-span-1 row-span-1",
    caption: "Hackathon week",
  },
  {
    src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80",
    span: "col-span-1 row-span-1",
    caption: "All-hands 2025",
  },
];

/* ------------------------------------------------------------------ */
/*  Stat Card                                                           */
/* ------------------------------------------------------------------ */
function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div {...fadeUp(delay)} className="flex flex-col items-center gap-1">
      <span className="text-4xl md:text-5xl font-black text-[#47BA74] tracking-tight">{value}</span>
      <span className="text-sm text-gray-500 font-medium">{label}</span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                      */
/* ------------------------------------------------------------------ */
export default function AboutUs() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [email, setEmail] = useState("");
  const [subSent, setSubSent] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5faf7] text-gray-900 antialiased overflow-x-hidden">

      {/* ============================================================
          HERO — parallax
      ============================================================ */}
      <section ref={heroRef} className="relative h-[88vh] flex items-center overflow-hidden">
        {/* Parallax bg image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1800&q=80')",
            y: heroY,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f13]/90 via-[#1b3a24]/70 to-transparent" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-10 w-full"
        >
          <motion.span
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 text-[#47BA74] text-sm font-semibold uppercase tracking-widest mb-6"
          >
            <Sparkles size={14} /> Our Story
          </motion.span>

          <motion.h1
            {...fadeUp(0.08)}
            className="text-6xl md:text-7xl font-black text-white leading-[1.05] max-w-3xl mb-6"
          >
            Empowering learners,{" "}
            <span className="text-[#47BA74]">one class at a time.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="text-white/70 text-lg max-w-xl leading-relaxed mb-10"
          >
            DotClass was born from a simple belief: world-class education should be
            universally accessible. We've been making that a reality through technology
            since 2015.
          </motion.p>

          <motion.div {...fadeUp(0.22)} className="flex items-center gap-4">
            <Link to="/careers">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#47BA74] text-white font-bold px-8 py-4 rounded-2xl shadow-xl flex items-center gap-2 hover:bg-[#3ea664] transition-colors"
              >
                Join the Team <ArrowRight size={16} />
              </motion.button>
            </Link>
            <Link to="/contact">
              <button className="text-white/80 hover:text-white font-medium flex items-center gap-1.5 transition-colors">
                Get in touch <ArrowRight size={14} />
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================================
          STATS BAR
      ============================================================ */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-10 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} delay={i * 0.08} />
          ))}
        </div>
      </section>

      {/* ============================================================
          MISSION + VISION
      ============================================================ */}
      <section className="max-w-7xl mx-auto px-10 py-28 grid md:grid-cols-2 gap-16 items-center">

        {/* Left: image */}
        <motion.div {...fadeUp(0)} className="relative h-[480px]">
          <div
            className="absolute inset-0 rounded-[40px] overflow-hidden shadow-2xl bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=900&q=80')" }}
          />
          {/* Floating accent card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            className="absolute -right-8 -bottom-8 bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 max-w-[220px]"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#47BA74]/10 flex items-center justify-center">
                <BookOpen size={16} className="text-[#47BA74]" />
              </div>
              <span className="text-sm font-bold">Our Mission</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              To make high-quality education accessible to every student everywhere.
            </p>
          </motion.div>
        </motion.div>

        {/* Right: text */}
        <div className="flex flex-col gap-12">
          <motion.div {...fadeUp(0.1)}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#47BA74]/10 flex items-center justify-center">
                <BookOpen size={18} className="text-[#47BA74]" />
              </div>
              <h2 className="text-2xl font-bold">Our Mission</h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-[15px]">
              To make high-quality education accessible to every student, everywhere — regardless
              of geography, income, or background. DotClass exists to close the opportunity gap
              through technology and community.
            </p>
          </motion.div>

          <div className="h-px bg-gradient-to-r from-[#47BA74]/30 to-transparent" />

          <motion.div {...fadeUp(0.18)}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#47BA74]/10 flex items-center justify-center">
                <Award size={18} className="text-[#47BA74]" />
              </div>
              <h2 className="text-2xl font-bold">Our Vision</h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-[15px]">
              To become the global leader in democratising education — building an interconnected
              digital ecosystem that puts the learner at the very centre of their own success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          VALUES
      ============================================================ */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-10">
          <motion.h2 {...fadeUp()} className="text-4xl font-black mb-3">Our Values</motion.h2>
          <motion.p {...fadeUp(0.06)} className="text-gray-500 mb-14 text-base max-w-xl">
            The principles that guide every product decision, every hire, and every line of code.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  {...fadeUp(i * 0.1)}
                  whileHover={{ y: -6 }}
                  className="relative group bg-[#f5faf7] border border-[#e2f4eb] rounded-[28px] p-8 overflow-hidden cursor-default transition-all hover:shadow-2xl hover:border-[#47BA74]/40"
                >
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#47BA74]/5 group-hover:bg-[#47BA74]/10 transition-colors" />
                  <div className="w-12 h-12 rounded-2xl bg-[#47BA74]/15 flex items-center justify-center mb-6 relative">
                    <Icon size={22} className="text-[#47BA74]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                  <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#47BA74] to-[#3ea664] transition-all duration-500 rounded-b-[28px]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          LIFE AT DOTCLASS
      ============================================================ */}
      <section className="max-w-7xl mx-auto px-10 py-28">
        <motion.h2 {...fadeUp()} className="text-4xl font-black mb-3">Life at DotClass</motion.h2>
        <motion.p {...fadeUp(0.06)} className="text-gray-500 mb-12 text-base">
          Real moments, real people, real impact.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-auto lg:h-[520px]">
          {lifePhotos.map((photo, i) => (
            <motion.div
              key={i}
              {...fadeUp(i * 0.1)}
              className={`${photo.span} relative rounded-3xl overflow-hidden group cursor-pointer h-64 sm:h-auto`}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <span className="text-white text-sm font-medium">{photo.caption}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================================================
          LEADERSHIP TEAM
      ============================================================ */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-10">
          <motion.h2 {...fadeUp()} className="text-4xl font-black mb-3">Leadership Team</motion.h2>
          <motion.p {...fadeUp(0.06)} className="text-gray-500 mb-14">
            The humans behind DotClass.
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                {...fadeUp(i * 0.09)}
                whileHover={{ y: -8 }}
                className="group rounded-[28px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 bg-white"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e21]/60 to-transparent" />
                </div>
                <div className="p-5">
                  <p className="font-bold text-base">{member.name}</p>
                  <p className="text-gray-500 text-sm mt-0.5">{member.role}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#47BA74]" />
                    <span className="text-xs text-[#47BA74] font-medium">DotClass</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA — Ready to join?
      ============================================================ */}
      <section className="relative overflow-hidden py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2e21] via-[#1d3b26] to-[#47BA74]/60" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #47BA74 0%, transparent 60%), radial-gradient(circle at 80% 20%, #3ea664 0%, transparent 50%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-10 text-center">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 bg-[#47BA74]/20 border border-[#47BA74]/40 text-[#47BA74] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              <Users size={14} /> We're Growing
            </span>
          </motion.div>

          <motion.h2 {...fadeUp(0.08)} className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Ready to join<br />our mission?
          </motion.h2>

          <motion.p {...fadeUp(0.14)} className="text-white/70 text-base leading-relaxed mb-10 max-w-xl mx-auto">
            We're always looking for passionate educators, engineers and thinkers to
            accelerate the future of education. Come build with us.
          </motion.p>

          <motion.div {...fadeUp(0.2)} className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <Link to="/careers">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#47BA74] hover:bg-[#3ea664] text-white font-bold px-9 py-4 rounded-2xl shadow-xl transition-colors flex items-center gap-2"
              >
                View Careers <ArrowRight size={16} />
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-9 py-4 rounded-2xl backdrop-blur-sm transition-colors flex items-center gap-2"
              >
                <Mail size={16} /> Contact Us
              </motion.button>
            </Link>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            {...fadeUp(0.26)}
            className="bg-white/10 border border-white/15 rounded-2xl p-6 backdrop-blur-sm"
          >
            <p className="text-white/80 text-sm mb-4 font-medium">
              Subscribe to our newsletter for updates
            </p>
            {subSent ? (
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-[#47BA74] font-semibold text-sm"
              >
                ✅ You're subscribed! Welcome to the DotClass community.
              </motion.p>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubSent(true); }}
                className="flex gap-3"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#47BA74] transition"
                />
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="bg-[#47BA74] hover:bg-[#3ea664] text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors"
                >
                  Subscribe
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
