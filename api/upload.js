// api/upload.js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const { file, folder = "portfolio/general" } = req.body || {};

    if (!file) {
      return res.status(400).json({ success: false, error: "No file provided" });
    }

    // Check Cloudinary Env
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return res.status(500).json({
        success: false,
        error: "Cloudinary Environment variables missing on server",
      });
    }

    const uploadResponse = await cloudinary.uploader.upload(file, {
      folder: folder,
      resource_type: "auto",
    });

    return res.status(200).json({
      success: true,
      url: uploadResponse.secure_url,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Cloudinary upload failed",
    });
  }
}