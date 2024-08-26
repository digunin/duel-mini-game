import React from "react";
import { GameStatus } from "../store/types";
import { useAppHeader } from "../hooks/useAppHeader";

export const AppHeader = () => {
  const { buttonClickHandler, gameStatus } = useAppHeader();
  return (
    <header>
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
    </header>
  );
};
