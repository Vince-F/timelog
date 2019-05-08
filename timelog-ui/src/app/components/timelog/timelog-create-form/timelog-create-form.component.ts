import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, RequiredValidator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { TimeLog } from 'timelog-appcore/lib/models/timelog';
import { TimelogDataManager } from 'src/app/services/dataManager/timelogDataManager';

@Component({
  selector: 'timelog-create-form',
  templateUrl: './timelog-create-form.component.html',
  styleUrls: ['./timelog-create-form.component.css']
})
export class TimelogCreateFormComponent implements OnInit {
  timeLogForm: FormGroup;
  durationFromControl: FormControl;
  dateFormControl: FormControl;

  constructor(private dialogRef: MatDialogRef<TimelogCreateFormComponent>,
              @Inject(MAT_DIALOG_DATA) private dialogData: {taskId:string},
              private timelogDtMgr: TimelogDataManager,
              private snackbar: MatSnackBar) {
    this.durationFromControl = new FormControl('', {
      validators: [this.durationFormatValidator(), Validators.required],
      updateOn: 'blur'
    });
    this.dateFormControl = new FormControl("",{
      validators: Validators.required,
      updateOn: 'blur'
    }); 
    this.timeLogForm = new FormGroup({
      duration: this.durationFromControl,
      date: this.dateFormControl
    });
  }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  create() {
    this.durationFromControl.markAsDirty();
    this.durationFromControl.markAsTouched();
    this.dateFormControl.markAsDirty();
    this.dateFormControl.markAsTouched();
    if (this.timeLogForm.valid) {
      let formData = this.timeLogForm.value;
      let timelogData:TimeLog = {
        id:"",
        duration: this.extractDurationInMinutes(formData.duration.toString()),
        taskId: this.dialogData.taskId,
        date: formData.date
      };
      
      this.timelogDtMgr.create(timelogData)
        .then(() => {
          this.snackbar.open("Time log created", "Close", {
            duration: 2000,
          });
          this.dialogRef.close();
        }).catch((error) => {
          this.snackbar.open("Fail to create time log.", "Close", {
            duration: 3000,
          });
        });
    } else {
      this.snackbar.open("Your time log contains some error, please fix them before saving", "Close", {
        duration: 3000,
      });
    }
  }

  durationFormatValidator(): ValidatorFn {
    return function (control) {
      let formatRegexp = /(\d{1,2}h)?(\d{1,2}m)?/;
      let value = control.value.toString().replace(/ /g, "");
      let result = formatRegexp.exec(value);
      
      return result === null || result[0] .length === 0 || result[0] !== result.input ? 
                { 'invalidFormat': { value: control.value } } : null;
    }
  }

  extractDurationInMinutes(value:string) {
    let formatRegexp = /(\d{1,2}h)(\d{1,2}m)/;
    let result = formatRegexp.exec(value);
    if (result && result[0] !== "") {
      let hours = Number.parseInt((result[1] || "0h").replace("h", ""), 10);
      let minutes = Number.parseInt((result[2] || "0m").replace("m", ""), 10);
      return hours * 60 + minutes;
    }
  }

}
