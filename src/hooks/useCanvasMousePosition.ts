import { useEffect, useState } from "react";
import { Point } from "../components/game/game-units/primitives/Point";

export const useCanvasMousePosition = (
  width: number,
  height: number,
  onCanvasClick: () => void,
  canvas: React.RefObject<HTMLCanvasElement>
) => {
  const [canvasCursor, setCanvasCursor] = useState(new Point(0, 0));
  const [windowCursor, setWindowCursor] = useState(new Point(0, 0));

  const throttledHandler = throttle(mouseMoveHandler, 16);
  const mouseLeaveHandler = () => setCanvasCursor(new Point(0, 0));

  useEffect(() => {
    if (!canvas.current) return;
    const element = canvas.current;
    element.addEventListener("mousemove", throttledHandler);
    element.addEventListener("mousedown", canvasClickHandler);
    element.addEventListener("mouseleave", mouseLeaveHandler);
    return () => {
      element.removeEventListener("mousemove", throttledHandler);
      element.removeEventListener("mousedown", canvasClickHandler);
      element.removeEventListener("mouseleave", mouseLeaveHandler);
    };
  }, []);

  function mouseMoveHandler(e: MouseEvent) {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    const bounds = canvas.getBoundingClientRect();

    const scale = width / bounds.width;

    setWindowCursor(new Point(e.clientX, e.clientY));
    setCanvasCursor(
      new Point(
        Math.round((e.clientX - bounds.left) * scale),
        height - Math.round((e.clientY - bounds.top) * scale)
      )
    );
  }

  function canvasClickHandler(e: MouseEvent) {
    mouseMoveHandler(e);
    onCanvasClick();
  }

  return {
    windowCursor,
    canvasCursor,
  };
};

function throttle<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  let wait = false;
  return (...args: T extends (...args: infer A) => void ? A : never) => {
    if (wait) return;
    callback(...args);
    wait = true;
    setTimeout(() => {
      wait = false;
    }, delay);
  };
}
