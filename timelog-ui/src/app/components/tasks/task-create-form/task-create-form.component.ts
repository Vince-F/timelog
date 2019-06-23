import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskDataManager } from 'src/app/services/dataManager/taskDataManager';

@Component({
  selector: 'task-create-form',
  templateUrl: './task-create-form.component.html',
  styleUrls: ['./task-create-form.component.css']
})
export class TaskCreateFormComponent implements OnInit {
  taskForm: FormGroup;
  nameFormControl: FormControl;
  descriptionFormControl: FormControl;

  constructor(private dialogRef: MatDialogRef<TaskCreateFormComponent>,
    private taskDtMgr: TaskDataManager) {
    this.nameFormControl = new FormControl('', [Validators.required]);
    this.descriptionFormControl = new FormControl('', []);
    this.taskForm = new FormGroup({
      name: this.nameFormControl,
      description: this.descriptionFormControl
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  create() {
    this.nameFormControl.markAsDirty();
    this.nameFormControl.markAsTouched();
    if (this.taskForm.valid) {
      this.taskDtMgr.create(this.taskForm.value)
        .then(() => {
          this.dialogRef.close();
        }).catch((error) => {

        });
    } else {

    }
  }

  ngOnInit() {
  }

}
