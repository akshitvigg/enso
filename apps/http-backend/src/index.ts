import express from "express";
import jwt from "jsonwebtoken";
import { auth } from "./auth";
require("dotenv").config();

import {
  CreateSignupSchema,
  CreateSignInSchema,
  CreateRoomSchema,
} from "./types";
import { prismaClient } from "./prisma/src/prism";
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

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string
    );
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

app.get("/rooms", auth, async (req, res) => {
  try {
    const rooms = await prismaClient.room.findMany({
      where: {
        adminId: req.userId,
      },
    });

    res.status(200).json({
      rooms,
    });
  } catch (e) {
    console.log("error while fetching rooms" + e);
  }
});

app.get("/username", auth, async (req, res) => {
  try {
    const username = await prismaClient.user.findMany({
      where: {
        id: req.userId,
      },
    });

    res.json({
      username,
    });
  } catch (e) {
    console.log("error while fetching users" + e);
  }
});

app.get("/chats/:roomId", auth, async (req, res) => {
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

app.get("/shapeMovements/:roomId", auth, async (req, res) => {
  const roomId = Number(req.params.roomId);

  try {
    const movements = await prismaClient.shapeMovement.findMany({
      where: {
        roomId: roomId,
      },
      orderBy: {
        createdAt: "desc",
      },
      distinct: ["shapeIndex"],
    });

    res.json({
      movements,
    });
  } catch (error) {
    console.error("Error fetching shape movements:", error);
    res.status(500).json({
      warning: "Error fetching shape movements",
    });
  }
});
app.listen(3002);
