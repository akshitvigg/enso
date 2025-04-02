"use client";
import { Game } from "@/canvasLogic/games";
import {
  Circle,
  Pencil,
  RectangleHorizontalIcon,
  Triangle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type ToolsType = "rect" | "circle" | "pencil" | "triangle";
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

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          const savedData = ctx.getImageData(0, 0, canvas.width, canvas.height);

          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;

          ctx.putImageData(savedData, 0, 0);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <ToolBar
        roomId={roomId}
        setselectedTool={setselectedTool}
        selectedTool={selectedTool}
      />
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-screen h-screen"
      ></canvas>
    </div>
  );
}

function ToolBar({
  setselectedTool,
  selectedTool,
  roomId,
}: {
  selectedTool: ToolsType;
  setselectedTool: (s: ToolsType) => void;
  roomId: any;
}) {
  return (
    <div className="flex justify-center">
      <div className="p-3 bg-[#27272a] rounded-lg top-6 left-3 fixed z-50">
        Room ID : {roomId}
      </div>
      <div className="bg-[#27272a] p-1 rounded-lg fixed w-72 top-6 z-50">
        <div className="gap-8 flex justify-center">
          <div
            onClick={() => setselectedTool("rect")}
            className={`p-2 hover:bg-gray-600`}
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
            onClick={() => setselectedTool("pencil")}
          >
            <Pencil color={`${selectedTool === "pencil" ? "red" : "white"}`} />
          </div>
          <div
            className={`p-2 hover:bg-gray-600`}
            onClick={() => setselectedTool("triangle")}
          >
            <Triangle
              color={`${selectedTool === "triangle" ? "red" : "white"}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
