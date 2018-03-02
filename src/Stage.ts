import {Application} from "pixi.js";
import {Ticker} from "pixi.js/lib";
import {IConfig} from "./Config.interface";
import {Particle} from "./Particle";
import {Group} from "./Group";
import {IRenderable} from "./Renderable.interface";

export class Stage implements IRenderable{
    private _app:Application = new Application({
        width: window.innerWidth,
        height: window.innerHeight,
        antialias: false,
        transparent: false,
        resolution: 1
    });

    private _config:IConfig = {
        acceleration: 9.8,
        massScalar: 10,
        massGrowth: 1
    };

    private _currentParticle:Particle;
    private _particles:Particle[] = [];

    constructor() {
        this.setupApp();
        this.setupEvents();
        this.setupTicker();

        this._app.ticker.start();
    }

    private setupEvents():void {
        this.element.addEventListener("mousedown", (e:MouseEvent) => {
            this._onMouseDown(e);
        });

        this.element.addEventListener("mouseup", (e:MouseEvent) => {
            this._onMouseUp(e);
        });
    }

    private _onMouseDown(e:MouseEvent):void {
        e.preventDefault();

        this._currentParticle = new Particle(this._config);
        this._currentParticle.position = {
            x: e.offsetX,
            y: e.offsetY
        };
        this._currentParticle.color = 0xff0000;

        this._particles.push(this._currentParticle);
        this.add(this._currentParticle);
    }

    private _onMouseUp(e:MouseEvent):void {
        e.preventDefault();

        this._currentParticle.color = 0xffffff;

        this._currentParticle = undefined;
    }

    private _onMouseHold():void {
        if(!this._currentParticle) {
            return;
        }

        this._currentParticle.grow();
    }

    private setupApp():void {
        this._app.renderer.view.style.position = "absolute";
        this._app.renderer.view.style.display = "block";
        this._app.renderer.autoResize = true;
        this._app.renderer.backgroundColor = 0x000000;
        this._app.renderer.resize(window.innerWidth, window.innerHeight);
    }

    private setupTicker():void {
        this._app.ticker.add(() => {
            this.render();
        });
    }

    public render():void {
        this._onMouseHold();

        this._particles.forEach((p:Particle) => {
            p.render();
        });

        this._app.renderer.render(this._app.stage);
    }

    public add(element:Particle|Group):void {
        this._app.stage.addChild(element.element);
    }

    public get element():HTMLCanvasElement {
        return this._app.view;
    }
}