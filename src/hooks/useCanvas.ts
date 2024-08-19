import { useRef, useEffect } from "react";
import { useAppContext } from "./useAppContext";

const useCanvas = (update: (ctx: CanvasRenderingContext2D) => void) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { state } = useAppContext();
  const { baseSize, scale } = state;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (canvas == null || context == null) return;
    canvas.width = baseSize.width * scale;
    canvas.height = baseSize.height * scale;
    context.scale(scale, scale);
    let animationFrameId: number;

    const render = () => {
      update(context);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [update, scale]);

  return canvasRef;
};

export default useCanvas;
