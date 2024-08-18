import {
  ActionType,
  AppHero,
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
