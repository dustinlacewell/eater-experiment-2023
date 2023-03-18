var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

const SIM_SIZE = 100;
const UPDATE_DELAY = 100; // ms

const PLANT_DENSITY = 0.1;
const EATER_DENSITY = 0.025;

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

class Rect {
  constructor() {
    this.pos = new Point(0, 0)
    this.size = new Point(0, 0)
  }
}

class Tile {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.entity = undefined
  }

  update() {
    if (this.entity !== undefined) {
      this.entity.update()
    }
  }
}

class Entity {
  constructor(sim, x, y) {
    this.sim = sim
    this.x = x
    this.y = y
  }

  getId() { }
  update() { }
}

class Plant extends Entity {
  constructor(sim, x, y) {
    super(sim, x, y)
  }

  getId() {
    return "plant"
  }
}

// each update, either moves in current direction or changes direction or waits
// wont move if there is another eater in the way
class Eater extends Entity {
  constructor(sim, x, y) {
    super(sim, x, y)
    this.direction = Math.floor(Math.random() * 4)
  }

  getId() {
    return "eater"
  }

  update() {
    const tile = this.sim.tiles[this.x][this.y]
    const tileLookingAt = this.getTileLookingAt()

    const action = Math.floor(Math.random() * 3)
    switch (action) {
      case 0:
        // move
        if (tileLookingAt !== undefined && tileLookingAt.entity === undefined) {
          tileLookingAt.entity = tile.entity
          tile.entity = undefined
          this.x = tileLookingAt.x
          this.y = tileLookingAt.y
        }
        break
      case 1:
        // change direction
        this.direction = Math.floor(Math.random() * 4)
        break
      case 2:
        // wait
        break
    }
  }

  getTileLookingAt() {
    switch (this.direction) {
      case 0:
        return this.sim.getTile(this.x, this.y - 1)
      case 1:
        return this.sim.getTile(this.x + 1, this.y)
      case 2:
        return this.sim.getTile(this.x, this.y + 1)
      case 3:
        return this.sim.getTile(this.x - 1, this.y)
    }
  }
}

class Sim {
  constructor(size) {
    this.n = size;
    this.m = size;
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

  forEach(callback) {
    for (let x = 0; x < this.n; x++) {
      for (let y = 0; y < this.m; y++) {
        callback(this.tiles[x][y], x, y);
      }
    }
  }

  clear() {
    this.forEach((tile, x, y) => {
      this.tiles[x][y].entity = undefined
    })
  }

  randomizePlants() {
    this.forEach((tile, x, y) => {
      if (Math.random() < PLANT_DENSITY) {
        this.tiles[x][y].entity = new Plant(this, x, y);
      }
    })
  }

  randomizeEaters() {
    this.forEach((tile, x, y) => {
      if (Math.random() < EATER_DENSITY) {
        this.tiles[x][y].entity = new Eater(this, x, y);
      }
    })
  }

  update() {
    this.forEach((tile, x, y) => {
      tile.update()
    })
  }

  getTile(x, y) {
    const col = this.tiles[x]
    if (col === undefined) {
      return undefined
    }

    return col[y]
  }
}

class Renderer {
  constructor(sim) {
    this.sim = sim
  }

  draw() {
    const tileWidth = c.width / this.sim.n
    const tileHeight = c.height / this.sim.m

    this.sim.forEach((tile, x, y) => {
      if (tile.entity === undefined) {
        return
      }

      switch (tile.entity.getId()) {
        case "plant":
          // fill square
          ctx.fillStyle = "green";
          ctx.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
          break;
        case "eater":
          // fill circle
          ctx.fillStyle = "orange";
          ctx.beginPath();
          ctx.arc(x * tileWidth + tileWidth / 2, y * tileHeight + tileHeight / 2, tileWidth / 2, 0, 2 * Math.PI);
          ctx.fill();
          break;
      }
    })
  }
}

const sim = new Sim(SIM_SIZE);
const renderer = new Renderer(sim);

const update = () => {
  sim.update();
  setTimeout(update, UPDATE_DELAY);
};
setTimeout(update, UPDATE_DELAY);

const draw = () => {
  ctx.clearRect(0, 0, c.width, c.height);
  renderer.draw();
  requestAnimationFrame(draw);
};
requestAnimationFrame(draw);
