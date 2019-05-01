import { Injectable } from "@angular/core";
import { ITimeLogManager } from "timelog-appcore";
//import { appDataManagerInstance } from "timelog-appcore/lib/controllers/appDataManagerInstance";
import { TimeLog } from "timelog-appcore";

@Injectable()
export class TimelogDataManager {
    instance: ITimeLogManager;

    constructor() {
        this.instance = window.appDataManagerInstance.getTimeLogDataManager();
    }

    create(data:TimeLog) {
        return this.instance.add(data);
    }

    retrieve(id:string) {
        return this.instance.retrieve(id);
    }

    retrieveAll(filter:{[key:string]:any}) {
        return this.instance.retrieveAll(filter);
    }

    update(id:string, newData:TimeLog) {
        return this.instance.update(id,newData);
    }

    delete(id:string) {
        return this.instance.delete(id);
    }
}