import { HeroSide } from "./Game";

export type EventType = "hero-damaged" | "game-started";
export type GameEvent = {
  type: EventType;
  heroDamaged: HeroSide;
};
export type EventCallback = (event: GameEvent) => void;

export class EventObserver {
  private subscribers: { [key in EventType]: EventCallback[] } = {
    "hero-damaged": [],
    "game-started": [],
  };

  public subscribe(type: EventType, callback: EventCallback) {
    if (this.subscribers[type].includes(callback)) return;
    this.subscribers[type].push(callback);
  }

  public emitEvent(event: GameEvent) {
    console.log(this.subscribers[event.type].length);

    this.subscribers[event.type].forEach((callback) => callback(event));
  }
}
