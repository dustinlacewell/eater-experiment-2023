import { Sim } from "../Sim/Sim"
import { Eater } from "../Sim/entities/Eater"
import { Meater } from "../Sim/entities/Meater";
import { DIRECTIONS } from "../../consts";
import { singleton } from "../../decorators";
import { inject } from "inversify";
import { tokens } from "../../tokens";

@singleton()
export class Renderer {

    @inject(tokens.Canvas)
    protected canvas!: HTMLCanvasElement;

    @inject(tokens.Context)
    protected context!: CanvasRenderingContext2D;

    @inject(Sim)
    protected sim!: Sim;

    draw() {
        const tileWidth = this.canvas.width / 100
        const tileHeight = this.canvas.height / 100

        this.sim.forEach((tile, x, y) => {
            if (tile.entity === null) {
                return
            }

            if (tile.entity === null) {
                return
            }

            switch (tile.entity.id) {
                case "plant":
                    // fill square
                    this.context.fillStyle = "green";
                    this.context.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
                    break;
                case "eater":
                    // fill circle
                    this.context.fillStyle = "orange";
                    this.context.beginPath();
                    this.context.arc(x * tileWidth + tileWidth / 2, y * tileHeight + tileHeight / 2, tileWidth / 2, 0, 2 * Math.PI);
                    this.context.fill();
                    if (tile.entity instanceof Eater) {
                        switch (tile.entity.direction) {
                            case 0:
                                this.context.fillStyle = "black"
                                this.context.beginPath();
                                this.context.moveTo(x * tileWidth + tileWidth / 2, y * tileWidth + tileWidth / 2);
                                this.context.lineTo(x * tileWidth + tileWidth / 2, y * tileWidth);
                                this.context.stroke();
                                break
                            case 1:
                                this.context.fillStyle = "black"
                                this.context.beginPath();
                                this.context.moveTo(x * tileWidth + tileWidth / 2, y * tileWidth + tileWidth / 2);
                                this.context.lineTo(x * tileWidth + tileWidth, y * tileWidth + tileWidth / 2);
                                this.context.stroke();
                                break
                            case 2:
                                this.context.fillStyle = "black"
                                this.context.beginPath();
                                this.context.moveTo(x * tileWidth + tileWidth / 2, y * tileWidth + tileWidth / 2);
                                this.context.lineTo(x * tileWidth + tileWidth / 2, y * tileWidth + tileWidth);
                                this.context.stroke();
                                break
                            case 3:
                                this.context.fillStyle = "black"
                                this.context.beginPath();
                                this.context.moveTo(x * tileWidth + tileWidth / 2, y * tileWidth + tileWidth / 2);
                                this.context.lineTo(x * tileWidth, y * tileWidth + tileWidth / 2);
                                this.context.stroke();
                                break
                        }
                    }
                    break;
                case "meater":
                    // fill circle
                    this.context.fillStyle = "magenta";
                    this.context.beginPath();
                    this.context.arc(x * tileWidth + tileWidth / 2, y * tileHeight + tileHeight / 2, tileWidth / 2, 0, 2 * Math.PI);
                    this.context.fill();
                    if (tile.entity instanceof Meater) {
                        switch (tile.entity.direction) {
                            case 0:
                                this.context.fillStyle = "white"
                                this.context.beginPath();
                                this.context.moveTo(x * tileWidth + tileWidth / 2, y * tileWidth + tileWidth / 2);
                                this.context.lineTo(x * tileWidth + tileWidth / 2, y * tileWidth);
                                this.context.stroke();
                                break
                            case 1:
                                this.context.fillStyle = "white"
                                this.context.beginPath();
                                this.context.moveTo(x * tileWidth + tileWidth / 2, y * tileWidth + tileWidth / 2);
                                this.context.lineTo(x * tileWidth + tileWidth, y * tileWidth + tileWidth / 2);
                                this.context.stroke();
                                break
                            case 2:
                                this.context.fillStyle = "white"
                                this.context.beginPath();
                                this.context.moveTo(x * tileWidth + tileWidth / 2, y * tileWidth + tileWidth / 2);
                                this.context.lineTo(x * tileWidth + tileWidth / 2, y * tileWidth + tileWidth);
                                this.context.stroke();
                                break
                            case 3:
                                this.context.fillStyle = "white"
                                this.context.beginPath();
                                this.context.moveTo(x * tileWidth + tileWidth / 2, y * tileWidth + tileWidth / 2);
                                this.context.lineTo(x * tileWidth, y * tileWidth + tileWidth / 2);
                                this.context.stroke();
                                break
                        }
                    }
                    break;
            }
        })
    }
}