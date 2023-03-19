import { ACTIONS, ActionValue, EATER_BRAINS, ENTITIES, EntityName, ENTITY_NAMES } from "../consts";
import { randomAction } from "../utils";

export type Decision = readonly [ActionValue, number]

function createDecision(maxBrains: number) {
    return [randomAction(), Math.floor(Math.random() * maxBrains)] as const
}

export type Brain = Record<EntityName, Decision>

function createBrain(maxBrains: number) {
    return ({
    [ENTITIES.empty]: createDecision(maxBrains),
    [ENTITIES.edge]: createDecision(maxBrains),
    [ENTITIES.plant]: createDecision(maxBrains),
    [ENTITIES.eater]: createDecision(maxBrains)
    })
}


export class Logic {
    brains: Array<Brain>
    brain: number
    constructor(maxBrains: number) {
        this.brains = []
        for (let i = 0; i < maxBrains; i++) {
            this.brains.push(createBrain(maxBrains))
        }
        this.brain = 0
    }

    makeDecision(entity_name: EntityName) {
        const [action, nextBrain] = this.getDecision(entity_name)
        this.brain = nextBrain
        return action
    }

    getDecision(entity_name: EntityName) {
        return this.brains[this.brain][entity_name]
    }

}



