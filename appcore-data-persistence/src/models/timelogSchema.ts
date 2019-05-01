import sequelize = require("sequelize");

export class TimeLogSchema {

    static createDatabaseModel(dbInstance:sequelize.Sequelize) {
        return dbInstance.define('timelog', {
            id: {
                type: sequelize.UUIDV4,
                primaryKey: true
            },
            taskId: {
                type: sequelize.UUIDV4,
            },
            duration: {
                type: sequelize.INTEGER
            },
            date: {
                type: sequelize.DATE
            }
        });
    }
}