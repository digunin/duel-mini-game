import { useAppContext } from "./useAppContext";
import { setScale } from "../store/actions";
import { useEffect, useState } from "react";

type Orientation = "landscape" | "portrait";

export const useAppScreen = (): { orient: Orientation } => {
  const [orient, setOrient] = useState<Orientation>("portrait");
  const { dispatch, state } = useAppContext();
  const { baseSize, scale } = state;

  const debounce = (fn: () => void, delay: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(), delay);
    };
  };

  const debouncedResizeHandler = debounce(resizeHandler, 100);

  useEffect(() => {
    window.addEventListener("resize", debouncedResizeHandler);
    return () => window.removeEventListener("resize", debouncedResizeHandler);
  }, []);

  useEffect(() => {
    resizeHandler();
  }, [scale]);

  function resizeHandler() {
    const { clientWidth, clientHeight } = document.documentElement;
    const panelWidth = 70;
    const panelHeight = 115;

    let base_ratio = baseSize.width / baseSize.height;
    let client_ratio = clientWidth / clientHeight;

    if (client_ratio > base_ratio) {
      let new_scale = Math.min(
        (clientWidth - panelWidth * 2) / baseSize.width,
        clientHeight / baseSize.height
      );
      dispatch(setScale(Math.min(new_scale, 1)));
      setOrient("landscape");
      return;
    }

    let new_scale = Math.min(
      clientWidth / baseSize.width,
      (clientHeight - panelHeight) / baseSize.height
    );
    dispatch(setScale(Math.min(new_scale, 1)));
    setOrient("portrait");
  }
  return { orient };
};
