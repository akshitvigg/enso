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
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    game?.setTool(selectedTool);
  }, [selectedTool, game]);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        game?.clearCanvas(); // Redraw everything when resizing
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [game]);

  useEffect(() => {
    if (canvasRef.current) {
      const g = new Game(canvasRef.current, roomId, socket);
      setGame(g);

      return () => {
        g.destroy();
      };
    }
  }, [canvasRef, roomId, socket]);

  return (
    <div>
      <ToolBar
        roomId={roomId}
        setselectedTool={setselectedTool}
        selectedTool={selectedTool}
      />
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{
          display: "block",
          position: "fixed",
          top: 0,
          left: 0,
        }}
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
    <div className=" flex justify-center">
      <div className=" p-3 bg-[#27272a] rounded-lg top-6 left-3 fixed">
        Room ID : {roomId}
      </div>
      <div className=" bg-[#27272a]  p-1 rounded-lg fixed w-72  top-6">
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
          <div
            className={`p-2 hover:bg-gray-600`}
            color={`${selectedTool === "triangle" ? "red" : "white"}`}
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
