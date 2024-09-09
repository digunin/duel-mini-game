import { GameStatus } from "../store/types";
import { GameDirector } from "./game-director/GameDirector";
import { IdleGameDirector } from "./game-director/IdleGameDirector";
import { RunningGameDirector } from "./game-director/RunningGameDirector";
import { GameUnitFactory } from "./game-units/GameUnitsFactory";
import { Hero } from "./game-units/Hero";
import { Point } from "./game-units/primitives/Point";
import { Spell } from "./game-units/Spell";
import { intersectCircleWithPoint } from "./game-units/utils";
import { EventCallback, EventObserver, EventType } from "./GameEvents";
import { AppGraphics } from "./graphics/AppGrphics";

const HERO_RADIUS = 55;

export type HeroSide = "left" | "right";

export class Game {
  private factory: GameUnitFactory<AppGraphics>;
  private gameWidth: number;
  private gameHeight: number;
  private leftHero: Hero;
  private rightHero: Hero;
  private leftHeroSpells: Spell[] = [];
  private rightHeroSpells: Spell[] = [];
  private eventObserver: EventObserver;
  private _cursorPosition: Point = new Point(0, 0);
  private bindedUpdateMethod = this._update.bind(this);
  private gameStatus: GameStatus = GameStatus.IDLE;
  private gameDirector: GameDirector;

  //////////////                                              //////////////
  //////////////                                              //////////////
  //////////////                                              //////////////
  //////////////        constructor, setup, init              //////////////
  //////////////                                              //////////////
  //////////////                                              //////////////
  //////////////                                              //////////////

  constructor(factory: GameUnitFactory<AppGraphics>) {
    this.factory = factory;
    this.setup();
    this.initIdle();
  }

  private setup() {
    const { width, height } = this.factory.graphics.size;
    this.gameWidth = width;
    this.gameHeight = height;
    this.leftHero = this.factory.createHero(
      new Point(HERO_RADIUS + 1, HERO_RADIUS + 1),
      HERO_RADIUS
    );
    this.rightHero = this.factory.createHero(
      new Point(
        this.gameWidth - HERO_RADIUS - 1,
        this.gameHeight - HERO_RADIUS - 1
      ),
      HERO_RADIUS
    );
    this.leftHero.color = "red";
    this.rightHero.color = "green";
    this.eventObserver = new EventObserver();
  }

  private initRunning() {
    this.gameDirector = new RunningGameDirector(
      this.factory,
      this.eventObserver,
      this.gameWidth,
      this.gameHeight
    );
    this.leftHero.direction = 90;
    this.rightHero.direction = 270;
    this.leftHero.position = new Point(1, 1);
    this.rightHero.position = new Point(
      this.gameWidth - HERO_RADIUS * 2 - 1,
      this.gameHeight - HERO_RADIUS * 2 - 1
    );
    this.leftHero.spellColor = "white";
    this.rightHero.spellColor = "white";
    this.leftHeroSpells = [];
    this.rightHeroSpells = [];
  }

  private initIdle() {
    this.gameDirector = new IdleGameDirector(
      this.factory,
      this.eventObserver,
      this.gameWidth,
      this.gameHeight
    );

    this.leftHero.position = new Point(
      this.gameWidth / 3 - this.leftHero.radius,
      this.gameHeight / 2 - this.leftHero.radius
    );
    this.leftHero.velocity = 0;

    this.rightHero.position = new Point(
      (this.gameWidth / 3) * 2 - this.rightHero.radius,
      this.gameHeight / 2 - this.rightHero.radius
    );
    this.rightHero.velocity = 0;

    const spellRadius = 40;
    const spell = this.factory.createSpell(
      new Point(spellRadius + 1, spellRadius + 1),
      spellRadius
    );
    spell.color = "white";
    let dir = Math.round(Math.random() * 88);
    spell.direction = dir < 2 ? 2 : dir;
    spell.velocity = 15;
    this.rightHeroSpells = [];
    this.leftHeroSpells = [spell];
  }

  //////////////                                              //////////////
  //////////////                                              //////////////
  //////////////                                              //////////////
  //////////////                draw, update                  //////////////
  //////////////                                              //////////////
  //////////////                                              //////////////
  //////////////                                              //////////////

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
    this.gameDirector.update(
      {
        heroes: {
          left: this.leftHero,
          right: this.rightHero,
        },
        spells: {
          left: this.leftHeroSpells,
          right: this.rightHeroSpells,
        },
        cursorPosition: this._cursorPosition,
      },
      this.gameStatus
    );
    this.draw();
  }

  public get update() {
    return this.bindedUpdateMethod;
  }

  //////////////                                              //////////////
  //////////////                                              //////////////
  //////////////                                              //////////////
  //////////////        change game state from outside        //////////////
  //////////////                                              //////////////
  //////////////                                              //////////////
  //////////////                                              //////////////

  public setGameStatus(status: GameStatus) {
    if (status === this.gameStatus) return;
    if (status === GameStatus.RUNNING) {
      if (this.gameStatus === GameStatus.IDLE) {
        this.initRunning();
      }
    }
    if (status === GameStatus.IDLE) {
      this.initIdle();
    }
    this.gameStatus = status;
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

  public setHeroSpellColor(side: HeroSide, color: string) {
    if (this.gameStatus === GameStatus.IDLE) {
      this.leftHeroSpells[0].color = color;
      return;
    }
    if (side === "left") {
      this.leftHero.spellColor = color;
    } else {
      this.rightHero.spellColor = color;
    }
  }

  public set cursorPosition(p: Point) {
    this._cursorPosition = p;
  }

  public isCursorInsideHero(): HeroSide | null {
    if (
      intersectCircleWithPoint(
        this.leftHero.center,
        this.leftHero.radius,
        this._cursorPosition
      )
    )
      return this.gameStatus === GameStatus.IDLE ? "right" : "left";
    if (
      intersectCircleWithPoint(
        this.rightHero.center,
        this.rightHero.radius,
        this._cursorPosition
      )
    )
      return "right";
    return null;
  }

  public subscribe(type: EventType, callback: EventCallback) {
    this.eventObserver.subscribe(type, callback);
  }
}
