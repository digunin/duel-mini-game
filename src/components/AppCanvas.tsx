import React, { FC } from "react";
import useCanvas from "../hooks/useCanvas";

type AppCanvasProps = {
  scale: number;
  width: number;
  height: number;
  update: (ctx: CanvasRenderingContext2D) => void;
} & React.CanvasHTMLAttributes<HTMLCanvasElement>;

export const AppCanvas: FC<AppCanvasProps> = ({
  update,
  scale,
  width,
  height,
  ...props
}) => {
  const canvasRef = useCanvas(width, height, scale, update);

  return <canvas ref={canvasRef} {...props} />;
};
