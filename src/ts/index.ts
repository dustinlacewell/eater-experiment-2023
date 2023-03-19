import { SIM_SIZE, UPDATE_DELAY } from "./consts";
import { Renderer } from "./types/Renderer";
import { Sim } from "./types/Sim";

const c = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = c.getContext("2d") as CanvasRenderingContext2D;

const sim = new Sim(SIM_SIZE);
const renderer = new Renderer(c, ctx, sim);

const update = () => {
  setTimeout(update, UPDATE_DELAY);
};
setTimeout(update, UPDATE_DELAY);

const draw = () => {
  ctx.clearRect(0, 0, c.width, c.height);
  renderer.draw();
  requestAnimationFrame(draw);
};
requestAnimationFrame(draw);
