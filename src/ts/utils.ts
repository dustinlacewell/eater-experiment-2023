import { ACTION_VALUES } from "./consts";


export const randomAction = () => {
    const index = Math.floor(Math.random() * ACTION_VALUES.length);
    return ACTION_VALUES[index];
}