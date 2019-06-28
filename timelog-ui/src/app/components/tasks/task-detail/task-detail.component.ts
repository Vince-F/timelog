import { Component, OnInit } from '@angular/core';
import { TaskDataManager } from 'src/app/services/dataManager/taskDataManager';
import { Task } from 'timelog-appcore/lib/models/task';
import { TimeLog } from 'timelog-appcore/lib/models/timelog';
import { TimelogDataManager } from 'src/app/services/dataManager/timelogDataManager';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Router } from "@angular/router";
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task: Task;
  timeLogs: Array<TimeLog>;
  totalSpentTime: string;
  errors: Array<string>;
  loading: boolean;

  constructor(private taskDtMgr: TaskDataManager,
    private timeLogDtMgr: TimelogDataManager,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router,
    private i18n: I18n) {
    this.errors = [];
    this.loading = true;
  }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(
      switchMap((param) => {
        const id = param.get("id");
        return this.retrieveTask(id);
      })
    ).subscribe();
  }

  computeTotalSpentTime(timeLogs: Array<TimeLog>) {
    let totalDuration = 0;
    timeLogs.forEach((timelog) => {
      totalDuration += timelog.duration;
    });

    const hours = Math.floor(totalDuration / 60);
    const minutes = totalDuration % 60;
    return (hours > 0 ? hours + "h" : "") + (minutes > 0 ? minutes + "m" : "");
  }

  deleteTask() {
    //this.taskDtMgr.
  }

  deleteTimeLog(timelog: TimeLog) {
    this.timeLogDtMgr.delete(timelog.id)
      .then(() => {
        this.snackbar.open(this.i18n("Timelog successfully deleted"), this.i18n("Close"), {
          duration: 2000
        });
        const idx = this.timeLogs.indexOf(timelog);
        if (idx > -1) {
          this.timeLogs.splice(idx, 1);
          this.totalSpentTime = this.computeTotalSpentTime(this.timeLogs);
        }
      }).catch((error) => {
        this.snackbar.open(this.i18n("Fail to delete timelog"), this.i18n("Close"), {
          duration: 5000
        });
      });
  }

  getTimelogFormattedDuration(timelog: TimeLog) {
    const hours = Math.floor(timelog.duration / 60);
    const minutes = timelog.duration % 60;

    return (hours > 0 ? hours + "h" : "") + (minutes > 0 ? minutes + "m" : "");
  }

  getTimelogFormattedDate(timelog: TimeLog) {
    return new Date(timelog.date).toLocaleDateString();
  }

  goToTaskList() {
    this.router.navigate(["/task"]);
  }

  retrieveTask(id) {
    return this.taskDtMgr.retrieve(id)
      .then((task) => {
        this.task = task;
        this.retrieveTimeLogsForTask(id);
      }).catch((error) => {
        this.errors.push(this.i18n("Fail to load task"));
      });
  }

  retrieveTimeLogsForTask(taskId) {
    return this.timeLogDtMgr.retrieveAll({ taskId })
      .then((timelogs) => {
        this.timeLogs = timelogs;
        this.totalSpentTime = this.computeTotalSpentTime(timelogs);
        this.loading = false;
      }).catch((error) => {
        this.errors.push(this.i18n("Fail to load task's time logs"));
      });
  }
}
