
export const SIM_SIZE = 100;
export const UPDATE_DELAY = 50; // ms

export const PLANT_DENSITY = 0.1;
export const EATER_DENSITY = 0.025;

export const DIRECTIONS = {
    up: 0,
    right: 1,
    down: 2,
    left: 3
} as const

export type Directions = typeof DIRECTIONS;
export type DirectionName = keyof Directions;
export type DirectionValue = Directions[DirectionName];

export const DIRECTION_NAMES = Object.keys(DIRECTIONS) as DirectionName[];
export const DIRECTION_VALUES = Object.values(DIRECTIONS) as DirectionValue[];

export const ENTITIES = {
    empty: "empty",
    edge: "edge",
    plant: "plant",
    eater: "eater"
} as const

export type Entities = typeof ENTITIES;
export type EntityName = keyof Entities;
export type EntityValue = Entities[EntityName];

export const ENTITY_NAMES = Object.keys(ENTITIES) as EntityName[];
export const ENTITY_VALUES = Object.values(ENTITIES) as EntityValue[];

export const ACTIONS = {
    forward: "forward",
    right: "turn right",
    left: "turn left",
    around: "turn around",
    wait: "wait"
} as const

export type Actions = typeof ACTIONS;
export type ActionName = keyof Actions;
export type ActionValue = Actions[ActionName];

export const ACTION_NAMES = Object.keys(ACTIONS) as ActionName[];
export const ACTION_VALUES = Object.values(ACTIONS) as ActionValue[];

export const EATER_BRAINS = 8