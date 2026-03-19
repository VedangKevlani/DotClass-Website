import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, MessageSquare, AlertCircle, Clock } from "lucide-react";
import { useState } from "react";

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: "Support Ticket Updated",
    message: "Admin Sarah replied to your inquiry regarding 'Web Development'.",
    time: "2 mins ago",
    icon: <MessageSquare size={18} className="text-[#47BA74]" />,
    bg: "bg-[#47BA74]/10",
    unread: true,
  },
  {
    id: 2,
    title: "Meeting Scheduled",
    message: "Your consultation with the tech team is set for Friday at 2PM.",
    time: "3 hours ago",
    icon: <Clock size={18} className="text-[#F2813C]" />,
    bg: "bg-[#F2813C]/10",
    unread: true,
  },
  {
    id: 3,
    title: "Account Verified",
    message: "Your email address has been successfully verified.",
    time: "1 day ago",
    icon: <CheckCircle2 size={18} className="text-blue-500" />,
    bg: "bg-blue-500/10",
    unread: false,
  },
];

export default function AlertsDropdown({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[90]" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 right-0 w-80 md:w-96 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-[100]"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50 bg-gray-50/50">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                Notifications
                {unreadCount > 0 && (
                  <span className="bg-[#47BA74] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </h3>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-xs text-[#47BA74] hover:underline font-medium">
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length > 0 ? (
                <div className="flex flex-col">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 border-b border-gray-50 transition hover:bg-gray-50 cursor-pointer flex gap-4 ${
                        notif.unread ? "bg-[#47BA74]/[0.02]" : "opacity-75"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${notif.bg}`}>
                        {notif.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className={`text-sm ${notif.unread ? "font-semibold text-gray-900" : "font-medium text-gray-700"}`}>
                            {notif.title}
                          </h4>
                          <span className="text-[10px] text-gray-400 whitespace-nowrap">{notif.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{notif.message}</p>
                      </div>
                      {notif.unread && (
                        <div className="w-2 h-2 rounded-full bg-[#47BA74] flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400">
                  <AlertCircle size={32} className="mx-auto mb-2 opacity-20" />
                  <p className="text-sm">You have no new notifications.</p>
                </div>
              )}
            </div>

            <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
              <button className="text-xs font-medium text-gray-500 hover:text-gray-800 transition">
                View All Notifications
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
