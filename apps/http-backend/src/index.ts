import express from "express";
import jwt from "jsonwebtoken";
import { auth } from "./auth";
import { JWT_SECRET } from "@repo/backend-common/config";
import {
  CreateSignupSchema,
  CreateSignInSchema,
  CreateRoomSchema,
} from "@repo/common/types";

const app = express();

app.use(express.json());

app.post("/signup", (req, res) => {
  const data = CreateSignupSchema.safeParse(req.body);
  if (!data.success) {
    return;
  }
  res.json({
    message: "fine",
  });
});

app.post("/signin", (req, res) => {
  const signinData = CreateSignInSchema.safeParse(req.body());
  if (!signinData) {
    return;
  }
  const userId = 2;
  const token = jwt.sign({ userId }, JWT_SECRET);

  res.json({
    token,
  });
});

app.post("/createroom", auth, (req, res) => {
  const data = CreateRoomSchema.safeParse(req.body);
  if (!data.success) {
    return;
  }
  res.json({
    message: "fine",
  });
});

app.listen(3002);
