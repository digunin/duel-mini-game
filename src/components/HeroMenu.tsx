import React, { FC } from "react";
import { Point } from "../game/game-units/primitives/Point";

type HMProps = {
  position: Point;
  callback: (color: string) => void;
};

const colors = ["#dd5625", "#4fb6ed", "#400733", "#f0f376", "white"];

export const HeroMenu: FC<HMProps> = ({ position, callback }) => {
  return (
    <div
      className="color-picker"
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        width: 100,
      }}
    >
      <p>Цвет заклинаний</p>
      {colors.map((color) => (
        <div
          key={color}
          style={{ backgroundColor: color }}
          onClick={() => callback(color)}
        ></div>
      ))}
    </div>
  );
};
