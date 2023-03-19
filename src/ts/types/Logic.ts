import { ACITONS, ActionValue, ENTITIES, EntityName, ENTITY_NAMES } from "../consts";
import { randomAction } from "../utils";

export class Logic {
    brain: Record<EntityName, ActionValue>;

    constructor() {
        this.brain = {
            [ENTITIES.empty]: ACITONS.forward,
            [ENTITIES.edge]: ACITONS.right,
            [ENTITIES.plant]: ACITONS.forward,
            [ENTITIES.eater]: ACITONS.around
        }
    }

    randomize() {
        for (let entity_name of ENTITY_NAMES) {
            this.brain[entity_name] = randomAction()
        }
    }

    getAction(entity_name: EntityName) {
        return this.brain[entity_name]
    }

}