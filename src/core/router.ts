
import { Injector } from '../di';

export class TypespringRouter {
    private _app: any;
    private _refs: any[];

    constructor(app, refs: any[]) {
        this._app = app;
        this._refs = refs;
    }

    init() {
        console.log('INIT ROUTER');
        if (!this._app || !this._refs || !this._refs.length) {
            console.warn('Router is not initialized!');
            return;
        }
        const instances = TypespringRouter.getInstances(this._refs);
        instances.forEach(instance => {
            const rc: any = instance['__controller'] ? instance : undefined;
            if (!rc) return;
            const controllers = rc['__controllers'];
            if (!controllers.length) return;
            controllers.forEach(c => {
                this._app.use(`/api${rc['__baseUrl']}`, rc[c](rc['__middleware']));
            });
        });
    }

    static getInstances(refs): any[] {
        return refs.map(c => {
            let tokens = Reflect.getMetadata('design:paramtypes', c) || [];
            let injections = tokens.map(token => Injector.resolve<any>(token));
            return new c(...injections);
        });
    }
}

