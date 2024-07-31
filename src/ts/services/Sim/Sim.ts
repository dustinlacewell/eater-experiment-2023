import { PLANT_DENSITY, POP_SIZE, ENTITIES, EATER_BRAINS, ROUND_TURNS, SIM_SIZE } from "../../consts";
import { singleton } from "../../decorators";
import { Eater } from "./entities/Eater";
import { Entity } from "./entities/Entity";
import { Meater } from "./entities/Meater";
import { Plant } from "./entities/Plant";
import { Brain, mergeBrains } from "../../types/Logic";
import { Tile } from "../../types/Tile";
import { inject, postConstruct } from "inversify";
import { tokens } from "../../tokens";

@singleton()
export class Sim {
    n!: number;
    m!: number;
    entities!: Entity[];
    tiles!: Tile[][];
    round!: number
    generation!: number

    @inject(tokens.SIM_SIZE)
    protected size!: number;

    @postConstruct()
    init() {
        this.round = 0
        this.generation = 0
        this.entities = [];

        this.tiles = new Array(this.size);
        for (let x = 0; x < this.size; x++) {
            this.tiles[x] = new Array(this.size);
            for (let y = 0; y < this.size; y++) {
                this.tiles[x][y] = new Tile(x, y);
            }
        }
        this.randomizePlants();
        this.randomizeEaters();
        this.randomizeMeaters();
    }

    get eaters() {
        return this.entities.filter((e) => e.id === ENTITIES.eater) as Eater[]
    }

    get meaters() {
        return this.entities.filter((e) => e.id === ENTITIES.meater) as Meater[]
    }

    get plants() {
        return this.entities.filter((e) => e.id === ENTITIES.plant) as Plant[]
    }

    getTile(x: number, y: number) {
        const col = this.tiles[x]

        if (col === undefined) {
            return undefined
        }

        return col[y]
    }

    addEntity(x: number, y: number, entity: Entity) {
        this.entities.push(entity);
        const tile = this.getTile(x, y);
        if (tile) {
            if (tile.entity) {
                this.killEntity(x, y)
            }
            tile.entity = entity;
        }

        entity.x = x
        entity.y = y
    }

    getEntity(x: number, y: number) {
        const tile = this.getTile(x, y);
        if (tile) {
            if (tile.entity) {
                return tile.entity
            }
            return ENTITIES.empty
        }

        return ENTITIES.edge
    }

    killEntity(x: number, y: number) {
        const tile = this.getTile(x, y);

        if (tile === undefined) {
            return
        }

        if (tile.entity === null) {
            return
        }

        // remove from entities
        this.entities = this.entities.filter((e) => e !== tile.entity)
        // remove from tiles
        tile.entity = null
    }

    forEach(callback: (tile: Tile, x: number, y: number) => void) {
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                callback(this.tiles[x][y], x, y);
            }
        }
    }

    clear() {
        this.entities = [];
        this.forEach((tile) => {
            tile.entity = null
        })
    }

    randomizePlants() {
        this.forEach((tile, x, y) => {
            if (Math.random() < PLANT_DENSITY) {
                this.addEntity(x, y, new Plant(this, x, y))
            }
        })
    }

    randomizeEaters() {
        for (let i = 0; i < POP_SIZE; i++) {
            let c = 0;
            while (c++ < 100) {
                const x = Math.floor(Math.random() * this.size)
                const y = Math.floor(Math.random() * this.size)
                const tile = this.getTile(x, y)

                if (tile?.entity === null) {
                    this.addEntity(x, y, new Eater(this, x, y))
                    break
                }
            }
        }
    }

    randomizeMeaters() {
        for (let i = 0; i < POP_SIZE * 0.1; i++) {
            let c = 0;
            while (c++ < 100) {
                let x = Math.floor(Math.random() * this.size)
                let y = Math.floor(Math.random() * this.size)
                const tile = this.getTile(x, y)

                if (tile?.entity === null) {
                    this.addEntity(x, y, new Meater(this, x, y))
                    break
                }
            }
        }
    }

    update() {
        if (this.round === ROUND_TURNS) {
            this.reset()
        }
        this.round++
        this.forEach((tile) => {
            if (tile.entity) {
                tile.entity.update();
            }
        })
        console.log("New Round")
    }

    // selectEater picks a random eater based on their score
    // basically weighted selection over this.eaters
    selectEater() {
        const eaters = this.eaters.sort((a, b) => b.score - a.score)
        const totalScore = eaters.reduce((acc, eater) => acc + eater.score, 0)
        let rand = Math.random() * totalScore
        for (let eater of eaters) {
            if (rand < eater.score) {
                return eater
            }
            rand -= eater.score
        }
        return eaters[0]
    }

    reset() {
        const highestEater = this.eaters.sort((a, b) => b.score - a.score)[0].score
        const highestMeater = this.meaters.sort((a, b) => b.score - a.score)[0].score

        console.log(`Eaters: ${this.eaters.length}`)
        console.log(`Highest Eater Score: ${highestEater}`)

        console.log(`Meaters: ${this.meaters.length}`)
        console.log(`Highest Meater Score: ${highestMeater}`)


        // use this.eaters
        const newEaterBrains: Array<Brain[]> = []

        for (let i = 0; i < POP_SIZE; i++) {
            const mom = this.selectEater()
            const dad = this.selectEater()
            const momBrain: Brain[] = mom.getBrains();
            const dadBrain: Brain[] = dad.getBrains();
            const newBrain: Brain[] = mergeBrains(momBrain, dadBrain, EATER_BRAINS)
            newEaterBrains.push(newBrain)
        }

        console.log(`Created ${newEaterBrains.length} new eater brains}`)

        // use this.meaters
        const newMeaterBrains: Array<Brain[]> = []

        for (let i = 0; i < POP_SIZE * 0.1; i++) {
            const mom = this.selectEater()
            const dad = this.selectEater()
            const momBrain: Brain[] = mom.getBrains();
            const dadBrain: Brain[] = dad.getBrains();
            const newBrain: Brain[] = mergeBrains(momBrain, dadBrain, EATER_BRAINS)
            newMeaterBrains.push(newBrain)
        }

        console.log(`Created ${newMeaterBrains.length} new meater brains}`)

        this.clear()
        this.randomizePlants();
        this.randomizeEaters();
        this.randomizeMeaters();

        console.log("Eaters:", this.eaters.length)
        for (let i = 0; i < POP_SIZE; i++) {
            const eater = this.eaters[i]
            const brain = newEaterBrains[i]
            eater.setBrains(brain)
        }

        console.log("Meaters:", this.meaters.length)
        for (let i = 0; i < POP_SIZE * 0.1; i++) {
            const meater = this.meaters[i]
            const brain = newMeaterBrains[i]
            meater.setBrains(brain)
        }

        this.round = 0
        this.generation++
    }
}
