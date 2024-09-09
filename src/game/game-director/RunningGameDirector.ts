import { GameDirector, GameEntities } from "./GameDirector";
import { Hero } from "../game-units/Hero";
import { Point } from "../game-units/primitives/Point";
import { Spell } from "../game-units/Spell";
import { HeroSide } from "../Game";
import { GameStatus } from "../../store/types";
import {
  fromDegToRad,
  intersectCircleWithCircle,
  intersectCircleWithPoint,
} from "../game-units/utils";

const SPELL_RADIUS = 25;

export class RunningGameDirector extends GameDirector {
  public update(entities: GameEntities, gameStatus: GameStatus) {
    if (gameStatus === GameStatus.PAUSED) return;
    const { cursorPosition, heroes, spells } = entities;
    this.updateHero(heroes.left, cursorPosition);
    this.updateHero(heroes.right, cursorPosition);
    if (heroes.left.fire()) {
      spells.left.push(this.createSpell(heroes.left, 0));
    }
    if (heroes.right.fire()) {
      spells.right.push(this.createSpell(heroes.right, 180));
    }
    this.deleteDeadSpells(spells.left);
    this.deleteDeadSpells(spells.right);
    this.updateSpells(heroes.left, spells.right, "left");
    this.updateSpells(heroes.right, spells.left, "right");
  }

  private createSpell(hero: Hero, direction: number) {
    const mod = Math.cos(fromDegToRad(direction)) < 0 ? -1 : 1;
    const spellCenter = new Point(
      hero.center.x + (hero.radius + SPELL_RADIUS) * mod,
      hero.center.y
    );
    const spell = this._factory.createSpell(spellCenter, SPELL_RADIUS);
    spell.color = hero.spellColor;
    spell.velocity = 15;
    spell.direction = direction;
    return spell;
  }

  private deleteDeadSpells(spells: Spell[]) {
    let index: number;
    while ((index = spells.findIndex((spell) => !spell.isAlive)) >= 0) {
      spells.splice(index, 1);
    }
  }

  private updateSpells(hero: Hero, spells: Spell[], side: HeroSide) {
    spells.forEach((spell) => {
      if (this.circleOutOfBounds(spell.center, spell.radius, spell.radius * 2))
        spell.die();
      if (
        intersectCircleWithCircle(
          spell.center,
          spell.radius,
          hero.center,
          hero.radius
        )
      ) {
        spell.die();
        hero.damage(spell.color);
        this._eventObserver.emitEvent({
          type: "hero-damaged",
          heroDamaged: side,
        });
      }
    });
    spells.forEach((spell) => spell.nextMove(true));
  }

  private updateHero(hero: Hero, cursorPosition: Point) {
    let nextPos = hero.nextMove();
    let bound = this.checkCollideWithBounds(nextPos, hero.radius);
    if (bound) hero.reflecFromLine(bound);

    nextPos = hero.nextMove();
    if (
      this.isCircleMeetCursor(
        nextPos,
        hero.radius,
        hero.direction,
        cursorPosition
      )
    ) {
      hero.direction = 360 - hero.direction;
    }

    nextPos = hero.nextMove();
    if (this.circleOutOfBounds(nextPos, hero.radius)) return;

    hero.nextMove(true);
  }

  private isCircleMeetCursor(
    center: Point,
    radius: number,
    direction: number,
    cursorPosition: Point
  ) {
    const collisionPoint = intersectCircleWithPoint(
      center,
      radius,
      cursorPosition
    );
    if (!collisionPoint) return false;
    if (collisionPoint.y < center.y && direction === 270) return true;
    if (collisionPoint.y > center.y && direction === 90) return true;
    return false;
  }
}
