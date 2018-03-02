import {IConfig} from "./Config.interface";
import {Movable} from "./Movable";

export class Particle extends Movable {
    private _mass:number = 0;
    private _config:IConfig;
    private _color:number = 0x00ff00;

    constructor(config:IConfig) {
        super();
        this._config = config;
    }

    public render():void {
        this.element.clear();

        this.element.beginFill(this.color);
        this.element.drawCircle(this.position.x, this.position.y, this.size);
        this.element.endFill();
    }

    public grow():void {
        this.mass += this._config.massGrowth;
    }

    public set color(c:number) {
        this._color = c;
    }

    public get color():number {
        return this._color;
    }

    public get size():number {
        return this.mass * this._config.massScalar;
    }

    public set mass(m:number) {
        this._mass = m;
    }

    public get mass():number {
        return this._mass;
    }
}