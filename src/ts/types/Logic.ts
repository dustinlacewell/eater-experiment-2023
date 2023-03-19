import { ACTIONS, ActionValue, ENTITIES, EntityName, ENTITY_NAMES } from "../consts";
import { randomAction } from "../utils";

export class Logic {
    brain: Record<EntityName, ActionValue>;

    constructor() {
        this.brain = {
            [ENTITIES.empty]: ACTIONS.forward,
            [ENTITIES.edge]: ACTIONS.right,
            [ENTITIES.plant]: ACTIONS.forward,
            [ENTITIES.eater]: ACTIONS.left
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