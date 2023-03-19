import { EntityValue, ENTITIES } from "../../consts";
import { Sim } from "../Sim";

export class Entity {
    sim: Sim;
    x: number;
    y: number;

    constructor(sim: Sim, x: number, y: number) {
        this.sim = sim
        this.x = x
        this.y = y
    }

    getId(): EntityValue { return ENTITIES.edge }
    update() { }
}