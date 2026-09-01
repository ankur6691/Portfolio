// api/projects.js
import clientPromise from "../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("portfolio");
  const collection = db.collection("projects");

  // 1. GET: Saare live projects frontend ko bhejo
  if (req.method === "GET") {
    try {
      const projects = await collection.find({}).sort({ createdAt: -1 }).toArray();
      return res.status(200).json(projects);
    } catch (error) {
      return res.status(500).json({ error: "Database fetch failed" });
    }
  }

  // 2. POST: Admin Panel se naya project save karo
  if (req.method === "POST") {
    try {
      const { adminKey, projectData } = req.body;

      // Simple Security Guard
      if (adminKey !== process.env.ADMIN_SECRET_KEY) {
        return res.status(401).json({ error: "Unauthorized: Invalid Admin Secret" });
      }

      const result = await collection.insertOne({
        ...projectData,
        createdAt: new Date(),
      });

      return res.status(201).json({ success: true, id: result.insertedId });
    } catch (error) {
      return res.status(500).json({ error: "Failed to save project in database" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}