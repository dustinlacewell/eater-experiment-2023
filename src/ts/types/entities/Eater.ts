import { DirectionValue, DIRECTION_VALUES, EATER_BRAINS, ENTITIES } from "../../consts";
import { Logic } from "../Logic";
import { Sim } from "../Sim";
import { Entity } from "./Entity";


export class Eater extends Entity {
    direction: DirectionValue;
    logic: Logic;
    score: number;

    constructor(sim: Sim, x: number, y: number) {
        super(sim, x, y)
        this.direction = DIRECTION_VALUES[Math.floor(Math.random() * 4)]
        this.logic = new Logic(EATER_BRAINS)
        //this.logic.randomize()
        this.score = 0
    }

    getId() {
        return ENTITIES.eater
    }

    update() {
        const tileLookingAt = this.getTileLookingAt()
        const entityLookingAt = this.getEntityLookingAt()

        let action = this.logic.makeDecision(entityLookingAt)

        switch (action) {
            case "forward":
                if (entityLookingAt === ENTITIES.plant) {
                    this.score++
                }

                // move forward
                if (tileLookingAt !== undefined) {
                    this.sim.killEntity(this.x, this.y)
                    this.sim.killEntity(tileLookingAt.x, tileLookingAt.y)
                    this.sim.addEntity(tileLookingAt.x, tileLookingAt.y, this)
                }

                break
            case "turn right":
                // turn right
                this.turn(1)
                break
            case "turn left":
                this.turn(-1)
                break
            case "turn around":
                this.turn(2);
                break
            case "wait":
                break
        }
    }

    turn(a: number) {
        this.direction += a
        if (this.direction < 0) {
            this.direction += 4
        }
        if (this.direction > 3) {
            this.direction -= 4
        }
    }

    getTileLookingAt() {
        switch (this.direction) {
            case 0: // up
                return this.sim.getTile(this.x, this.y - 1)
            case 1: // right
                return this.sim.getTile(this.x + 1, this.y)
            case 2: // down
                return this.sim.getTile(this.x, this.y + 1)
            case 3: // left
                return this.sim.getTile(this.x - 1, this.y)
        }
    }

    getEntityLookingAt() {
        const tile = this.getTileLookingAt()
        return tile === undefined ? ENTITIES.edge : tile.entity === null ? ENTITIES.empty : tile.entity.getId()
    }
}
