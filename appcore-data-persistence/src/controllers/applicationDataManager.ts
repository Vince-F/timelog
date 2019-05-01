import { TaskManager } from "./taskManager";
import { TimeLogManager } from "./timeLogManager";
import sequelize = require("sequelize");
import { SettingsManager } from "./settingsManager";

export class ApplicationDataManager {
    private taskDtMgr:TaskManager;
    private timeLogDtMgr: TimeLogManager;
    private settingsManager: SettingsManager;

    constructor(dbInstance: sequelize.Sequelize) {
        this.taskDtMgr = new TaskManager(dbInstance);
        this.timeLogDtMgr = new TimeLogManager(dbInstance, this.taskDtMgr);
        this.settingsManager = new SettingsManager(dbInstance);
    }

    createTables() {
        return Promise.all([this.taskDtMgr.createTableIfNotExist(), this.timeLogDtMgr.createTableIfNotExist(), this.settingsManager.createTableIfNotExist()])
    }

    dropTables() {
        return Promise.all([this.taskDtMgr.dropTable(), this.timeLogDtMgr.dropTable()]);
    }

    getTaskDataManager() {
        return this.taskDtMgr;
    }

    getTimeLogDataManager() {
        return this.timeLogDtMgr;
    }

    getSettingsManager() {
        return this.settingsManager;
    }
}