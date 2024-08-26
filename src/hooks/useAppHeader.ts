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
    if (
      status === GameStatus.IDLE ||
      (status === GameStatus.RUNNING && gameStatus !== GameStatus.PAUSED)
    ) {
      resetHeroes();
    }

    function resetHeroes() {
      const initialProps: Partial<AppHero> = {
        score: 0,
        spellColor: "white",
        velocity: 5,
        cooldown: 5,
      };
      dispatch(setLeftHero(initialProps));
      dispatch(setRightHero(initialProps));
    }
  };

  return { buttonClickHandler, gameStatus };
};
