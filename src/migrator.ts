import { MongoClient } from 'mongodb';

export interface IMigratorParams {
    mongoUrl: string;
    dbName: string;
    collections: any[];
}

export function Migrator(params: IMigratorParams) {
    return <T extends { new(...args: any[]): {} }>(constructor: T) => {
        return class extends constructor implements IMigratorParams {
            mongoUrl = params.mongoUrl;
            dbName = params.dbName;
            collections = params.collections;
            mongoClient;
            run = async (): Promise<void> => {
                console.log('Migrations initiated');
                console.log(`Connecting to Mongo server ${this.mongoUrl}`);
                this.mongoClient = await this.connect();
                await this.clearDatabase();
                if (!this.collections || !this.collections.length) {
                    console.log(`Collections not found`);
                    return;
                }
                const migrations = [];
                for (const c of this.collections) {
                    migrations.push(this.migrate(new c()));
                }
                try {
                    await Promise.all(migrations);
                } catch (e) {
                    console.error(e);
                    this.disconnect();
                    return;
                }
                console.log('Migrations completed');
                this.disconnect();
            }

            connect = (): Promise<MongoClient> => {
                return MongoClient.connect(this.mongoUrl, { useNewUrlParser: true });
            }

            clearDatabase = async (): Promise<void> => {
                try {
                    console.log('Erase database');
                    await this.mongoClient.db(this.dbName).dropDatabase();
                } catch (e) {
                    console.error(e);
                }
            }

            migrate = (c): Promise<void> => {
                return new Promise(async (resolve, reject) => {
                    try {
                        console.log(`Migrating collection ${c.name}...`);
                        const db = this.mongoClient.db(this.dbName);
                        const options = {};
                        if (c.schema) {
                            options['validator'] = {
                                $jsonSchema: c.schema,
                            };
                            options['validationLevel'] = 'strict';
                        }
                        await db.createCollection(c.name, options);
                        if (c.items && c.items.length) {
                            await db.collection(c.name).insertMany(c.items);
                        }
                        if (c.indexes && c.indexes.length) {
                            await db.runCommand({
                                createIndexes: c.name,
                                indexes: c.indexes,
                            });
                        }
                        resolve();
                    } catch (e) {
                        reject(e);
                    }
                });
            }

            disconnect = (): void => {
                this.mongoClient.close();
                console.log('Disconnected from database');
            }
        };
    };
}