"use client";

import { useEffect, useState } from "react";
import { Canvas } from "./realcanvas";
import { WS_URL } from "@/config";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";

type shapeType = "r" | "c" | "l";

export function SocketCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [currBtn, setcurrBtn] = useState<shapeType>();

  useEffect(() => {
    const ws = new WebSocket(
      `${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiYTRiNmFmZi1hN2Y0LTRjYzEtYmM3OC00ZGY3NTQzZTcyZTciLCJpYXQiOjE3Mzc4MzgzNTF9.I9FVKzwILbaWM5LSRjZbH4QxgE-UvGAMn79r1JwK-UM`
    );

    ws.onopen = () => {
      setSocket(ws);
      const data = JSON.stringify({
        type: "join_room",
        roomId,
      });
      ws.send(data);
    };
  }, []);

  if (!socket) {
    return <div> connecting to server....</div>;
  }

  return (
    <div className=" flex justify-center">
      <div className=" bg-gray-900 p-1 rounded-lg fixed w-72  top-6">
        <div className="gap-8  flex justify-center">
          <div
            onClick={() => setcurrBtn("r")}
            className={` p-2 hover:bg-gray-600`}
          >
            <RectangleHorizontalIcon
              color={`${currBtn === "r" ? "red" : "white"}`}
            />
          </div>
          <div
            onClick={() => setcurrBtn("c")}
            className={`p-2 hover:bg-gray-600`}
          >
            <Circle color={`${currBtn === "c" ? "red" : "white"}`} />
          </div>
          <div
            className={`p-2 hover:bg-gray-600`}
            color={`${currBtn === "l" ? "red" : "white"}`}
            onClick={() => setcurrBtn("l")}
          >
            <Pencil color={`${currBtn === "l" ? "red" : "white"}`} />
          </div>
        </div>
      </div>
      <Canvas roomId={roomId} socket={socket} />
    </div>
  );
}
