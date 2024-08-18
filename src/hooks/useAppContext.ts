import { useContext } from "react";
import { AppContext } from "../store/contextProvider";

export function useAppContext() {
  const context = useContext(AppContext);
  return context;
}
