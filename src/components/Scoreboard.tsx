import React from "react";
import { useAppContext } from "../hooks/useAppContext";

export const Scoreboard = () => {
  const {
    state: { leftHero, rightHero },
  } = useAppContext();

  return (
    <div className="scoreboard">
      <div>{leftHero.score}</div>
      <div>{rightHero.score}</div>
    </div>
  );
};
