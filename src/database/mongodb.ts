import { MongoClient, Db } from "mongodb";

export const MongoDBClient = {
  client: undefined as MongoClient | undefined,
  db: undefined as Db | undefined,

  async connect(): Promise<void> {
    const url = process.env.MONGO_HOST || "mongodb://localhost:27017";
    const username = process.env.MONGO_USERNAME;
    const password = process.env.MONGO_PASSWORD;

    const client = new MongoClient(url, { auth: { username, password } });
    const db = client.db("users-db");

    this.client = client;
    this.db = db;

    console.log("Connected to MongoDB!");
  },
};
