
export function createDatabaseInstanceOptions(dataFilePath:string) {
    return {
        host: 'localhost',
        dialect: 'sqlite',

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },

        // SQLite only
        storage: dataFilePath,
    };
}