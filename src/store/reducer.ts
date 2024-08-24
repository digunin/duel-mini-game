import { ActionType } from "./types";
import { AppActions, AppState } from "./types";

const reducer = (state: AppState, action: AppActions): AppState => {
  switch (action.type) {
    case ActionType.SET_LEFT_HERO:
      const l_hero = state.leftHero;
      return {
        ...state,
        leftHero: {
          ...l_hero,
          ...action.payload,
        },
      };
    case ActionType.SET_RIGHT_HERO:
      const r_hero = state.rightHero;
      return {
        ...state,
        rightHero: {
          ...r_hero,
          ...action.payload,
        },
      };
    case ActionType.SET_SCALE:
      return { ...state, scale: action.payload };
    default:
      return state;
  }
};

export default reducer;
