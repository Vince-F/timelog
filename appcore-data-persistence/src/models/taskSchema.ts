import sequelize = require("sequelize");

export class TaskSchema {

    static createDatabaseModel(dbInstance:sequelize.Sequelize) {
        return dbInstance.define('task', {
            id: {
                type: sequelize.UUIDV4,
                primaryKey: true
            },
            name: {
                type: sequelize.STRING,
            },
            done: {
                type: sequelize.BOOLEAN
            }
        });
    }
}