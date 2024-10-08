import { AppGraphics } from "../graphics/AppGrphics";
import { Point } from "./primitives/Point";
import { fromDegToRad } from "./utils";

export abstract class Unit {
  protected _velocity: number = 0;
  protected _velocity_X: number = 0;
  protected _velocity_Y: number = 0;
  protected _direction: number = 0; // угол между осью X и направлением движения
  public color: string = "black";

  constructor(
    protected graphics: AppGraphics,
    public position: Point, // абсолютные координаты нижнего левого угла юнита в декартовых координатах
    public width: number,
    public height: number
  ) {}

  public nextMove(confirmMove?: boolean) {
    const newPos = new Point(
      this.position.x + this._velocity_X,
      this.position.y + this._velocity_Y
    );
    if (confirmMove) this.position = newPos;
    return newPos;
  }

  public abstract draw(): void;

  public get velocity() {
    return this._velocity;
  }
  public get velocity_X() {
    return this._velocity_X;
  }
  public get velocity_Y() {
    return this._velocity_Y;
  }
  public get direction() {
    return this._direction;
  }
  public set velocity(v) {
    this._velocity = v;
    this.recalcVelocity();
  }
  public set velocity_X(v_X) {
    throw new Error("Can`t change velocity_X, only velocity");
    this._velocity_X = v_X;
    // пересчитать _velocity и _direction
  }
  public set velocity_Y(v_Y) {
    throw new Error("Can`t change velocity_Y, only velocity");
    this._velocity_Y = v_Y;
    // пересчитать _velocity и _direction
  }
  public set direction(d) {
    this._direction = d;
    this.recalcVelocity();
  }

  private recalcVelocity() {
    this._velocity_X = Math.round(
      this._velocity * Math.cos(fromDegToRad(this._direction))
    );
    this._velocity_Y = Math.round(
      this._velocity * Math.sin(fromDegToRad(this._direction))
    );
  }
}
