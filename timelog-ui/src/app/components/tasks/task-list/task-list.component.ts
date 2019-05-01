import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TaskCreateFormComponent } from '../task-create-form/task-create-form.component';
import { TaskDataManager } from 'src/app/services/dataManager/taskDataManager';
import { Task } from 'timelog-appcore/lib/models/task';
import { Router } from '@angular/router';
import { TimelogCreateFormComponent } from '../../timelog/timelog-create-form/timelog-create-form.component';
import { SettingsManager } from '../../../services/dataManager/settingsManager';
import { TimelogDataManager } from '../../../services/dataManager/timelogDataManager';
import { from, Observable } from "rxjs";

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Array<Task>;
  listSelection: string;
  filteredLists: Map<string, Array<Task>>;
  errors: Array<string>;
  isLoading: boolean;
  taskCanBeUndone: Observable<Boolean>;

  constructor(private dialog: MatDialog,
    private taskDtMgr: TaskDataManager,
    private timeLogDtMgr: TimelogDataManager,
    private router: Router,
    private snackbar: MatSnackBar,
    private settingsManager: SettingsManager) {
    this.listSelection = "Pending";
    this.filteredLists = new Map();
    this.errors = [];
    this.isLoading = true;
    this.taskCanBeUndone = from(this.settingsManager.isUndoneAllowed());
  }

  ngOnInit() {
    this.initTaskList();
  }

  addTask() {
    this.dialog.open(TaskCreateFormComponent, {
      width: "350px"
    }).afterClosed().subscribe(() => {
      this.initTaskList();
    });
  }

  addTimeLog(selectedTask: Task) {
    this.dialog.open(TimelogCreateFormComponent, {
      width: "350px",
      data: { taskId: selectedTask.id }
    }).afterClosed().subscribe(() => {
      this.initTaskList();
    });
  }

  displayTaskDetails(selectedTask: Task) {
    this.router.navigate(["/task", selectedTask.id]);
  }

  initTaskList() {
    this.taskDtMgr.retrieveAll()
      .then((tasks) => {
        this.tasks = tasks;
        this.filteredLists.set("All", this.tasks);
        this.filteredLists.set("Pending", this.tasks.filter(task => !task.done));
        this.filteredLists.set("Done", this.tasks.filter(task => task.done));
        this.isLoading = false;
      }).catch((error) => {
        this.errors.push("Fail to load tasks.");
        this.isLoading = false;
      });
  }

  private updateTaskToDone(selectedTask: Task) {
    selectedTask.done = true;
    this.taskDtMgr.update(selectedTask.id, selectedTask)
      .then(() => {
        this.snackbar.open("Task updated", "Close", {
          duration: 2000
        })
        let idx = this.filteredLists.get("Pending").indexOf(selectedTask);
        this.filteredLists.get("Pending").splice(idx, 1);
        this.filteredLists.get("Done").push(selectedTask);
      }).catch(() => {
        this.snackbar.open("Fail to update task", "Close", {
          duration: 5000
        });
      });
  }

  private async getNumberOfTimelogs(selectedTask: Task) {
    let timelogs = await this.timeLogDtMgr.retrieveAll({ taskId: selectedTask.id });
    return timelogs.length;
  }

  markTaskDone(selectedTask: Task) {
    this.settingsManager.isDoneRequiringTimelog()
      .then((doneRequiringTimelog) => {
        if (doneRequiringTimelog === true) {
          this.getNumberOfTimelogs(selectedTask)
            .then((nbOfTimelog) => {
              if (nbOfTimelog > 0) {
                this.updateTaskToDone(selectedTask);
              } else {
                this.snackbar.open("Your task cannot be put to done because you don't any time logged in it.", "Close", {
                  duration: 5000
                });
              }
            }).catch(() => {
              this.snackbar.open("Fail to retrieve time logs for this task.", "Close", {
                duration: 5000
              });
            });

        } else {
          this.updateTaskToDone(selectedTask);
        }
      });
  }

  markTaskUndone(selectedTask:Task) {
    this.settingsManager.isUndoneAllowed()
      .then((undoneAllowed) => {
        if (undoneAllowed) {
          selectedTask.done = false;
          this.taskDtMgr.update(selectedTask.id, selectedTask)
            .then(() => {
              this.snackbar.open("Task updated", "Close", {
                duration: 2000
              })
              let idx = this.filteredLists.get("Done").indexOf(selectedTask);
              this.filteredLists.get("Done").splice(idx, 1);
              this.filteredLists.get("Pending").push(selectedTask);
            }).catch(() => {
              this.snackbar.open("Fail to update task", "Close", {
                duration: 5000
              });
            });
        } else {
          this.snackbar.open("You cannot put back task to not done.", "Close", {
            duration: 5000
          });
        }
      }).catch(() => {
        this.snackbar.open("Fail to check user settings.", "Close", {
          duration: 5000
        });
      });
  }

  setListSelection(listSelection: string) {
    this.listSelection = listSelection;
  }

}
