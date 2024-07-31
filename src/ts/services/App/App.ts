import { inject, injectable } from "inversify";
import { singleton } from "../../decorators";
import { tokens } from "../../tokens";
import { Renderer } from "../Renderer";
import { Sim } from "../Sim";

@singleton()
export class App {

    @inject(tokens.Canvas)
    protected canvas!: HTMLCanvasElement;

    @inject(tokens.Context)
    protected context!: CanvasRenderingContext2D;

    @inject(Sim)
    protected sim!: Sim;

    @inject(Renderer)
    protected renderer!: Renderer;

    public update() {
        this.sim.update();
    }

    public draw() {
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.renderer.draw();
    }
}