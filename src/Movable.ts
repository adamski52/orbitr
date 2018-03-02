import {IPosition} from "./Position.interface";
import {Shape} from "./Shape";

export class Movable extends Shape {
    private _position: IPosition;

    constructor() {
        super();
    }

    public set position(p: IPosition) {
        this._position = p;
    }

    public get position(): IPosition {
        return this._position;
    }
}