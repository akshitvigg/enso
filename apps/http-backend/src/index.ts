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
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

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

app.post("/signin", async (req, res) => {
  const parsedData = CreateSignInSchema.safeParse(req.body);
  if (!parsedData.success) {
    return;
  }

  try {
    const user = await prismaClient.user.findFirst({
      where: {
        email: parsedData.data.email,
        password: parsedData.data.password,
      },
    });

    if (!user) {
      res.status(411).json({
        warning: "not authorized",
      });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({
      token: token,
    });
  } catch (e) {
    res.status(400).json({
      warning: "error while signing in",
    });
  }
});

app.post("/createroom", auth, async (req, res) => {
  const Parseddata = CreateRoomSchema.safeParse(req.body);
  if (!Parseddata.success) {
    res.json({
      warning: "parse cancelled",
      err: Parseddata.error,
    });
    return;
  }

  const userId = req.userId;
  try {
    const room = await prismaClient.room.create({
      data: {
        slug: Parseddata.data.slug,
        adminId: userId || "",
      },
    });

    res.json({
      roomid: room.id,
    });
  } catch (e) {
    res.json({
      warning: "error while creating room",
    });
  }
});

app.get("/chats/:roomId", async (req, res) => {
  const roomId = Number(req.params.roomId);
  const messages = await prismaClient.chat.findMany({
    where: {
      roomId: roomId,
    },
    orderBy: {
      id: "desc",
    },
    take: 50,
  });
  res.json({
    messages,
  });
});
app.listen(3002);
