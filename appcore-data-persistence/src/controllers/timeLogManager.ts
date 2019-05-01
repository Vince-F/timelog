import { TimeLog, ITimeLogManager } from "timelog-appcore";
import {TimeLogSchema} from "../models/timelogSchema";
import { TaskManager } from "./taskManager";
import { TimeLogErrors } from "../errors/timeLogErrors";
import uuid = require("uuid");
import sequelize = require("sequelize");

export class TimeLogManager implements ITimeLogManager {
    dbModel: sequelize.Model<any,any>;
    taskManager:TaskManager;

    constructor(dbInstance: sequelize.Sequelize, taskManager: TaskManager) {
        this.taskManager = taskManager;
        this.dbModel = TimeLogSchema.createDatabaseModel(dbInstance);
    }

    createTableIfNotExist() {
        return Promise.resolve(this.dbModel.sync());
    }

    dropTable() {
        return Promise.resolve(this.dbModel.drop());
    }

    async add(newTimeLog:TimeLog):Promise<TimeLog> {
        try {
            await this.taskManager.retrieve(newTimeLog.taskId); // check task existence
            newTimeLog.id = uuid.v4();
            await this.dbModel.create(newTimeLog);
            return newTimeLog;
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async retrieve(id:string):Promise<TimeLog> {
        let timelog = await this.dbModel.findById(id);
        return timelog.dataValues;
    }

    async retrieveAll(filter?:{[key:string]:any}):Promise<Array<TimeLog>> {
        let timelogs = await this.dbModel.all();
        return timelogs.map((entry) => {
            return entry.dataValues;
        }).filter((entry) => {
            for (let key in filter) {
                if (filter[key] !== entry[key]) {
                    return false;
                }
            }
            return true;
        });
    }

    async update(id:string,timeLogData:TimeLog):Promise<TimeLog> {
        try {
            await this.taskManager.retrieve(timeLogData.taskId); // check task existence
            await this.dbModel.update(timeLogData, {where: {id: id}});
            return timeLogData;
        } catch(e) {
            return Promise.reject(e);
        }
    }

    async delete(id:string):Promise<void> {
        let nbDeleted = await this.dbModel.destroy({ where: {id: id } } );
        return;
    }
}