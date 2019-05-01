import sequelize = require("sequelize");

export class SettingsSchema {

    static createDatabaseModel(dbInstance:sequelize.Sequelize) {
        return dbInstance.define('settings', {
            userId: {
                type: sequelize.UUIDV4,
                primaryKey: true
            },
            doneRequiresTimelog: {
                type: sequelize.BOOLEAN,
            },
            allowUndone: {
                type: sequelize.BOOLEAN
            }
        });
    }
}