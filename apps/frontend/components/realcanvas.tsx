"use client";

import { Draw } from "@/canvasLogic/draw";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type shapeType = "r" | "c" | "l";

export function Canvas({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currBtn, setcurrBtn] = useState<shapeType>("r");

  useEffect(() => {
    if (canvasRef.current) {
      Draw(canvasRef.current, roomId, socket);
    }
  }, [canvasRef]);

  const width = window.innerWidth;
  const height = window.innerHeight;

  return (
    <div className=" ">
      <ToolBar setcurrBtn={setcurrBtn} currBtn={currBtn} />
      <canvas ref={canvasRef} width={width} height={height}></canvas>
    </div>
  );
}

function ToolBar({
  setcurrBtn,
  currBtn,
}: {
  currBtn: shapeType;
  setcurrBtn: (s: shapeType) => void;
}) {
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
    </div>
  );
}
