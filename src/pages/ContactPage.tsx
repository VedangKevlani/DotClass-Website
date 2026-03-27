import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  Loader2,
  Sparkles,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import clsx from "clsx";

/* =========================================================
   Enterprise Schema
========================================================= */

const schema = z.object({
  method: z.enum(["email", "sms", "whatsapp"]),
  reason: z.string().min(1),
  name: z.string().min(2),
  contact: z.string().min(1),
  message: z.string().min(5),
});

type FormData = z.infer<typeof schema>;

/* =========================================================
   Founder-Level AI Intent Engine (Mock Layer)
========================================================= */

function generateIntentResponse(
  method: string,
  reason: string,
  stage: number
) {
  if (!method) return "Welcome. How would you like to contact us today?";
  if (stage === 0) return `You selected ${method}. What is the purpose of your inquiry?`;
  if (stage === 1) return `Reason noted as "${reason}". Tell us your message and details.`;
  return "Review your inquiry and click Submit when ready.";
}

/* =========================================================
   Confirmation View
========================================================= */

function ConfirmationView({
  selectedMethod,
  onReset,
}: {
  selectedMethod: string;
  onReset: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center text-center px-6 py-10 min-h-[520px]"
    >
      {/* Animated graphic */}
      <div className="relative mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="w-48 h-48 rounded-full border-2 border-dashed border-[#47BA74]/40 flex items-center justify-center"
        >
          <div className="w-36 h-36 bg-white rounded-3xl shadow-xl flex items-center justify-center relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 18 }}
              className="w-16 h-16 bg-[#47BA74] rounded-full flex items-center justify-center shadow-lg"
            >
              <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8"
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                />
              </motion.svg>
            </motion.div>
            <div className="absolute bottom-3 left-4 right-4 h-1 bg-gradient-to-r from-[#47BA74] to-[#3ea664] rounded-full opacity-60" />
          </div>
        </motion.div>

        {/* Floating envelope */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="absolute -left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#47BA74] rounded-xl flex items-center justify-center shadow-md"
        >
          <Mail size={16} className="text-white" />
        </motion.div>

        {/* Floating send */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="absolute -right-2 top-6 w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-md border border-[#47BA74]/20"
        >
          <Send size={14} className="text-[#47BA74]" />
        </motion.div>
      </div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="text-3xl font-bold tracking-tight text-gray-900 mb-4"
      >
        Message Sent!
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="text-gray-500 text-sm leading-relaxed max-w-xs mb-8"
      >
        Thank you for reaching out. Our AI agent has received your request and
        we will get back to you shortly via your{" "}
        <span className="text-[#47BA74] font-semibold italic capitalize">
          {selectedMethod}
        </span>
        .
      </motion.p>

      {/* AI Support Active card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="w-full max-w-xs bg-white border border-gray-100 rounded-2xl px-5 py-4 flex items-center gap-4 shadow-sm mb-10"
      >
        <div className="w-10 h-10 rounded-xl bg-[#47BA74]/10 flex items-center justify-center flex-shrink-0">
          <Sparkles size={18} className="text-[#47BA74]" />
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold text-gray-800">AI Support Active</p>
          <p className="text-xs text-gray-400">Usually responds within 5 minutes</p>
        </div>
      </motion.div>

      {/* Back to Home button */}
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onReset}
        className="w-full max-w-xs bg-gradient-to-r from-[#47BA74] to-[#3ea664] text-white font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow flex items-center justify-center gap-3 text-base mb-4"
      >
        Back to Home <span className="text-lg">🏠</span>
      </motion.button>

      {/* View My Tickets */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.95 }}
        className="text-sm text-gray-400 hover:text-[#47BA74] cursor-pointer transition-colors"
      >
        View My Tickets
      </motion.p>
    </motion.div>
  );
}

/* =========================================================
   Component
========================================================= */

export default function ContactPage() {
  const [method, setMethod] = useState<"email" | "sms" | "whatsapp">("email");
  const [reason, setReason] = useState("");
  const [stage, setStage] = useState(0);
  const [typing, setTyping] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedMethod, setSubmittedMethod] = useState("email");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { method: "email" },
  });

  const aiMessage = useMemo(() => {
    return generateIntentResponse(method, reason, stage);
  }, [method, reason, stage]);

  const selectMethod = (m: "email" | "sms" | "whatsapp") => {
    setMethod(m);
    setValue("method", m);
    setValue("contact", "");
    setTyping(true);
    setTimeout(() => setTyping(false), 400);
    setStage(0);
  };

  const selectReason = (r: string) => {
    setReason(r);
    setValue("reason", r);
    setTyping(true);
    setTimeout(() => setTyping(false), 400);
    setStage(1);
  };

  const handleReset = () => {
    setSubmitted(false);
    setMethod("email");
    setReason("");
    setStage(0);
    reset({ method: "email" });
  };

  const onSubmit = async (data: FormData) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      console.log("Attempting to submit to:", `${apiUrl}/api/contact/send`);
      const response = await fetch(`${apiUrl}/api/contact/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("Server response:", result);

      if (!response.ok) {
        // Surface the real error from the server
        const msg = result.details || result.error || "Unknown server error";
        alert(`❌ Failed to send: ${msg}`);
        return;
      }

      if (result.whatsapp) {
        window.open(result.whatsapp, "_blank");
      }

      setSubmittedMethod(data.method);
      setSubmitted(true);
    } catch (error) {
      console.error("Submit error:", error);
      alert("Submission failed. Please check your connection and try again.");
    }
  };

  return (
    <section className="pt-8 md:pt-12 pb-24 px-4 sm:px-8">
      <div className="min-h-screen bg-gradient-to-br from-[#E0EADB] via-white to-[#F6F9F3] flex items-center justify-center py-8 md:p-12 antialiased">
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/70 backdrop-blur-3xl border border-white/40 shadow-2xl rounded-[32px] md:rounded-[44px] p-6 sm:p-10 md:p-12">

          {/* AI Conversation Column */}
          <div className="flex flex-col justify-between border-b pb-10 md:border-b-0 md:border-r md:pr-10 md:pb-0">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-4 rounded-2xl bg-[#47BA74]/20 shadow-lg">
                <Bot className="text-[#47BA74]" />
              </div>
              <h2 className="text-xl font-semibold tracking-tight">AI Assistant</h2>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={submitted ? "confirmed" : aiMessage}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="relative bg-[#47BA74]/10 p-8 rounded-3xl min-h-[140px] flex items-start gap-3 leading-relaxed text-gray-700 text-sm"
              >
                {typing && <Loader2 size={16} className="animate-spin mt-1" />}
                <p>
                  {submitted
                    ? "Your message was successfully delivered. Our team will reach out shortly. Have a wonderful day! 🎉"
                    : aiMessage}
                </p>
              </motion.div>
            </AnimatePresence>

            <p className="text-xs text-gray-400 mt-6">
              Powered by next-generation conversational intent modeling.
            </p>
          </div>

          {/* Form / Confirmation Column */}
          <AnimatePresence mode="wait">
            {submitted ? (
              <ConfirmationView
                key="confirmation"
                selectedMethod={submittedMethod}
                onReset={handleReset}
              />
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-9"
              >
                <h1 className="text-3xl font-semibold tracking-tight">
                  Contact Our Team
                </h1>

                {/* Method Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "email", icon: Mail },
                    { id: "sms", icon: MessageCircle },
                    { id: "whatsapp", icon: Phone },
                  ].map((item) => {
                    const Icon = item.icon;
                    const active = method === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => selectMethod(item.id as any)}
                        className={clsx(
                          "group relative p-6 rounded-3xl border transition-all duration-500 hover:shadow-xl",
                          active
                            ? "border-[#47BA74] bg-[#47BA74]/10 scale-[1.03]"
                            : "border-gray-200 hover:border-[#47BA74]/40"
                        )}
                      >
                        <div
                          className={clsx(
                            "p-4 rounded-2xl transition-all",
                            active
                              ? "bg-[#47BA74]/20 text-[#47BA74]"
                              : "bg-gray-100 group-hover:bg-[#47BA74]/10 group-hover:text-[#47BA74]"
                          )}
                        >
                          <Icon size={20} />
                        </div>
                        <span className="block mt-4 text-sm font-semibold capitalize">
                          {item.id}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Reason Chips */}
                <div className="flex flex-wrap gap-3">
                  {["Support", "Feedback", "Business Enquiry"].map((r) => {
                    const active = reason === r;
                    return (
                      <button
                        key={r}
                        type="button"
                        onClick={() => selectReason(r)}
                        className={clsx(
                          "px-6 py-2.5 rounded-full border text-sm transition-all",
                          active
                            ? "bg-[#47BA74] text-white border-[#47BA74] shadow-md"
                            : "hover:border-[#47BA74]"
                        )}
                      >
                        {r}
                      </button>
                    );
                  })}
                </div>

                {/* Inputs */}
                <input
                  {...register("name")}
                  placeholder="Your Name"
                  className="w-full border rounded-2xl p-4"
                />

                <input
                  {...register("contact")}
                  placeholder={method === "email" ? "Email Address" : "Phone Number"}
                  className="w-full border rounded-2xl p-4"
                />

                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full border rounded-2xl p-4"
                />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center gap-3 bg-gradient-to-r from-[#47BA74] to-[#3ea664] text-white py-5 rounded-2xl shadow-xl hover:shadow-2xl transition"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      Submit Inquiry
                      <Send size={18} />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}