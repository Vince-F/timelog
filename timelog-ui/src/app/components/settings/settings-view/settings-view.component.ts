import { Component, OnInit } from '@angular/core';
import { Settings } from 'timelog-appcore';
import { SettingsManager } from 'src/app/services/dataManager/settingsManager';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'settings-view',
  templateUrl: './settings-view.component.html',
  styleUrls: ['./settings-view.component.css']
})
export class SettingsViewComponent implements OnInit {
  settings: Settings;
  loading: boolean;
  errors: Array<string>;


  constructor(private settingsManager: SettingsManager,
              private snackbar: MatSnackBar) {
    this.loading = true;
  }

  ngOnInit() {
    this.settingsManager.loadSettings()
      .then((settings) => {
        this.settings = settings;
        this.loading = false;
      }).catch((error) => {
        this.loading = false;
        this.errors.push("Fail to load settings");
      });
  }

  saveSettings() {
    this.settingsManager.saveSettings(this.settings)
      .then(() => {
        this.snackbar.open("Settings successfully updated.", "Close", {
          duration: 2000
        });
      }).catch(() => {
        this.snackbar.open("Fail to update settings.", "Close", {
          duration: 5000
        });
      });
  }

}
