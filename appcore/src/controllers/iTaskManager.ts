import { Task } from "../models/task";
import { GenericErrors } from "../errors/genericErros";
import { TaskErrors } from "../errors/taskErrors";

export interface ITaskManager {
    add(newTask: Task): Promise<Task>;
    retrieve(id: string): Promise<Task>;
    retrieveAll(filter?:{[key:string]:any}): Promise<Array<Task>>;
    update(id: string, taskData: Task): Promise<Task>;
}