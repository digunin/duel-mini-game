import React, { FC } from "react";
import useCanvas from "../hooks/useCanvas";

type AppCanvasProps = {
  update: (ctx: CanvasRenderingContext2D) => void;
} & React.CanvasHTMLAttributes<HTMLCanvasElement>;

export const AppCanvas: FC<AppCanvasProps> = ({ update, ...props }) => {
  const canvasRef = useCanvas(update);

  return <canvas ref={canvasRef} {...props} />;
};
