import React, { FC } from "react";

type SProps = {
  leftScore?: number;
  rightScore?: number;
};

export const Scoreboard: FC<SProps> = ({ leftScore = 0, rightScore = 0 }) => {
  return (
    <div className="scoreboard">
      <div>{leftScore}</div>
      <div>{rightScore}</div>
    </div>
  );
};
