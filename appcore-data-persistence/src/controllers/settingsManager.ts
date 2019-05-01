import { Settings, ISettingsManager } from "timelog-appcore";
import { SettingsSchema } from "../models/settingsSchema";
import sequelize = require("sequelize");

export class SettingsManager implements ISettingsManager {
    dbModel: sequelize.Model<any, any>;

    constructor(dbInstance: sequelize.Sequelize) {
        this.dbModel = SettingsSchema.createDatabaseModel(dbInstance);
    }

    createTableIfNotExist() {
        return Promise.resolve(this.dbModel.sync());
    }

    dropTable() {
        return Promise.resolve(this.dbModel.drop());
    }

    retrieveOrCreate(userId: string): Promise<Settings> {
        let defaultSettings: Settings = {
            userId: userId,
            doneRequiresTimelog: false,
            allowUndone: false
        };
        return Promise.resolve(this.dbModel.findOrCreate({ where: { userId: userId }, defaults: defaultSettings })
            .then(([settings]) => {
                return settings.dataValues;
            })
        );
    }

    update(userId: string, settings: Settings): Promise<Settings> {
        return Promise.resolve(
            this.dbModel.update(settings, { where: { userId: userId } })
                .then(() => {
                    return settings;
                }));
    }
}