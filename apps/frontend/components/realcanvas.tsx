"use client";

import { Draw } from "@/canvasLogic/draw";
import { Game } from "@/canvasLogic/games";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type ToolsType = "rect" | "circle" | "pencil";

export function Canvas({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game>();
  const [selectedTool, setselectedTool] = useState<ToolsType>("rect");

  useEffect(() => {
    game?.setTool(selectedTool);
  }, [selectedTool, game]);

  useEffect(() => {
    if (canvasRef.current) {
      const g = new Game(canvasRef.current, roomId, socket);
      setGame(g);

      return () => {
        g.destroy();
      };
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
            onClick={() => setselectedTool("rect")}
            className={` p-2 hover:bg-gray-600`}
          >
            <RectangleHorizontalIcon
              color={`${selectedTool === "rect" ? "red" : "white"}`}
            />
          </div>
          <div
            onClick={() => setselectedTool("circle")}
            className={`p-2 hover:bg-gray-600`}
          >
            <Circle color={`${selectedTool === "circle" ? "red" : "white"}`} />
          </div>
          <div
            className={`p-2 hover:bg-gray-600`}
            color={`${selectedTool === "pencil" ? "red" : "white"}`}
            onClick={() => setselectedTool("pencil")}
          >
            <Pencil color={`${selectedTool === "pencil" ? "red" : "white"}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
