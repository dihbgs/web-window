import { UserRepository } from "../repositories/userRepository";
import { UserController } from "../controllers/userController";
import express from "express";

const router = express.Router();
const userRepository = new UserRepository();
const userController = new UserController(userRepository);

router.get("/users", async (req, res) => {
  const { body, statusCode } = await userController.getAll();

  res.status(statusCode).send(body);
});

router.post("/users", async (req, res) => {
  console.log(req.body);
  const { body, statusCode } = await userController.createOne({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

router.delete("/users/id/:id", async (req, res) => {
  const { body, statusCode } = await userController.deleteOne({
    body: { id: req.params.id },
  });

  res.status(statusCode).send(body);
});

router.delete("/users/username/:username", async (req, res) => {
  const { body, statusCode } = await userController.deleteOne({
    body: { username: req.params.username },
  });

  res.status(statusCode).send(body);
});

router.delete("/users", async (req, res) => {
  const { body, statusCode } = await userController.deleteAll();

  res.status(statusCode).send(body);
});

router.put("/users/username/:username", async (req, res) => {
  const { body, statusCode } = await userController.updateOne({
    body: { oldUsername: req.params.username, ...req.body },
  });

  res.status(statusCode).send(body);
});

router.get("/users", async (req, res) => {
  const { body, statusCode } = await userController.getOne({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

router.get("/users/username/:username", async (req, res) => {
  const { body, statusCode } = await userController.getOne({
    body: { username: req.params.username },
  });

  res.status(statusCode).send(body);
});

router.get("/users/id/:id", async (req, res) => {
  const { body, statusCode } = await userController.getOne({
    body: { id: req.params.id },
  });

  res.status(statusCode).send(body);
});

router.get("/users", async (req, res) => {
  const { body, statusCode } = await userController.getOne({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

export default router;
