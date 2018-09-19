import { Injector } from '../di';

export function Service() {
    console.log('INIT SERVICE');
    return (target) => {
        Injector.register(target);
    };
};