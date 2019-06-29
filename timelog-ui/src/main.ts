import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { ApplicationDataManager } from "timelog-appcore";

import "hammerjs";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

declare const require; // Use the require method provided by webpack
const translations = require(`raw-loader!./locale/messages.fr.xlf`);


if (environment.production) {
  enableProdMode();
}

function initApp() {
  platformBrowserDynamic().bootstrapModule(AppModule, {
    providers: [
      {provide: TRANSLATIONS, useValue: translations},
      {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
    ]
  })
    .catch(err => console.log(err));
}
window.initApp = initApp;

if(environment.isTestEnvironment) {
  environment.initTestEnvironment();
  initApp();
}

console.log("desktop", window.isDesktopApp);
/*if(!window.isDesktopApp) { //electron app is responsible to init the app
  initApp();
}*/

/*try {
  let ipcRenderer = require("electron").ipcRenderer;

  ipcRenderer.send("test","test");
} catch(e) {

}*/

declare global {
  interface Window {
    appDataManagerInstance: any; /* ApplicationDataManager; keep any while I find a fix for the ES5/ES6 conflict between the two pckages */
    isDesktopApp:boolean;
    initApp:any;
    ipcRenderer:any;
  }
}
