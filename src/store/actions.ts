import { HeroSide } from "../game/Game";
import {
  ActionType,
  AppHero,
  GameStatus,
  IncreaseScore,
  SetGameStatus,
  SetLeftHero,
  SetRightHero,
  SetScale,
} from "./types";

export const setLeftHero = (props: Partial<AppHero>): SetLeftHero => {
  return {
    type: ActionType.SET_LEFT_HERO,
    payload: props,
  };
};

export const setRightHero = (props: Partial<AppHero>): SetRightHero => {
  return {
    type: ActionType.SET_RIGHT_HERO,
    payload: props,
  };
};

export const setScale = (scale: number): SetScale => {
  return {
    type: ActionType.SET_SCALE,
    payload: scale,
  };
};

export const increaseScore = (hero: HeroSide): IncreaseScore => {
  return {
    type: ActionType.INCREASE_SCORE,
    payload: hero,
  };
};

export const setGameStatus = (status: GameStatus): SetGameStatus => {
  return {
    type: ActionType.SET_GAME_STATUS,
    payload: status,
  };
};
