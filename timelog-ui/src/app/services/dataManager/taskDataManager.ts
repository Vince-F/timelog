import { Injectable } from "@angular/core";
import { ITaskManager } from "timelog-appcore";
import { Task } from "timelog-appcore";

@Injectable()
export class TaskDataManager {
    instance: ITaskManager;

    constructor() {
        this.instance = window.appDataManagerInstance.getTaskDataManager();
    }

    create(data:Task) {
        return this.instance.add(data);
    }

    retrieve(id:string) {
        return this.instance.retrieve(id);
    }

    retrieveAll() {
        return this.instance.retrieveAll();
    }

    update(id:string, newData:Task) {
        return this.instance.update(id,newData);
    }
}