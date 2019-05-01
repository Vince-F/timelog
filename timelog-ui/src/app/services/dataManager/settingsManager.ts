import { Injectable } from "@angular/core";
import { ISettingsManager, Settings } from "timelog-appcore";

@Injectable()
export class SettingsManager {
    private settings:Settings;
    private instance:ISettingsManager;

    constructor() {
        this.instance = window.appDataManagerInstance.getSettingsManager();
    }

    loadSettings():Promise<Settings> {
        if(!this.settings) {
            return this.instance.retrieveOrCreate("0") /* default ID is 0 this will change with profiles feature */
            .then((settings) => {
                this.settings = settings;
                return settings;
            });
        } else {
            return Promise.resolve(this.settings);
        }
    }

    isDoneRequiringTimelog():Promise<Boolean> {
        return this.loadSettings()
            .then(() => {
                return this.settings.doneRequiresTimelog;
            });
    }

    isUndoneAllowed():Promise<Boolean> {
        return this.loadSettings()
            .then(() => {
                return this.settings.allowUndone;
            });
    }

    saveSettings(newSettings:Settings) {
        return this.instance.update("0", newSettings)
            .then(() => {
                this.settings = newSettings;
            });
    }
}