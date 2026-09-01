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
      sizeLimit: "25mb",
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { image, folder = "portfolio/general" } = req.body;

    if (!image) {
      return res.status(400).json({ error: "No image provided" });
    }

    // Cloudinary automatically creates folder if it doesn't exist
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: folder,
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    });

    return res.status(200).json({
      success: true,
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
    });
  } catch (error) {
    return res.status(500).json({ error: "Upload failed", details: error.message });
  }
}