import { MongoDBClient } from "./database/mongodb";
import userRoute from "./routes/users";
import { config } from "dotenv";
import express from "express";

const app = express();

config();
const port = process.env.PORT || 8000;

const client = async () => {
  await MongoDBClient.connect();
};

app.use(express.json());
app.use(express.static("build/public"));

app.use(userRoute);

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./build/public" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});

client();

export default app;
