import { TimeLog } from "../models/timelog";
import { ITaskManager } from "./iTaskManager";
import { TimeLogErrors } from "../errors/timeLogErrors";

export interface ITimeLogManager {
    taskManager:ITaskManager;

    add(newTimeLog:TimeLog):Promise<TimeLog>;
    retrieve(id:string):Promise<TimeLog>;
    retrieveAll(filter?:{[key:string]:any}):Promise<Array<TimeLog>>;
    update(id:string,timeLogData:TimeLog):Promise<TimeLog>;
    delete(id:string):Promise<void>;
}