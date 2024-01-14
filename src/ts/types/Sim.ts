import { PLANT_DENSITY, POP_SIZE, ENTITIES, EATER_BRAINS, MUTATION_CHANCE } from "../consts";
import { Eater } from "./entities/Eater";
import { Entity } from "./entities/Entity";
import { Plant } from "./entities/Plant";
import { Brain, mergeBrains } from "./Logic";
import { Tile } from "./Tile";

export class Sim {
    n: number;
    m: number;
    entities: Entity[];
    tiles: Tile[][];
    round: number
    generation: number

    constructor(size: number) {
        this.n = size;
        this.m = size;
        this.round = 0
        this.generation = 0
        this.entities = [];
        this.tiles = new Array(size);
        for (let x = 0; x < size; x++) {
            this.tiles[x] = new Array(size);
            for (let y = 0; y < size; y++) {
                this.tiles[x][y] = new Tile(x, y);
            }
        }
        this.randomizePlants();
        this.randomizeEaters();
    }

    get eaters() {
        return this.entities.filter((e) => e.id === ENTITIES.eater) as Eater[]
    }

    get plants() {
        return this.entities.filter((e) => e.id === ENTITIES.plant) as Plant[]
    }

    addEntity(x: number, y: number, entity: Entity) {
        this.entities.push(entity);
        this.tiles[x][y].entity = entity;
        entity.x = x
        entity.y = y
    }

    getEntity(x: number, y: number) {
        return this.tiles[x][y].entity;
    }

    killEntity(x: number, y: number) {
        let entity = this.tiles[x][y].entity;
        // remove from entities
        this.entities = this.entities.filter((e) => e !== entity)
        // remove from tiles
        this.tiles[x][y].entity = null
    }

    forEach(callback: (tile: Tile, x: number, y: number) => void) {
        for (let x = 0; x < this.n; x++) {
            for (let y = 0; y < this.m; y++) {
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
                this.addEntity(x, y, new Plant(this, x, y));
            }
        })
    }

    randomizeEaters() {
        for (let i = 0; i < POP_SIZE; i++) {
            while (true) {
                let x = Math.floor(Math.random() * this.n)
                let y = Math.floor(Math.random() * this.m)
                if (this.tiles[x][y].entity === null) {
                    this.addEntity(x, y, new Eater(this, x, y))
                    break
                } 
            }
        } 
    }

    update() {
        console.log("/1000")
        if (this.round === 1000) {
            this.reset()
        }
        this.round++
        for (let entity of this.entities) {
            entity.update();
        }
    }

    getTile(x: number, y: number) {
        const col = this.tiles[x]

        if (col === undefined) {
            return undefined
        }

        return col[y]
    }
       
    reset() {
        // use this.eaters and this.plants
        const newBrains: Array<Brain[]> = []
        let eaterWeights = []
        let scoreSum = 0;
        let highScore = 0;
        for (let i = 0; i < this.eaters.length; i++) {
            const eater = this.eaters[i]
            if (eater.score > highScore) {
                highScore = eater.score
            }
            for (let j = 0; j < eater.score; j++) {
                eaterWeights.push(i)
                scoreSum++
            }
        }
        
        for (let i = 0; i < this.eaters.length; i++) {
            const momBrain: Brain[] = this.eaters[eaterWeights[Math.floor(Math.random() * eaterWeights.length)]].getBrains()
            const dadBrain: Brain[] = this.eaters[eaterWeights[Math.floor(Math.random() * eaterWeights.length)]].getBrains()
            const newBrain: Brain[] = mergeBrains(momBrain, dadBrain, EATER_BRAINS)
            newBrains.push(newBrain)
        }
        this.clear()
        this.randomizePlants();
        this.randomizeEaters();

        for (let i = 0; i < this.eaters.length; i++) {
            const eater = this.eaters[i]
            eater.setBrains(newBrains[i])
            eater.logic.mutateBrain(8, MUTATION_CHANCE)
        }
        this.round = 0
        this.generation++
        console.log("Generation: " + this.generation)
        console.log("Average score: " + scoreSum / this.eaters.length)
        console.log("Highest score: " + highScore)
    }
}
