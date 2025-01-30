"use client";

import { Draw } from "@/canvasLogic/draw";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ToolsType = "r" | "c" | "l";

export function Canvas({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool, setselectedTool] = useState<ToolsType>("r");

  useEffect(() => {
    if (canvasRef.current) {
      Draw(canvasRef.current, roomId, socket);
    }
  }, [canvasRef]);

  const width = window.innerWidth;
  const height = window.innerHeight;

  return (
    <div className=" ">
      <ToolBar setselectedTool={setselectedTool} selectedTool={selectedTool} />
      <canvas ref={canvasRef} width={width} height={height}></canvas>
    </div>
  );
}

function ToolBar({
  setselectedTool,
  selectedTool,
}: {
  selectedTool: ToolsType;
  setselectedTool: (s: ToolsType) => void;
}) {
  return (
    <div className=" flex justify-center">
      <div className=" bg-gray-900 p-1 rounded-lg fixed w-72  top-6">
        <div className="gap-8  flex justify-center">
          <div
            onClick={() => setselectedTool("r")}
            className={` p-2 hover:bg-gray-600`}
          >
            <RectangleHorizontalIcon
              color={`${selectedTool === "r" ? "red" : "white"}`}
            />
          </div>
          <div
            onClick={() => setselectedTool("c")}
            className={`p-2 hover:bg-gray-600`}
          >
            <Circle color={`${selectedTool === "c" ? "red" : "white"}`} />
          </div>
          <div
            className={`p-2 hover:bg-gray-600`}
            color={`${selectedTool === "l" ? "red" : "white"}`}
            onClick={() => setselectedTool("l")}
          >
            <Pencil color={`${selectedTool === "l" ? "red" : "white"}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
