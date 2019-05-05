import {ApplicationDataManager, ITaskManager, ITimeLogManager, ISettingsManager, Task, TimeLog, Settings} from "timelog-appcore";

export const environment = {
    production: false,
    mobileApp: false,
    isTestEnvironment: true,
    initTestEnvironment: () => {
        let taskMgr = new InMemoryTaskManager();
        let timeLogMgr = new InMemoryTimeLogManager(taskMgr);
        let settingsMgr = new InMemorySettingsManager();
        window.appDataManagerInstance = new TestApplicationDataManager(taskMgr, timeLogMgr, settingsMgr);
    }
  };

class TestApplicationDataManager {
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

class InMemoryTaskManager implements ITaskManager {
    memoryStorage: Map<String, Task>;

    constructor() {
        this.memoryStorage = new Map();
    }

    add(newTask: Task): Promise<Task> {
        let id = ""; // generate ID
        newTask.id = id;
        this.memoryStorage.set(id, newTask);
        return Promise.resolve(newTask);
    }

    retrieve(id: string): Promise<Task> {
        return Promise.resolve(this.memoryStorage.get(id));
    }

    retrieveAll(filter?:{[key:string]:any}): Promise<Array<Task>> {
        let result = [];
        this.memoryStorage.forEach((task) => {
            let toAdd = true;
            for (let key in filter) {
                if (filter[key] !== task[key]) {
                    toAdd = false;
                }
            }
            if(toAdd) {
                result.push(task);
            }
        });
        return Promise.resolve(result);
    }

    update(id: string, taskData: Task): Promise<Task> {
        this.memoryStorage.set(id, taskData);
        return Promise.resolve(taskData);
    }
}

class InMemoryTimeLogManager implements ITimeLogManager {
    taskManager:ITaskManager;
    memoryStorage: Map<String, TimeLog>;

    constructor(taskManager: InMemoryTaskManager) {
        this.taskManager = taskManager;
        this.memoryStorage= new Map();
    }

    async add(newTimeLog:TimeLog):Promise<TimeLog> {
        let task = await this.taskManager.retrieve(newTimeLog.taskId);
        if(task) {
            let id = "";
            newTimeLog.id = id;
            this.memoryStorage.set(id, newTimeLog);
            return newTimeLog;
        } else {    
            throw "Task doesn't exist";
        }
    }
    
    retrieve(id:string):Promise<TimeLog> {
        return Promise.resolve(this.memoryStorage.get(id));
    }

    retrieveAll(filter?:{[key:string]:any}):Promise<Array<TimeLog>> {
        let result = [];
        this.memoryStorage.forEach((timeLog) => {
            let toAdd = true;
            for (let key in filter) {
                if (filter[key] !== timeLog[key]) {
                    toAdd = false;
                }
            }
            if(toAdd) {
                result.push(timeLog);
            }
        });
        return Promise.resolve(result);
    }

    update(id:string,timeLogData:TimeLog):Promise<TimeLog> {
        this.memoryStorage.set(id, timeLogData);
        return Promise.resolve(timeLogData);
    }

    delete(id:string):Promise<void> {
        if (this.memoryStorage.has(id)) {
            this.memoryStorage.delete(id);
            return Promise.resolve();
        } else {
            return Promise.reject("TimeLog doesn't exist");
        }
    }
}

class InMemorySettingsManager implements ISettingsManager {
    settings: Settings;

    constructor() {
        this.settings = {
            userId: "0",
            doneRequiresTimelog: false,
            allowUndone: false
        };
    }

    retrieveOrCreate(userId: string): Promise<Settings> {
        return Promise.resolve(this.settings);
    }

    update(userId: string, settings: Settings): Promise<Settings> {
        this.settings = settings;
        return Promise.resolve(settings);
    }
}