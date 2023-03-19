import { ACTIONS, ActionValue, EATER_BRAINS, ENTITIES, EntityName, ENTITY_NAMES } from "../consts";
import { randomAction } from "../utils";

export type Decision = readonly [ActionValue, number]

function createDecision(maxBrains: number) {
    return [randomAction(), Math.floor(Math.random() * maxBrains)] as const
}

export type Brain = Record<EntityName, Decision>

function createBrain(maxBrains: number) {
    const brain: Partial<Brain> = {}
    for (let entity_name of ENTITY_NAMES) {
        brain[entity_name] = createDecision(maxBrains)
    }
    return brain as Brain
}

function mergeDecisions(brain1: Brain, brain2: Brain, maxBrains: number) {
    const mergedBrain: Partial<Brain> = {}
    const randomIndex = Math.floor(Math.random() * ENTITY_NAMES.length)
    for (let i = 0; i < ENTITY_NAMES.length; i++) {
        let entity_name = ENTITY_NAMES[i]
        if (i < randomIndex) {
            mergedBrain[entity_name] = brain1[entity_name]
        } else {
            mergedBrain[entity_name] = brain2[entity_name]
        }
    }
    return mergedBrain as Brain
}

function mergeBrains(mom: Array<Brain>, dad: Array<Brain>, maxBrains: number) {
    const mergedBrains: Array<Brain> = []
    for (let i = 0; i < maxBrains; i++) {
        const mergedBrain = mergeDecisions(mom[i], dad[i], maxBrains)
        mergedBrains.push(mergedBrain)
    }
    return mergedBrains
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



