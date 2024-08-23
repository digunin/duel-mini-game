import { useEffect, useRef } from "react";
import { Point } from "../components/game/game-units/primitives/Point";

export const useCanvasMousePosition = (
  width: number,
  height: number,
  onCanvasClick: () => void
) => {
  const canvasCursor = useRef(new Point(0, 0));
  const windowCursor = useRef(new Point(0, 0));

  const throttledHandler = throttle(mouseMoveHandler, 48);

  useEffect(() => {
    window.addEventListener("mousemove", throttledHandler);
    window.addEventListener("mousedown", canvasClickHandler);
    return () => {
      window.removeEventListener("mousemove", throttledHandler);
      window.removeEventListener("mousedown", canvasClickHandler);
    };
  }, []);

  function mouseMoveHandler(e: MouseEvent) {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    const bounds = canvas.getBoundingClientRect();

    const scale = width / bounds.width;

    windowCursor.current = new Point(e.clientX, e.clientY);
    canvasCursor.current = new Point(
      Math.round((e.clientX - bounds.left) * scale),
      height - Math.round((e.clientY - bounds.top) * scale)
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
