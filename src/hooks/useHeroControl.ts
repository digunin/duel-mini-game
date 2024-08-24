import { HeroSide } from "../components/game/Game";
import { AppHero } from "../store/types";
import { setLeftHero, setRightHero } from "../store/actions";
import { useAppContext } from "./useAppContext";

export const useHeroControl = () => {
  const { dispatch, state } = useAppContext();
  const { leftHero, rightHero } = state;

  const setHeroProps =
    (side: HeroSide) =>
    (props: Partial<Pick<AppHero, "cooldown" | "velocity">>) => {
      dispatch(side === "left" ? setLeftHero(props) : setRightHero(props));
    };

  return {
    setHeroProps,
    left: {
      score: leftHero.score,
      velocity: leftHero.velocity,
      cooldown: leftHero.cooldown,
    },
    right: {
      score: rightHero.score,
      velocity: rightHero.velocity,
      cooldown: rightHero.cooldown,
    },
  };
};
