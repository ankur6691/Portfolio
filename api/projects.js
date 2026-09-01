// api/projects.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
};

let client;
let clientPromise;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");
    const collection = db.collection("projects");

    // 1. GET: Fetch all projects
    if (req.method === "GET") {
      const projects = await collection
        .find({})
        .sort({ updatedAt: -1, createdAt: -1 })
        .toArray();
      return res.status(200).json(projects);
    }

    // 2. POST: Save or Update Project (Upsert)
    if (req.method === "POST") {
      const { adminKey, projectData } = req.body;

      // Admin verification
      if (adminKey !== process.env.ADMIN_SECRET_KEY) {
        return res.status(401).json({ success: false, error: "Unauthorized: Invalid Admin Passcode" });
      }

      if (!projectData || !projectData.title) {
        return res.status(400).json({ success: false, error: "Project title is required" });
      }

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
    }

    return res.status(405).json({ success: false, error: "Method not allowed" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Database connection failed",
    });
  }
}