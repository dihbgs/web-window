import { MongoDBClient } from "./database/mongodb";
import { UserDB } from "./interfaces/user/repository";
import userRoute from "./routes/users";
import { config } from "dotenv";
import express from "express";
import cors from "cors";

async function startServer() {
  const app = express();

  config();
  const port = process.env.PORT || 8000;

  await MongoDBClient.connect();

  app.use(cors());
  app.use(express.json());
  app.use(express.static("build/public"));
  app.use(express.urlencoded({ extended: true }));

  app.use(userRoute);

  app.get("/", (req, res) => {
    res.sendFile("index.html", { root: "./build/public" });
  });

  app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
  });
}

startServer();

export const usersCollection = MongoDBClient.db.collection<UserDB>("users");
