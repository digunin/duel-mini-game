import React from "react";
import { GameStatus } from "../store/types";
import { useAppHeader } from "../hooks/useAppHeader";
import gh_icon from "../assets/github.png";
import tg_icon from "../assets/telegram.png";

export const AppHeader = () => {
  const { buttonClickHandler, gameStatus } = useAppHeader();
  return (
    <header>
      <div className="header-links">
        <a href="https://github.com/digunin">
          <img src={gh_icon} alt="" />
        </a>
        <a href="https://t.me/digunin">
          <img src={tg_icon} alt="" />
        </a>
      </div>
      <div className="header-buttons">
        <button
          disabled={gameStatus !== GameStatus.IDLE}
          onClick={buttonClickHandler(GameStatus.RUNNING)}
        >
          Начать игру
        </button>
        <button
          disabled={gameStatus === GameStatus.IDLE}
          onClick={buttonClickHandler(GameStatus.IDLE)}
        >
          Закончить
        </button>
        <button
          disabled={gameStatus === GameStatus.IDLE}
          onClick={buttonClickHandler(
            gameStatus === GameStatus.PAUSED
              ? GameStatus.RUNNING
              : GameStatus.PAUSED
          )}
        >
          {gameStatus === GameStatus.PAUSED ? "Продолжить" : "Пауза"}
        </button>
      </div>
    </header>
  );
};
