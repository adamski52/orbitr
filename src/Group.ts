import {Container} from "pixi.js";
import {Shape} from "./Shape";
import {IRenderable} from "./Renderable.interface";

export class Group implements IRenderable {
    private _element:Container = new Container();
    private _items: (Group|Shape)[] = [];

    public get element():Container {
        return this._element;
    }

    public add(e: Group|Shape): void {
        this._items.push(e);
        this.element.addChild(e.element);
    }

    public render():void {
        this._items.forEach((item:Group|Shape) => {
            item.render();
        });
    }
}