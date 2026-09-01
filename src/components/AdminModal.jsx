// src/components/AdminModal.jsx
import { useState, useRef, useEffect } from "react";

export default function AdminModal({ isOpen, onClose, onProjectAdded }) {
  const [loading, setLoading] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [existingProjects, setExistingProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("new");

  // Project Fields State
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

  // Cards / Visual Assets
  const [cards, setCards] = useState([]);
  // Attached Documents / PDFs
  const [documents, setDocuments] = useState([]);

  const singleFileInputRefs = useRef({});

  // Fetch all existing projects to populate edit dropdown
  useEffect(() => {
    if (isOpen) {
      fetch("/api/projects")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setExistingProjects(data);
        })
        .catch(() => {});
    }
  }, [isOpen]);

  // When project is selected from dropdown, auto-fill the whole form
  const handleSelectProjectToEdit = (projectId) => {
    setSelectedProjectId(projectId);
    if (projectId === "new") {
      setFormData({
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
      setCards([]);
      setDocuments([]);
      return;
    }

    const proj = existingProjects.find((p) => (p._id || p.id) === projectId);
    if (proj) {
      setFormData({
        title: proj.title || "",
        tagline: proj.tagline || "",
        badge: proj.badge || "LIVE PRODUCTION",
        badgeColor: proj.badgeColor || "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
        glowColor: proj.glowColor || "rgba(16, 185, 129, 0.35)",
        description: proj.description || "",
        liveUrl: proj.liveUrl || "",
        githubUrl: proj.githubUrl || "",
        videoUrl: proj.videoUrl || "",
        metric1Label: proj.metrics?.[0]?.label || "Deployment",
        metric1Val: proj.metrics?.[0]?.value || "Vercel Live",
        metric2Label: proj.metrics?.[1]?.label || "Performance",
        metric2Val: proj.metrics?.[1]?.value || "98/100 Score",
        metric3Label: proj.metrics?.[2]?.label || "Compliance",
        metric3Val: proj.metrics?.[2]?.value || "Production Ready",
      });

      // Auto-load existing slides
      if (Array.isArray(proj.slides)) {
        setCards(
          proj.slides.map((s, idx) => ({
            id: "existing-" + idx,
            title: s.title || `Card #${idx + 1}`,
            file: null,
            preview: s.img,
            existingUrl: s.img,
          }))
        );
      }

      // Auto-load attached PDFs/Docs
      if (Array.isArray(proj.documents)) {
        setDocuments(proj.documents);
      }
    }
  };

  if (!isOpen) return null;

  const createFolderSlug = (text) =>
    "portfolio/" +
    (text || "untitled-project")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // Bulk add cards
  const handleAddFiles = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newItems = selectedFiles.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      title: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      file: file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : "/pdf-icon.png",
      existingUrl: null,
    }));
    setCards((prev) => [...prev, ...newItems]);
    e.target.value = "";
  };

  // Replace Single Card (e.g. Card 3 or Card 5)
  const handleReplaceSingleCard = (index, file) => {
    if (!file) return;
    setCards((prev) =>
      prev.map((card, idx) =>
        idx === index
          ? {
              ...card,
              file: file,
              preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : card.preview,
              existingUrl: null, // Marked for fresh upload
            }
          : card
      )
    );
  };

  // PDF / Document Upload Handler
  const handleAddDocuments = async (e) => {
    const files = Array.from(e.target.files);
    const newDocs = files.map((file) => ({
      name: file.name,
      file: file,
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      url: null,
    }));
    setDocuments((prev) => [...prev, ...newDocs]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cards.length === 0) return alert("Kam se kam 1 card screenshot add karo!");
    setLoading(true);

    try {
      const folderPath = createFolderSlug(formData.title);

      // 1. Upload or reuse slides
      const finalSlides = [];
      for (let i = 0; i < cards.length; i++) {
        const item = cards[i];
        let finalUrl = item.existingUrl;

        // Upload only if modified or newly selected
        if (item.file) {
          const base64 = await toBase64(item.file);
          const res = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ file: base64, folder: folderPath }),
          });
          const uploadData = await res.json();
          if (uploadData.url) finalUrl = uploadData.url;
        }

        if (finalUrl) {
          finalSlides.push({
            id: i + 1,
            title: item.title || `View ${i + 1}`,
            img: finalUrl,
          });
        }
      }

      // 2. Upload any attached PDFs / Documents
      const finalDocs = [];
      for (let i = 0; i < documents.length; i++) {
        const doc = documents[i];
        let docUrl = doc.url;

        if (doc.file) {
          const base64 = await toBase64(doc.file);
          const res = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ file: base64, folder: `${folderPath}/documents` }),
          });
          const uploadData = await res.json();
          if (uploadData.url) docUrl = uploadData.url;
        }

        if (docUrl) {
          finalDocs.push({
            name: doc.name,
            url: docUrl,
            size: doc.size,
          });
        }
      }

      // 3. Payload with Slides + Documents
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
        slides: finalSlides,
        documents: finalDocs,
      };

      const saveRes = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminKey, projectData: projectPayload }),
      });

      const saveResult = await saveRes.json();
      if (saveResult.success) {
        alert("Project, 3D cards aur documents sync ho gaye!");
        onProjectAdded();
        onClose();
      } else {
        alert("Error: " + saveResult.error);
      }
    } catch (err) {
      alert("Pipeline Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-white/20 p-6 rounded-2xl max-w-3xl w-full text-white my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-bold font-mono text-cyan-400">// CMS ASSET STUDIO</h3>
            <p className="text-[10px] text-slate-400 font-mono">Dynamic 3D Orbit, Single-Card Replacer & PDF Manager</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-mono">✕ Close</button>
        </div>

        {/* Project Selector Mode */}
        <div className="mb-4 p-3 rounded-xl bg-slate-950 border border-cyan-500/30">
          <label className="block text-[11px] font-mono text-cyan-400 font-bold mb-1">
            ⚡ Select Mode: Create New or Edit Existing Project
          </label>
          <select
            value={selectedProjectId}
            onChange={(e) => handleSelectProjectToEdit(e.target.value)}
            className="w-full bg-slate-900 border border-white/15 rounded-lg p-2 text-xs text-white outline-none font-mono"
          >
            <option value="new">+ CREATE NEW PROJECT</option>
            {existingProjects.map((p) => (
              <option key={p._id || p.id} value={p._id || p.id}>
                ✎ EDIT: {p.title} ({p.slides?.length || 0} Cards)
              </option>
            ))}
          </select>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Admin Passcode */}
          <div>
            <label className="block text-slate-400 mb-1 font-mono">Admin Passcode</label>
            <input
              type="password"
              required
              placeholder="Enter ADMIN_SECRET_KEY"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          {/* Title & Tagline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-mono">Project Title</label>
              <input
                required
                placeholder="e.g. Madhya Bharat Associates"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-cyan-400"
              />
              <p className="text-[10px] text-slate-500 mt-0.5 font-mono">
                Cloudinary: <span className="text-cyan-400">{createFolderSlug(formData.title)}</span>
              </p>
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-mono">Tagline</label>
              <input
                required
                placeholder="e.g. Legal Enforcement & Compliance Portal"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-slate-400 mb-1 font-mono">Description</label>
            <textarea
              required
              rows={2}
              placeholder="Enterprise portal architecture, database details..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-cyan-400"
            />
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-mono">Live Portal URL (Optional)</label>
              <input
                placeholder="https://..."
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-mono">GitHub Repo URL (Optional)</label>
              <input
                placeholder="https://github.com/..."
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Interactive Card Grid (Single Replace & Append) */}
          <div className="pt-3 border-t border-white/10">
            <div className="flex justify-between items-center mb-2">
              <label className="text-cyan-400 font-bold font-mono">
                3D Carousel Cards ({cards.length} Total)
              </label>
              <label className="cursor-pointer px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded-lg text-cyan-300 hover:bg-cyan-500/30 font-mono text-[11px] flex items-center gap-1">
                <span>+ Add Cards / Images</span>
                <input type="file" multiple accept="image/*" onChange={handleAddFiles} className="hidden" />
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {cards.map((item, idx) => (
                <div key={item.id} className="relative rounded-xl bg-slate-950 p-2 border border-white/10 flex flex-col gap-1.5 shadow-md">
                  <div className="flex justify-between items-center">
                    <span className="bg-cyan-500/20 text-cyan-300 font-mono px-1.5 py-0.5 rounded text-[9px] font-bold">
                      Card #{idx + 1} {idx === 0 && "(Front)"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setCards((prev) => prev.filter((_, i) => i !== idx))}
                      className="text-red-400 hover:text-red-300 text-[10px] font-mono"
                    >
                      ✕ Remove
                    </button>
                  </div>

                  <div className="relative w-full h-24 rounded-lg overflow-hidden bg-slate-900 border border-white/5">
                    <img src={item.preview} alt="card preview" className="w-full h-full object-cover object-top" />
                  </div>

                  <input
                    value={item.title}
                    onChange={(e) =>
                      setCards((prev) =>
                        prev.map((c, i) => (i === idx ? { ...c, title: e.target.value } : c))
                      )
                    }
                    placeholder="Card Label"
                    className="w-full bg-slate-900 text-[10px] p-1.5 rounded border border-white/10 text-slate-200 outline-none focus:border-cyan-400"
                  />

                  {/* Individual Replace Button */}
                  <input
                    type="file"
                    accept="image/*"
                    ref={(el) => (singleFileInputRefs.current[idx] = el)}
                    onChange={(e) => handleReplaceSingleCard(idx, e.target.files[0])}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => singleFileInputRefs.current[idx]?.click()}
                    className="w-full py-1 bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 rounded text-[9.5px] font-mono border border-white/10 transition-all cursor-pointer"
                  >
                    🔄 Replace Only This Image
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Attached Documents / PDFs */}
          <div className="pt-3 border-t border-white/10">
            <div className="flex justify-between items-center mb-2">
              <label className="text-purple-400 font-bold font-mono">
                Project Case Studies & PDFs ({documents.length})
              </label>
              <label className="cursor-pointer px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-lg text-purple-300 hover:bg-purple-500/30 font-mono text-[11px]">
                + Attach PDF / Doc
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.zip"
                  onChange={handleAddDocuments}
                  className="hidden"
                />
              </label>
            </div>

            {documents.length > 0 && (
              <div className="space-y-1.5">
                {documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-white/10 font-mono text-[10px]"
                  >
                    <span className="text-purple-300 truncate max-w-[70%]">📄 {doc.name} {doc.size && `(${doc.size})`}</span>
                    <button
                      type="button"
                      onClick={() => setDocuments((prev) => prev.filter((_, i) => i !== idx))}
                      className="text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-bold font-mono tracking-wider hover:opacity-90 disabled:opacity-50 mt-4 cursor-pointer"
          >
            {loading ? "PROCESSING ASSETS & SYNCING DATABASE..." : "🚀 SAVE & SYNC ALL ASSETS TO CLOUDINARY & MONGODB"}
          </button>
        </form>
      </div>
    </div>
  );
}