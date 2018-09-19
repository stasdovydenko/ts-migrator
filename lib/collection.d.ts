export interface IMigratorCollectionParams {
    name: string;
    schema?: Object;
    items?: Object[];
}
export declare function Collection(params: IMigratorCollectionParams): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        name: string;
        schema: Object;
        items: Object[];
    };
} & T;
