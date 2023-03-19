import { ENTITIES } from "../../consts";
import { Entity } from "./Entity";


export class Plant extends Entity {
    id = ENTITIES.plant
    getId() {
        return this.id
    }
}
