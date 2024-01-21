import { UserController } from "../controllers/userController";
import { UserRepository } from "../repositories/userRepository";
import express from "express";

const router = express.Router();

router.get("/users", async (req, res) => {
  const userRepository = new UserRepository();
  const userController = new UserController(userRepository);

  const { body, statusCode } = await userController.getAll();

  res.send(body).status(statusCode);
});

export default router;
