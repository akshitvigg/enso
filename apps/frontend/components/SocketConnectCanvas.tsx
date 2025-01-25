"use client";

import { useState } from "react";
import { Canvas } from "./realcanvas";
import { WS_URL } from "@/config";

export function SocketCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const ws = new WebSocket(`${WS_URL}?token=`);

  return <Canvas roomId={roomId} />;
}
