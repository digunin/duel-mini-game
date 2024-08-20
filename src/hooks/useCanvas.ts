import { useRef, useEffect } from "react";

const useCanvas = (
  width: number,
  height: number,
  scale: number,
  update: (ctx: CanvasRenderingContext2D) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (canvas == null || context == null) return;
    canvas.width = width * scale;
    canvas.height = height * scale;
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
