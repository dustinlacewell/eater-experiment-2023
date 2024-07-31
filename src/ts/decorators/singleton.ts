import { fluentProvide } from "inversify-binding-decorators";


export function singleton(identifier?: any) {
    return function (target: any) {
        if (identifier) {
            return fluentProvide(identifier).inSingletonScope().done()(target);
        } else {
            return fluentProvide(target).inSingletonScope().done()(target);
        }
    };
}