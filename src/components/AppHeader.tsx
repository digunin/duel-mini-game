import React from "react";
import { useAppContext } from "../hooks/useAppContext";
import { GameStatus } from "../store/types";
import { setGameStatus } from "../store/actions";

export const AppHeader = () => {
  const {
    dispatch,
    state: { gameStatus },
  } = useAppContext();

  const callback = (status: GameStatus) => () => {
    dispatch(setGameStatus(status));
  };

  return (
    <header>
      <button
        disabled={gameStatus !== GameStatus.IDLE}
        onClick={callback(GameStatus.RUNNING)}
      >
        Начать игру
      </button>
      <button
        disabled={gameStatus === GameStatus.IDLE}
        onClick={callback(GameStatus.IDLE)}
      >
        Закончить
      </button>
      <button
        disabled={gameStatus === GameStatus.IDLE}
        onClick={callback(
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
