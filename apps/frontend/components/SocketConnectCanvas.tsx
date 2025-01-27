"use client";

import { useEffect, useState } from "react";
import { Canvas } from "./realcanvas";
import { WS_URL } from "@/config";

export function SocketCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

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
      <Canvas roomId={roomId} socket={socket} />
    </div>
  );
}
