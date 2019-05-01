import { Task, ITaskManager } from "timelog-appcore";
import { TaskSchema } from "../models/taskSchema";
import { GenericErrors } from "../errors/genericErros";
import { TaskErrors } from "../errors/taskErrors";
import uuid = require("uuid");
import sequelize = require("sequelize");

export class TaskManager implements ITaskManager {
    dbModel: sequelize.Model<any, any>;

    constructor(dbInstance: sequelize.Sequelize) {
        this.dbModel = TaskSchema.createDatabaseModel(dbInstance);
    }

    createTableIfNotExist() {
        return Promise.resolve(this.dbModel.sync());
    }

    dropTable() {
        return Promise.resolve(this.dbModel.drop());
    }

    add(newTask: Task): Promise<Task> {
        newTask.id = uuid.v4();
        return Promise.resolve(this.dbModel.create(newTask)
            .then((newTaskDbModel) => {
                return newTask;
            }));
    }

    retrieve(id: string): Promise<Task> {
        return Promise.resolve(this.dbModel.findById(id)
            .then((entry) => {
                return entry.dataValues;
            }));
    }

    retrieveAll(filter?: { [key: string]: any }): Promise<Array<Task>> {
        return new Promise((resolve, reject) => {
            this.dbModel.all()
                .then((taks) => {
                    let filteredTasks = taks.map((entry) => {
                        return entry.dataValues;
                    }).filter((entry) => {
                        for (let key in filter) {
                            if (filter[key] !== entry[key]) {
                                return false;
                            }
                        }
                        return true;
                    });
                    resolve(filteredTasks);
                }).catch((error) => {
                    reject(error);
                });
        });
    }

    update(id: string, taskData: Task): Promise<Task> {
        console.log("will update with", taskData);
        return Promise.resolve(
            this.dbModel.update(taskData, { where: { id: id } })
                .then(() => {
                    console.log("updated");
                    return taskData;
                }));
    }
}