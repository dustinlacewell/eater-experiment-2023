import { EntityValue, ENTITIES, EntityName } from "../../../consts";
import { Sim } from "../Sim";

export class Entity {
    sim: Sim;
    x: number;
    y: number;
    id: EntityName = ENTITIES.edge;

    constructor(sim: Sim, x: number, y: number) {
        this.sim = sim
        this.x = x
        this.y = y
    }

    update() { }
}