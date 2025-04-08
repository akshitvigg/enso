import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";
require("dotenv").config();
import { prismaClient } from "./prisma/src";
const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}

const users: User[] = [];

function checkUser(token: string): string | null {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
    if (typeof decodedToken === "string") {
      return null;
    }
    if (!decodedToken.userId) {
      return null;
    }
    return decodedToken.userId;
  } catch (e) {
    return null;
  }
}

wss.on("connection", (ws, request) => {
  const url = request.url;
  if (!url) {
    return;
  }
  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token");
  const userId = checkUser(token as string);
  if (userId === null) {
    ws.close();
    return;
  }
  users.push({
    userId,
    rooms: [],
    ws,
  });

  ws.on("message", async (data) => {
    let parsedData;
    if (typeof data !== "string") {
      parsedData = JSON.parse(data.toString());
    } else {
      parsedData = JSON.parse(data); // {type: "join-room", roomId: 1}
    }

    if (parsedData.type === "join_room") {
      const user = users.find((x) => x.ws === ws);
      user?.rooms.push(parsedData.roomId);
    }

    if (parsedData.type === "leave") {
      const user = users.find((x) => x.ws === ws);
      if (!user) {
        return;
      }
      user.rooms = user.rooms.filter((x) => x === parsedData.room);
    }

    if (parsedData.type === "chat") {
      const roomId = parsedData.roomId;
      const message = parsedData.message;
      await prismaClient.chat.create({
        data: {
          message,
          roomId: Number(roomId),
          userId,
        },
      });
      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message: message,
              roomId,
            })
          );
        }
      });
    }
    if (parsedData.type === "move") {
      const roomId = parsedData.roomId;
      const message = parsedData.message;

      try {
        const moveData = JSON.parse(message);

        await prismaClient.shapeMovement.create({
          data: {
            roomId: Number(roomId),
            userId,
            shapeIndex: moveData.index,
            shapeData: JSON.stringify(moveData.newShape),
          },
        });

        users.forEach((user) => {
          if (user.rooms.includes(roomId)) {
            user.ws.send(
              JSON.stringify({
                type: "move",
                message: message,
                roomId,
              })
            );
          }
        });
      } catch (error) {
        console.error("Error processing move:", error);
      }
    }
  });

  ws.on("close", () => {
    const index = users.findIndex((user) => user.ws === ws);
    if (index !== -1) {
      users.splice(index, 1);
    }
  });
});
