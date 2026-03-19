import { motion } from "framer-motion"

interface Props {
  message: string
}

export default function AIAssistant({ message }: Props) {
  return (
    <div className="flex gap-4">
      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
        AI
      </div>

      <motion.div
        key={message}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-lg rounded-xl p-5 max-w-md"
      >
        <p className="text-sm text-muted mb-1 font-medium">
          DoClass Assistant
        </p>

        <p className="text-dark leading-relaxed">
          {message}
        </p>
      </motion.div>
    </div>
  )
}