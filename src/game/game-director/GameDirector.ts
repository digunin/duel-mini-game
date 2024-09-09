import { GameUnitFactory } from "../game-units/GameUnitsFactory";
import { AppGraphics } from "../graphics/AppGrphics";
import { EventObserver } from "../GameEvents";
import { Hero } from "../game-units/Hero";
import { Line } from "../game-units/primitives/Line";
import { Point } from "../game-units/primitives/Point";
import { Spell } from "../game-units/Spell";
import { GameStatus } from "../../store/types";
import { intersectCircleWithLine } from "../game-units/utils";

export type GameEntities = {
  heroes: {
    left: Hero;
    right: Hero;
  };
  spells: {
    left: Spell[];
    right: Spell[];
  };
  cursorPosition: Point;
};

type GameBounds = {
  left: Line;
  rigth: Line;
  top: Line;
  bottom: Line;
};

export abstract class GameDirector {
  private _bounds: GameBounds;
  constructor(
    protected _factory: GameUnitFactory<AppGraphics>,
    protected _eventObserver: EventObserver,
    protected _gameWidth: number,
    protected _gameHeight: number
  ) {
    this._bounds = {
      left: new Line(new Point(0, 0), new Point(0, this._gameHeight)),
      rigth: new Line(
        new Point(this._gameWidth, 0),
        new Point(this._gameWidth, this._gameHeight)
      ),
      top: new Line(
        new Point(0, this._gameHeight),
        new Point(this._gameWidth, this._gameHeight)
      ),
      bottom: new Line(new Point(0, 0), new Point(this._gameWidth, 0)),
    };
  }
  public abstract update(entities: GameEntities, gameStatus: GameStatus): void;

  protected circleOutOfBounds(center: Point, radius: number, shift?: number) {
    shift = shift ?? 0;
    if (center.x - radius + shift < 0) return true;
    if (center.x + radius - shift > this._gameWidth) return true;
    if (center.y - radius + shift < 0) return true;
    if (center.y + radius - shift > this._gameHeight) return true;
    return false;
  }

  protected checkCollideWithBounds(center: Point, radius: number): Line | null {
    for (const bound of Object.values(this._bounds)) {
      if (intersectCircleWithLine(center, radius, bound)) return bound;
    }
    return null;
  }
}
