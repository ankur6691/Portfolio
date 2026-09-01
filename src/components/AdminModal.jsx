// src/components/AdminModal.jsx
import { useState } from "react";

export default function AdminModal({ isOpen, onClose, onProjectAdded }) {
  const [loading, setLoading] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    tagline: "",
    badge: "LIVE PRODUCTION",
    badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    glowColor: "rgba(16, 185, 129, 0.35)",
    description: "",
    liveUrl: "",
    githubUrl: "",
    videoUrl: "",
    metric1Label: "Deployment",
    metric1Val: "Vercel Live",
    metric2Label: "Performance",
    metric2Val: "98/100 Score",
    metric3Label: "Compliance",
    metric3Val: "SARFAESI 2002",
  });

  const [files, setFiles] = useState([]);
  const [slideTitles, setSlideTitles] = useState(["Hero View", "Features", "Dashboard", "Directory", "Contact Hub"]);

  if (!isOpen) return null;

  // File to Base64 converter
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) return alert("Select at least 1 image");
    setLoading(true);

    try {
      // 1. Upload all selected images to Cloudinary via /api/upload
      const uploadedSlides = [];
      for (let i = 0; i < files.length; i++) {
        const base64 = await toBase64(files[i]);
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64, folder: "portfolio/projects" }),
        });
        const uploadData = await res.json();
        if (uploadData.url) {
          uploadedSlides.push({
            title: slideTitles[i] || `View ${i + 1}`,
            img: uploadData.url,
          });
        }
      }

      // 2. Format Project Document
      const projectPayload = {
        title: formData.title,
        tagline: formData.tagline,
        badge: formData.badge,
        badgeColor: formData.badgeColor,
        glowColor: formData.glowColor,
        description: formData.description,
        liveUrl: formData.liveUrl || null,
        githubUrl: formData.githubUrl || null,
        videoUrl: formData.videoUrl || null,
        metrics: [
          { label: formData.metric1Label, value: formData.metric1Val },
          { label: formData.metric2Label, value: formData.metric2Val },
          { label: formData.metric3Label, value: formData.metric3Val },
        ],
        slides: uploadedSlides,
      };

      // 3. Save Project Document in MongoDB
      const saveRes = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminKey, projectData: projectPayload }),
      });

      const saveResult = await saveRes.json();
      if (saveResult.success) {
        alert("Project successfully published to Database & Cloudinary!");
        onProjectAdded();
        onClose();
      } else {
        alert("Error: " + saveResult.error);
      }
    } catch (err) {
      alert("Pipeline failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-white/20 p-6 rounded-2xl max-w-2xl w-full text-white my-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold font-mono text-cyan-400">// CMS PROJECT UPLOADER</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-mono">✕ Close</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Admin Secret Passcode</label>
            <input
              type="password"
              required
              placeholder="Enter ADMIN_SECRET_KEY from .env"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Project Title</label>
              <input
                required
                placeholder="e.g. Madhya Bharat Associates"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Tagline</label>
              <input
                required
                placeholder="e.g. Legal Enforcement Portal"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Description</label>
            <textarea
              required
              rows={3}
              placeholder="Enterprise legal portal details..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Live Portal URL</label>
              <input
                placeholder="https://..."
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Github URL</label>
              <input
                placeholder="https://github.com/..."
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-cyan-400 font-bold mb-1">Select 5 Project Screenshots</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setFiles(Array.from(e.target.files))}
              className="w-full bg-slate-950 border border-dashed border-cyan-500/40 rounded-lg p-3 text-slate-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold font-mono tracking-wider hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "UPLOADING TO CLOUDINARY & SAVING TO MONGODB..." : "🚀 PUBLISH PROJECT DYNAMICALLY"}
          </button>
        </form>
      </div>
    </div>
  );
}