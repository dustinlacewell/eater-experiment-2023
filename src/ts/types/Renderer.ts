import { Sim } from "./Sim"
import { Eater } from "./entities/Eater"

export class Renderer {
    c: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    sim: Sim;

    constructor(c: HTMLCanvasElement, ctx: CanvasRenderingContext2D, sim: Sim) {
        this.c = c
        this.ctx = ctx
        this.sim = sim
    }

    draw() {
        const tileWidth = this.c.width / this.sim.n
        const tileHeight = this.c.height / this.sim.m

        this.sim.forEach((tile, x, y) => {
            if (tile.entity === null) {
                return
            }

            if (tile.entity === null) {
                return
            }

            switch (tile.entity.getId()) {
                case "plant":
                    // fill square
                    this.ctx.fillStyle = "green";
                    this.ctx.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
                    break;
                case "eater":
                    // fill circle
                    this.ctx.fillStyle = "orange";
                    this.ctx.beginPath();
                    this.ctx.arc(x * tileWidth + tileWidth / 2, y * tileHeight + tileHeight / 2, tileWidth / 2, 0, 2 * Math.PI);
                    this.ctx.fill();
                    if (tile.entity instanceof Eater) {
                        switch (tile.entity.direction) {
                            case 0:
                                this.ctx.fillStyle = "black"
                                this.ctx.beginPath();
                                this.ctx.moveTo(x * tileWidth + tileWidth / 2, y * tileWidth + tileWidth / 2);
                                this.ctx.lineTo(x * tileWidth + tileWidth / 2, y * tileWidth);
                                this.ctx.stroke();
                                break
                            case 1:
                                this.ctx.fillStyle = "black"
                                this.ctx.beginPath();
                                this.ctx.moveTo(x * tileWidth + tileWidth / 2, y * tileWidth + tileWidth / 2);
                                this.ctx.lineTo(x * tileWidth + tileWidth, y * tileWidth + tileWidth / 2);
                                this.ctx.stroke();
                                break
                            case 2:
                                this.ctx.fillStyle = "black"
                                this.ctx.beginPath();
                                this.ctx.moveTo(x * tileWidth + tileWidth / 2, y * tileWidth + tileWidth / 2);
                                this.ctx.lineTo(x * tileWidth + tileWidth / 2, y * tileWidth + tileWidth);
                                this.ctx.stroke();
                                break
                            case 3:
                                this.ctx.fillStyle = "black"
                                this.ctx.beginPath();
                                this.ctx.moveTo(x * tileWidth + tileWidth / 2, y * tileWidth + tileWidth / 2);
                                this.ctx.lineTo(x * tileWidth, y * tileWidth + tileWidth / 2);
                                this.ctx.stroke();
                                break
                        }
                    }
                    break;
            }
        })
    }
}