"use client";

import { useEffect, useState } from "react";
import { Canvas } from "./realcanvas";
import { WS_URL } from "@/config";

export function SocketCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(
      `${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjNGNjYjVjZC1jNjIwLTRkNjQtODBiNy05OTI3NmNkNmZhMGQiLCJpYXQiOjE3MzgxNjgyMTd9.w5uAuMYY1R709Lut6vLHp1PDQRnhlFqQLVOZ2BT4GBU`
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
