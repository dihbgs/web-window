import { UserController } from "../controllers/userController";
import { UserRepository } from "../repositories/userRepository";
import express from "express";

const router = express.Router();
const userRepository = new UserRepository();
const userController = new UserController(userRepository);

router.get("/users", async (req, res) => {
  const { body, statusCode } = await userController.getAll();

  res.status(statusCode).send(body);
});

router.post("/users", async (req, res) => {
  const { body, statusCode } = await userController.create({ body: req.body });

  res.status(statusCode).send(body);
});

export default router;
