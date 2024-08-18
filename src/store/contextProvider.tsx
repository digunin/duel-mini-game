import React, { FC, ReactNode, useReducer } from "react";
import reducer from "./reducer";
import { AppActions, AppState } from "./types";

const initialState: AppState = {
  baseSize: {
    width: 800,
    height: 400,
  },
  scale: 1,
  leftHero: {
    velocity: 0,
    cooldown: 1500,
    spellColor: "#00F",
    score: 0,
  },
  rightHero: {
    velocity: 0,
    cooldown: 1500,
    spellColor: "#0F0",
    score: 0,
  },
};

export const AppContext = React.createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppActions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = {
    state,
    dispatch,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default Provider;
