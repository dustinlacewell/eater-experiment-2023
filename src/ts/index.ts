import "reflect-metadata"

import { Container } from "inversify";

import { UPDATE_DELAY } from "./consts";
import * as services from "./services";
import * as consts from "./consts";
import { tokens } from "./tokens";
import { buildProviderModule } from "inversify-binding-decorators";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

console.log(canvas)
console.log(context)

const container = new Container();
container.bind(tokens.Canvas).toConstantValue(canvas);
container.bind(tokens.Context).toConstantValue(context);
container.load(buildProviderModule());

for (const [key, val] of Object.entries(consts)) {
  console.log(`Binding ${key} to ${val}`);
  container.bind(Symbol.for(key)).toConstantValue(val);
}

const app = container.get(services.App);

const update = () => {
  app.update();
  setTimeout(update, UPDATE_DELAY);
};
setTimeout(update, UPDATE_DELAY);

const draw = () => {
  app.draw();
  requestAnimationFrame(draw);
};
requestAnimationFrame(draw);
