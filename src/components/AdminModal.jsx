// src/components/AdminModal.jsx
import { useState } from "react";

export default function AdminModal({ isOpen, onClose, onProjectAdded }) {
  const [loading, setLoading] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [filesData, setFilesData] = useState([]); // [{ file, preview, title }]

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
    metric3Val: "Production Ready",
  });

  if (!isOpen) return null;

  // Title to Cloudinary Folder Slug
  const createFolderSlug = (text) => {
    return (
      "portfolio/" +
      (text || "untitled-project")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    );
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // Multiple File Selection & Previews
  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newItems = selectedFiles.map((file, i) => ({
      file,
      preview: URL.createObjectURL(file),
      title: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
    }));
    setFilesData((prev) => [...prev, ...newItems]);
  };

  const handleRemovePhoto = (index) => {
    setFilesData((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleTitleChange = (index, newTitle) => {
    setFilesData((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, title: newTitle } : item))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (filesData.length === 0) return alert("Kam se kam 1 photo select karo!");
    setLoading(true);

    try {
      const folderPath = createFolderSlug(formData.title);
      const uploadedSlides = [];

      // Loop over any number of selected photos
      for (let i = 0; i < filesData.length; i++) {
        const base64 = await toBase64(filesData[i].file);
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image: base64,
            folder: folderPath, // e.g. portfolio/akmenu-dining
          }),
        });
        const uploadData = await res.json();
        if (uploadData.url) {
          uploadedSlides.push({
            id: i + 1,
            title: filesData[i].title || `Screen ${i + 1}`,
            img: uploadData.url,
          });
        }
      }

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

      const saveRes = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminKey, projectData: projectPayload }),
      });

      const saveResult = await saveRes.json();
      if (saveResult.success) {
        alert("Project & images uploaded successfully!");
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
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-white/20 p-6 rounded-2xl max-w-2xl w-full text-white my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold font-mono text-cyan-400">// DYNAMIC CMS UPLOADER</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-mono">✕ Close</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Admin Passcode</label>
            <input
              type="password"
              required
              placeholder="Enter ADMIN_SECRET_KEY"
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
                placeholder="e.g. AKMenu Dining POS"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-white"
              />
              <p className="text-[10px] text-slate-500 mt-0.5">
                Cloudinary Folder: <span className="text-cyan-400 font-mono">{createFolderSlug(formData.title)}</span>
              </p>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Tagline</label>
              <input
                required
                placeholder="e.g. Real-Time Restaurant Billing OS"
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
              rows={2}
              placeholder="High-speed POS billing engine..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-white"
            />
          </div>

          {/* Dynamic Images Selector */}
          <div>
            <label className="block text-cyan-400 font-bold mb-1">
              Select Screenshots (Any quantity: 3, 5, 8+)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="w-full bg-slate-950 border border-dashed border-cyan-500/40 rounded-lg p-3 text-slate-300 cursor-pointer"
            />
          </div>

          {/* Image Order Preview List */}
          {filesData.length > 0 && (
            <div className="space-y-2 pt-2">
              <label className="block text-slate-400 font-mono text-[11px]">
                Card Sequence Preview ({filesData.length} Selected):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {filesData.map((item, idx) => (
                  <div key={idx} className="relative rounded-lg bg-slate-950 p-1.5 border border-white/10 flex flex-col gap-1">
                    <span className="absolute top-2 left-2 bg-black/80 px-1.5 py-0.5 rounded text-[9px] font-mono text-cyan-400 z-10">
                      Card #{idx + 1} {idx === 0 && "(Front)"}
                    </span>
                    <img src={item.preview} alt="preview" className="w-full h-20 object-cover rounded" />
                    <input
                      value={item.title}
                      onChange={(e) => handleTitleChange(idx, e.target.value)}
                      placeholder="Card Title"
                      className="w-full bg-slate-900 text-[10px] p-1 rounded border border-white/10 text-slate-300"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      className="text-red-400 text-[10px] hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold font-mono tracking-wider hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "UPLOADING TO DYNAMIC FOLDER & DATABASE..." : `🚀 PUBLISH ${filesData.length} CARDS TO 3D ORBIT`}
          </button>
        </form>
      </div>
    </div>
  );
}