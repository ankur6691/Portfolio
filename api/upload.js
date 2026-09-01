// api/upload.js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "30mb", // PDF aur HD images ke liye safe limit
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { file, folder = "portfolio/general" } = req.body;

    if (!file) {
      return res.status(400).json({ error: "No file provided" });
    }

    // resource_type "auto" se Images, PDF, SVG, ZIP sab Cloudinary support karega
    const uploadResponse = await cloudinary.uploader.upload(file, {
      folder: folder,
      resource_type: "auto",
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    });

    return res.status(200).json({
      success: true,
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
      format: uploadResponse.format || "file",
      resource_type: uploadResponse.resource_type,
    });
  } catch (error) {
    return res.status(500).json({ error: "Upload failed", details: error.message });
  }
}