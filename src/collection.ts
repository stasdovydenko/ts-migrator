export interface IMigratorCollectionParams {
    name: string;
    schema?: Object;
    items?: Object[];
}

export function Collection(params: IMigratorCollectionParams) {
    return <T extends { new(...args: any[]): {} }>(constructor: T) => {
        return class extends constructor {
            name = params.name;
            schema = params.schema;
            items = params.items;
        };
    };
}