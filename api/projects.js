// api/projects.js
import clientPromise from "../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("portfolio");
  const collection = db.collection("projects");

  // 1. GET: Saare live projects frontend ko bhejo (Newest updated first)
  if (req.method === "GET") {
    try {
      const projects = await collection
        .find({})
        .sort({ updatedAt: -1, createdAt: -1 })
        .toArray();
      return res.status(200).json(projects);
    } catch (error) {
      return res.status(500).json({ error: "Database fetch failed" });
    }
  }

  // 2. POST: Naya project add karo YA existing project ko update/replace karo
  if (req.method === "POST") {
    try {
      const { adminKey, projectData } = req.body;

      // Security Passcode Check
      if (adminKey !== process.env.ADMIN_SECRET_KEY) {
        return res.status(401).json({ error: "Unauthorized: Invalid Admin Secret" });
      }

      if (!projectData || !projectData.title) {
        return res.status(400).json({ error: "Project title is required" });
      }

      // Upsert: Title match hua toh update hoga, naya hua toh insert hoga
      const result = await collection.updateOne(
        { title: projectData.title },
        {
          $set: {
            ...projectData,
            updatedAt: new Date(),
          },
          $setOnInsert: {
            createdAt: new Date(),
          },
        },
        { upsert: true }
      );

      return res.status(200).json({
        success: true,
        message: result.upsertedCount > 0 ? "Project created" : "Project updated",
        result,
      });
    } catch (error) {
      return res.status(500).json({ error: "Failed to save/update project in database" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}