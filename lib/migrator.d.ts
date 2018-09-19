export interface IMigratorParams {
    mongoUrl: string;
    dbName: string;
    collections: any[];
}
export declare function Migrator(params: IMigratorParams): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        mongoUrl: string;
        dbName: string;
        collections: any[];
        mongoClient: any;
        run: () => Promise<void>;
        connect: () => Promise<void>;
        clearDatabase: () => Promise<void>;
        migrate: (c: any) => Promise<void>;
        disconnect: () => void;
    };
} & T;
