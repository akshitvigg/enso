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

      let startX = 0;
      let startY = 0;

      let clicked = false;
      canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
      });

      canvas.addEventListener("mouseup", (e) => {
        clicked = false;
        console.log(e.clientX);
        console.log(e.clientY);
      });

      canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
          const width = e.clientX - startX;
          const height = e.clientY - startY;
          console.log(e.clientX);
          console.log(e.clientY);

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.strokeStyle = "rgba(255,255,255)";
          ctx.strokeRect(startX, startY, width, height);
        }
      });
    }
  });

  return (
    <div className=" min-h-screen">
      <canvas ref={canvasRef} width="2000" height={"2000"}></canvas>
    </div>
  );
}
