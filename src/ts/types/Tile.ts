import { Entity } from "../services/Sim/entities/Entity";

export class Tile {
    x: number;
    y: number;
    entity: Entity | null;

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.entity = null
    }
}
