import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws, request) {
  const url = request.url;

  if (!url) {
    return;
  }

  const queryParam = new URLSearchParams(url.split("?")[1]);
  const token = queryParam.get("token") || "";
  const decodedToken = jwt.verify(token, JWT_SECRET);

  if (typeof decodedToken === "string") {
    ws.close();
    return;
  }
  if (!decodedToken.userId) {
    ws.close();
    return;
  }

  wss.on("message", function message(data) {
    ws.send("pong");
  });
});
