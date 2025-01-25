"use client";

import { Draw } from "@/canvas/draw";
import { useEffect, useRef } from "react";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      Draw(canvasRef.current);
    }
  });

  return (
    <div className=" min-h-screen">
      <canvas ref={canvasRef} width="2000" height={"2000"}></canvas>
    </div>
  );
}
