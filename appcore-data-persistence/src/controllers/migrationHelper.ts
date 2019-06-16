import path = require("path");
import fs = require("fs");
import sequelize = require("sequelize");
const umzug = require("umzug"); // I cannot use import because I think it is using Seq V5 typings
import { DataPersistenceController } from "./dataPersistenceController";

export class MigrationHelper {
    dbCtrl: DataPersistenceController;

    constructor(dbCtrl: DataPersistenceController) {
        this.dbCtrl = dbCtrl;
    }

    runMigration() {
        console.log("debug ",__dirname);
        this.completeUselessMigrations();
        const umzugInst = new umzug({
            storage: "sequelize",

            storageOptions: {
                sequelize: this.dbCtrl.dbInstance as sequelize.Sequelize
            },

            migrations: {
                params: [
                    this.dbCtrl.dbInstance.getQueryInterface(),
                    sequelize
                ],
                path: path.join(__dirname, "../db/migrations")
            }
        });

        return umzugInst.up();
    }

    completeUselessMigrations() {

    }
}