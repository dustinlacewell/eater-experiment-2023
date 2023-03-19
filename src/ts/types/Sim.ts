import { PLANT_DENSITY, EATER_DENSITY } from "../consts";
import { Eater } from "./entities/Eater";
import { Entity } from "./entities/Entity";
import { Plant } from "./entities/Plant";
import { Tile } from "./Tile";

export class Sim {
    n: number;
    m: number;
    entities: Entity[];
    tiles: Tile[][];

    constructor(size: number) {
        this.n = size;
        this.m = size;
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
        this.forEach((tile, x, y) => {
            if (Math.random() < EATER_DENSITY) {
                this.addEntity(x, y, new Eater(this, x, y));
            }
        })
    }

    update() {
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
}