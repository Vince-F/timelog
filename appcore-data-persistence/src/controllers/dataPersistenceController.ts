import sequelize = require("sequelize");


export class DataPersistenceController {
    dbInstance: sequelize.Sequelize;

    constructor(pathToDbFile:string) {
        this.dbInstance = new sequelize({
            dialect: 'sqlite',
            storage: pathToDbFile
        });
    }

    connect() {
        return Promise.resolve(this.dbInstance.authenticate());
    }
}