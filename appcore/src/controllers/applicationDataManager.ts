import { ITaskManager } from "./iTaskManager";
import { ITimeLogManager } from "./iTimeLogManager";
import { ISettingsManager } from "./iSettingsManager";

export abstract class ApplicationDataManager {
    protected taskDtMgr:ITaskManager;
    protected timeLogDtMgr: ITimeLogManager;
    protected settingsManager: ISettingsManager;

    constructor(taskDtMgr: ITaskManager, timeLogDtMgr:ITimeLogManager, settingsManager:ISettingsManager) {
        this.taskDtMgr = taskDtMgr;
        this.timeLogDtMgr = timeLogDtMgr;
        this.settingsManager = settingsManager;
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