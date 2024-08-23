import { GameUnitFactory } from "./game-units/GameUnitsFactory";
import { Hero } from "./game-units/Hero";
import { Point } from "./game-units/primitives/Point";
import { AppGraphics } from "./graphics/AppGrphics";

const HERO_RADIUS = 55;

export class Game {
  private graphics: AppGraphics;
  private gameWidth: number;
  private gameHeight: number;
  private leftHero: Hero;
  private rightHero: Hero;

  constructor(private factory: GameUnitFactory<AppGraphics>) {
    this.graphics = factory.graphics;
    const { width, height } = factory.graphics.size;
    this.gameWidth = width;
    this.gameHeight = height;
    this.leftHero = factory.createHero(
      new Point(HERO_RADIUS + 1, HERO_RADIUS),
      HERO_RADIUS
    );
    this.rightHero = factory.createHero(
      new Point(
        this.gameWidth - HERO_RADIUS - 1,
        this.gameHeight - HERO_RADIUS
      ),
      HERO_RADIUS
    );
    this.leftHero.velocity_Y = 3;
    this.leftHero.color = "red";
    this.rightHero.color = "green";
  }

  private draw() {
    this.graphics.clear();
    this.leftHero.draw();
    this.rightHero.draw();
  }

  private _update() {
    this.updateHero(this.leftHero);
    this.updateHero(this.rightHero);
    this.draw();
  }

  public get update() {
    return this._update.bind(this);
  }

  private updateHero(hero: Hero) {
    const nextPos = hero.nextMove();
    if (nextPos.y <= 0) {
      hero.velocity_Y = 3;
      return;
    }
    if (nextPos.y >= this.gameHeight - hero.height) {
      hero.velocity_Y = -3;
      return;
    }
    hero.nextMove(true);
  }
}
