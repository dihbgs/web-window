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
  const { body, statusCode } = await userController.createOne({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

router.delete("/users/:id", async (req, res) => {
  const { body, statusCode } = await userController.deleteOne(req.params.id);

  res.status(statusCode).send(body);
});

router.delete("/users", async (req, res) => {
  const { body, statusCode } = await userController.deleteAll();

  res.status(statusCode).send(body);
});

router.put("/users/:id", async (req, res) => {
  const { body, statusCode } = await userController.updateOne(
    req.params.id,
    req.body
  );

  res.status(statusCode).send(body);
});

export default router;
