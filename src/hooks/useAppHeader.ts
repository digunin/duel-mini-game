import { setGameStatus, setLeftHero, setRightHero } from "../store/actions";
import { AppHero, GameStatus } from "../store/types";
import { useAppContext } from "./useAppContext";

export const useAppHeader = () => {
  const {
    dispatch,
    state: { gameStatus },
  } = useAppContext();

  const buttonClickHandler = (status: GameStatus) => () => {
    dispatch(setGameStatus(status));
    if (status === GameStatus.RUNNING && gameStatus !== GameStatus.PAUSED) {
      resetHeroes(true);
    }
    if (status === GameStatus.IDLE) resetHeroes(false);

    function resetHeroes(resetScores: boolean) {
      const initialProps: Partial<AppHero> = {
        spellColor: "white",
        velocity: 5,
        cooldown: 5,
      };
      if (resetScores) initialProps.score = 0;
      dispatch(setLeftHero(initialProps));
      dispatch(setRightHero(initialProps));
    }
  };

  return { buttonClickHandler, gameStatus };
};
