import React, { FC } from "react";
import { AppHero } from "../store/types";
import runIcon from "../assets/run-icon.png";
import shootIcon from "../assets/shoot-icon.png";
import { useAppContext } from "../hooks/useAppContext";

type HPProps = {
  values: {
    score: number;
    velocity: number;
    cooldown: number;
  };
  onchangeHandler: (
    props: Partial<Pick<AppHero, "cooldown" | "velocity">>
  ) => void;
};

export const HeroPanel: FC<HPProps> = ({ onchangeHandler, values }) => {
  const onSliderChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const property =
      e.target.name == "velocity"
        ? { velocity: +e.target.value }
        : { cooldown: +e.target.value };
    onchangeHandler(property);
  };

  const { score, velocity, cooldown } = values;

  return (
    <div className="hero-panel">
      <div className="score">
        <p>{score}</p>
      </div>
      <div className="sliders">
        <div className="slider-wrapper">
          <img src={runIcon} alt="Скорость движения" />
          <input
            type="range"
            onChange={onSliderChangeHandler}
            name="velocity"
            min="0"
            max="10"
            value={velocity}
          />
        </div>
        <div className="slider-wrapper">
          <img src={shootIcon} alt="Скорость стрельбы" />
          <input
            type="range"
            onChange={onSliderChangeHandler}
            name="cooldown"
            min="1"
            max="9"
            value={cooldown}
          />
        </div>
      </div>
    </div>
  );
};
