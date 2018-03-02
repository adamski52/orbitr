import {Graphics} from "pixi.js";
import {IRenderable} from "./Renderable.interface";

export class Shape implements IRenderable {
    private _element: Graphics = new Graphics();

    public get element() {
        return this._element;
    }

    public render():void {}
}