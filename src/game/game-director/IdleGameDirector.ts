import { GameDirector, GameEntities } from "./GameDirector";
import { GameStatus } from "../../store/types";
import { intersectCircleWithCircle } from "../game-units/utils";

export class IdleGameDirector extends GameDirector {
  public update(entities: GameEntities, gameStatus: GameStatus): void {
    const { heroes, spells } = entities;
    const spell = spells.left[0];
    let next_pos = spell.nextMove();
    let bound = this.checkCollideWithBounds(next_pos, spell.radius);
    if (bound) spell.reflecFromLine(bound);

    let point = intersectCircleWithCircle(
      next_pos,
      spell.radius,
      heroes.left.center,
      heroes.right.radius
    );
    if (point) {
      heroes.left.damage(spell.color);
      spell.reflectFromPoint(point);
    }

    point = intersectCircleWithCircle(
      next_pos,
      spell.radius,
      heroes.right.center,
      heroes.right.radius
    );
    if (point) {
      heroes.right.damage(spell.color);
      spell.reflectFromPoint(point);
    }

    if (spell.direction > -2 && spell.direction % 90 < 2) spell.direction += 1;
    spell.nextMove(true);
  }
}
