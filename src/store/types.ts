import { HeroSide } from "../components/game/Game";

export type AppColor = string;

export type AppHero = {
  velocity: number;
  spellColor: AppColor;
  cooldown: number;
  score: number;
};

export type AppState = {
  baseSize: { width: number; height: number };
  scale: number;
  leftHero: AppHero;
  rightHero: AppHero;
};

export enum ActionType {
  SET_LEFT_HERO,
  SET_RIGHT_HERO,
  SET_SCALE,
  INCREASE_SCORE,
}

export type SetLeftHero = {
  type: ActionType.SET_LEFT_HERO;
  payload: Partial<AppHero>;
};

export type SetRightHero = {
  type: ActionType.SET_RIGHT_HERO;
  payload: Partial<AppHero>;
};

export type SetScale = {
  type: ActionType.SET_SCALE;
  payload: number;
};

export type IncreaseScore = {
  type: ActionType.INCREASE_SCORE;
  payload: HeroSide;
};

export type AppActions = SetLeftHero | SetRightHero | SetScale | IncreaseScore;
