"use client";

import { useEffect, useRef } from "react";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }

      ctx.strokeRect(50, 50, 300, 300);
    }
  });

  return (
    <div className=" h-screen bg-fuchsia-300">
      <canvas ref={canvasRef} width={500} height={500}></canvas>
    </div>
  );
}
