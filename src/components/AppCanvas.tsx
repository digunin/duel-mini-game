import React, { FC } from "react";
import useCanvas from "../hooks/useCanvas";

type AppCanvasProps = {
  scale: number;
  width: number;
  height: number;
  update: () => void;
  gameCanvasRef: React.RefObject<HTMLCanvasElement>;
} & React.CanvasHTMLAttributes<HTMLCanvasElement>;

export const AppCanvas: FC<AppCanvasProps> = ({
  update,
  scale,
  width,
  height,
  gameCanvasRef,
  ...props
}) => {
  useCanvas(width, height, scale, update, gameCanvasRef);
  return (
    <canvas width={width} height={height} ref={gameCanvasRef} {...props} />
  );
};
