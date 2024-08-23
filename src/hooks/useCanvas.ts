import { useRef, useEffect } from "react";

const useCanvas = (
  width: number,
  height: number,
  scale: number,
  update: () => void,
  gameCanvasRef: React.RefObject<HTMLCanvasElement>
) => {
  useEffect(() => {
    const canvas = gameCanvasRef.current;
    const context = canvas?.getContext("2d");
    if (canvas == null || context == null) return;
    canvas.width = width * scale;
    canvas.height = height * scale;
    context.scale(scale, scale);
    let animationFrameId: number;

    const render = () => {
      update();
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [update, scale]);
};

export default useCanvas;
