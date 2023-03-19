import { ENTITIES } from "../../consts";
import { Entity } from "./Entity";


export class Plant extends Entity {
    getId() {
        return ENTITIES.plant
    }
}
