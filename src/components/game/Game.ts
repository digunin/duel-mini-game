import { Circle } from "./game-units/Circle";
import { GameUnitFactory } from "./game-units/GameUnitsFactory";
import { Hero } from "./game-units/Hero";
import { Line } from "./game-units/primitives/Line";
import { Point } from "./game-units/primitives/Point";
import { Spell } from "./game-units/Spell";
import {
  fromDegToRad,
  intersectCircleWithCircle,
  intersectCircleWithLine,
  intersectCircleWithPoint,
} from "./game-units/utils";
import { EventCallback, EventObserver, EventType } from "./GameEvents";
import { AppGraphics } from "./graphics/AppGrphics";

const HERO_RADIUS = 55;
const SPELL_RADIUS = 25;

export type HeroSide = "left" | "right";
type GameBounds = {
  left: Line;
  rigth: Line;
  top: Line;
  bottom: Line;
};

export class Game {
  private factory: GameUnitFactory<AppGraphics>;
  private gameWidth: number;
  private gameHeight: number;
  private leftHero: Hero;
  private rightHero: Hero;
  private bounds: GameBounds;
  private leftHeroSpells: Spell[] = [];
  private rightHeroSpells: Spell[] = [];
  private eventObserver: EventObserver;
  private _cursorPosition: Point = new Point(0, 0);
  private bindedUpdateMethod: () => void;

  constructor(factory: GameUnitFactory<AppGraphics>) {
    this.factory = factory;
    this.setup();
    this.leftHero = factory.createHero(
      new Point(HERO_RADIUS + 1, HERO_RADIUS + 1),
      HERO_RADIUS
    );
    this.rightHero = factory.createHero(
      new Point(
        this.gameWidth - HERO_RADIUS - 1,
        this.gameHeight - HERO_RADIUS - 1
      ),
      HERO_RADIUS
    );
    this.leftHero.color = "red";
    this.rightHero.color = "green";
    this.leftHero.direction = 90;
    this.rightHero.direction = 270;
  }

  private draw() {
    this.factory.graphics.clear();
    this.leftHero.draw();
    this.rightHero.draw();
    this.drawSpells(this.leftHeroSpells);
    this.drawSpells(this.rightHeroSpells);
  }

  private drawSpells(spells: Spell[]) {
    spells.forEach((spell) => {
      if (spell.isAlive) spell.draw();
    });
  }

  private _update() {
    this.updateHero(this.leftHero);
    this.updateHero(this.rightHero);
    if (this.leftHero.fire()) {
      this.leftHeroSpells.push(this.createSpell(this.leftHero, 0));
    }
    if (this.rightHero.fire()) {
      this.rightHeroSpells.push(this.createSpell(this.rightHero, 180));
    }
    this.deleteDeadSpells();
    this.updateSpells(this.leftHero, this.rightHeroSpells, "left");
    this.updateSpells(this.rightHero, this.leftHeroSpells, "right");
    this.draw();
  }

  public get update() {
    return this.bindedUpdateMethod;
  }

  private updateHero(hero: Hero) {
    let nextPos = hero.nextMove();

    for (const bound of this.allBounds()) {
      if (intersectCircleWithLine(nextPos, hero.radius, bound))
        hero.reflecFromLine(bound);
    }
    nextPos = hero.nextMove();

    if (this.isCircleMeetCursor(nextPos, hero.radius, hero.direction)) {
      hero.direction = 360 - hero.direction;
    }
    nextPos = hero.nextMove();
    if (this.circleOutOfBounds(nextPos, hero.radius)) return;

    hero.nextMove(true);
  }

  public isCursorInsideHero(cursor: Point): HeroSide | null {
    if (
      intersectCircleWithPoint(
        this.leftHero.center,
        this.leftHero.radius,
        cursor
      )
    )
      return "left";
    if (
      intersectCircleWithPoint(
        this.rightHero.center,
        this.rightHero.radius,
        cursor
      )
    )
      return "right";
    return null;
  }

  public setHeroVelocity(side: HeroSide, velocity: number) {
    if (side === "left") {
      this.leftHero.velocity = velocity;
    } else {
      this.rightHero.velocity = velocity;
    }
  }

  public setHeroCooldown(side: HeroSide, cooldown: number) {
    if (side === "left") {
      this.leftHero.cooldown = cooldown;
    } else {
      this.rightHero.cooldown = cooldown;
    }
  }

  private setup() {
    const { width, height } = this.factory.graphics.size;
    this.gameWidth = width;
    this.gameHeight = height;
    this.bounds = {
      left: new Line(new Point(0, 0), new Point(0, this.gameHeight)),
      rigth: new Line(
        new Point(this.gameWidth, 0),
        new Point(this.gameWidth, this.gameHeight)
      ),
      top: new Line(
        new Point(0, this.gameHeight),
        new Point(this.gameWidth, this.gameHeight)
      ),
      bottom: new Line(new Point(0, 0), new Point(this.gameWidth, 0)),
    };
    this.eventObserver = new EventObserver();
    this.bindedUpdateMethod = this._update.bind(this);
  }

  private *allBounds(): Generator<Line> {
    yield this.bounds.left;
    yield this.bounds.rigth;
    yield this.bounds.top;
    yield this.bounds.bottom;
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
        this.eventObserver.emitEvent({
          type: "hero-damaged",
          heroDamaged: side,
        });
      }
    });
    spells.forEach((spell) => spell.nextMove(true));
  }

  private circleOutOfBounds(center: Point, radius: number, shift?: number) {
    shift = shift ?? 0;
    if (center.x - radius + shift < 0) return true;
    if (center.x + radius - shift > this.gameWidth) return true;
    if (center.y - radius + shift < 0) return true;
    if (center.y + radius - shift > this.gameHeight) return true;
    return false;
  }

  private deleteDeadSpells() {
    this.leftHeroSpells = this.leftHeroSpells.filter((spell) => spell.isAlive);
    this.rightHeroSpells = this.rightHeroSpells.filter(
      (spell) => spell.isAlive
    );
  }

  private createSpell(hero: Hero, direction: number) {
    const mod = Math.cos(fromDegToRad(direction)) < 0 ? -1 : 1;
    const spellCenter = new Point(
      hero.center.x + (hero.radius + SPELL_RADIUS) * mod,
      hero.center.y
    );
    const spell = this.factory.createSpell(spellCenter, SPELL_RADIUS);
    spell.color = hero.spellColor;
    spell.velocity = 15;
    spell.direction = direction;
    return spell;
  }

  public subscribe(type: EventType, callback: EventCallback) {
    this.eventObserver.subscribe(type, callback);
  }

  private isCircleMeetCursor(center: Point, radius: number, direction: number) {
    const collisionPoint = intersectCircleWithPoint(
      center,
      radius,
      this._cursorPosition
    );
    if (!collisionPoint) return false;
    if (collisionPoint.y < center.y && direction === 270) return true;
    if (collisionPoint.y > center.y && direction === 90) return true;
    return false;
  }

  public set cursorPosition(p: Point) {
    this._cursorPosition = p;
  }
}
