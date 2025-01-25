import { WEB_URL } from "@/config";
import axios from "axios";

type Shape = {
  type: "rect";
  x: number;
  y: number;
  width: number;
  height: number;
};

export async function Draw(canvas: HTMLCanvasElement, roomId: string) {
  const ctx = canvas.getContext("2d");

  let existingShapes: Shape[] = [];

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
    const width = e.clientX - startX;
    const height = e.clientY - startY;
    const shape: Shape = {
      type: "rect",
      x: startX,
      y: startY,
      width,
      height,
    };

    if (!shape) {
      return;
    }

    existingShapes.push(shape);
  });

  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      clearShape(existingShapes, canvas, ctx);
      ctx.strokeStyle = "rgba(33,235,55)";
      ctx.strokeRect(startX, startY, width, height);
    }
  });
}

function clearShape(
  existingShapes: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  existingShapes.map((shape) => {
    if (shape.type === "rect") {
      ctx.strokeStyle = "rgba(33,235,55)";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
  });
}

async function getexistingShapes() {
  await axios.get(`${WEB_URL}/chats/`);
}
