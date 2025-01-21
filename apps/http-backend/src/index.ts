import express from "express";
import jwt from "jsonwebtoken";
import { auth } from "./auth";
import { JWT_SECRET } from "@repo/backend-common/config";
import {
  CreateSignupSchema,
  CreateSignInSchema,
  CreateRoomSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const ParsedData = CreateSignupSchema.safeParse(req.body);

  if (!ParsedData.success) {
    res.json({
      warning: "failed ",
    });
    return;
  }

  try {
    const user = await prismaClient.user.create({
      data: {
        email: ParsedData.data?.email,
        password: ParsedData.data?.password,
        name: ParsedData.data?.name,
      },
    });

    res.json({
      message: "user created successfully",
      userId: user.id,
    });
  } catch (e) {
    res.status(411).json({
      message: "error while creating user or email already exists",
    });
  }
});

app.post("/signin", (req, res) => {
  const parsedData = CreateSignInSchema.safeParse(req.body());
  if (!parsedData.success) {
    return;
  }

  con;
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
