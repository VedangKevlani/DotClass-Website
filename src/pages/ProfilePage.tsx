import { useState } from "react";
import { User, Shield, MessageSquare, LogOut, CheckCircle2 } from "lucide-react";
import "./ProfilePage.css";

const MOCK_INQUIRIES = [
  { id: "DC-X9J2", subject: "Web Development Consultation", date: "Oct 12, 2026", status: "open" },
  { id: "DC-K3M8", subject: "Site Maintenance Query", date: "Sep 28, 2026", status: "resolved" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">VK</div>
        <div>
          <h1 className="profile-title">Vedang Kevlani</h1>
          <p className="profile-subtitle">vedang.kevlani@gmail.com • Joined Sept 2026</p>
        </div>
      </div>

      <div className="profile-grid">
        {/* Sidebar Navigation */}
        <div className="profile-sidebar">
          <button
            onClick={() => setActiveTab("general")}
            className={`profile-nav-btn ${activeTab === "general" ? "active" : ""}`}
          >
            <User size={18} />
            General Information
          </button>
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`profile-nav-btn ${activeTab === "inquiries" ? "active" : ""}`}
          >
            <MessageSquare size={18} />
            My Inquiries
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`profile-nav-btn ${activeTab === "security" ? "active" : ""}`}
          >
            <Shield size={18} />
            Security
          </button>

          <button className="profile-nav-btn text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-100 mt-6 pt-4 border-t border-gray-100/0">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>

        {/* Content Area */}
        <div className="profile-content">
          {activeTab === "general" && (
            <div className="profile-card">
              <div className="profile-card-header">
                <h2 className="profile-card-title">General Information</h2>
                <button className="btn btn-primary text-sm px-4 py-2">Save Changes</button>
              </div>

              <div className="profile-form-grid">
                <div className="profile-input-group">
                  <label className="profile-label">First Name</label>
                  <input type="text" className="profile-input" defaultValue="Vedang" />
                </div>
                <div className="profile-input-group">
                  <label className="profile-label">Last Name</label>
                  <input type="text" className="profile-input" defaultValue="Kevlani" />
                </div>
                <div className="profile-input-group">
                  <label className="profile-label">Email Address</label>
                  <input type="email" className="profile-input" defaultValue="vedang.kevlani@gmail.com" />
                </div>
                <div className="profile-input-group">
                  <label className="profile-label">Company Name</label>
                  <input type="text" className="profile-input" placeholder="Optional" />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Connected Accounts</h3>
                <div className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                  <div className="w-8 h-8 rounded bg-white shadow-sm flex items-center justify-center border border-gray-100 text-sm font-bold">G</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Google</p>
                    <p className="text-xs text-gray-500">Connected</p>
                  </div>
                  <CheckCircle2 size={18} className="text-[#47BA74]" />
                </div>
              </div>
            </div>
          )}

          {activeTab === "inquiries" && (
            <div className="profile-card">
              <div className="profile-card-header">
                <h2 className="profile-card-title">My Support & Inquiries</h2>
                <button className="btn btn-outline text-sm px-4 py-2 border-gray-200">New Ticket</button>
              </div>

              <div className="inquiry-list">
                {MOCK_INQUIRIES.map((inq) => (
                  <div key={inq.id} className="inquiry-item">
                    <div className="inquiry-info">
                      <h4>{inq.subject}</h4>
                      <p>Ticket ID: <span className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded ml-1">{inq.id}</span> • {inq.date}</p>
                    </div>
                    <div>
                      <span className={`inquiry-status status-${inq.status}`}>{inq.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="profile-card">
              <div className="profile-card-header">
                <h2 className="profile-card-title">Security Settings</h2>
              </div>
              <div className="py-12 flex flex-col items-center justify-center text-center text-gray-400">
                <Shield size={48} className="mb-4 opacity-20" />
                <p className="text-lg font-medium text-gray-600">Password management unavailable</p>
                <p className="text-sm max-w-sm mt-2">Because this is a simulated demo environment without a live auth database, security settings are hidden.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
