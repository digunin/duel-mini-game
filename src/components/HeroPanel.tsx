import React, { FC } from "react";
import { AppHero } from "../store/types";
import runIcon from "../assets/run-icon.png";
import shootIcon from "../assets/shoot-icon.png";

type HPProps = {
  score: number;
  onchangeHandler: (
    props: Partial<Pick<AppHero, "spellColor" | "cooldown">>
  ) => void;
};

export const HeroPanel: FC<HPProps> = ({ onchangeHandler, score }) => {
  const onSliderChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const property =
      e.target.name == "velocity"
        ? { velocity: +e.target.value }
        : { cooldown: +e.target.value };
    onchangeHandler(property);
  };
  return (
    <div className="hero-panel">
      <div className="score">
        <p>{score}</p>
      </div>
      <div className="sliders">
        <div className="slider-wrapper">
          <img src={runIcon} alt="Скорость бега" />
          <input
            type="range"
            onChange={onSliderChangeHandler}
            name="velocity"
            min="0"
            max="10"
          />
        </div>
        <div className="slider-wrapper">
          <img src={shootIcon} alt="Скорость стрельбы" />
          <input
            type="range"
            onChange={onSliderChangeHandler}
            name="cooldown"
            min="0"
            max="10"
          />
        </div>
      </div>
    </div>
  );
};
