import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ApplicationDataManager } from "timelog-appcore"

import 'hammerjs';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

function initApp() {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
}
window.initApp = initApp;

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
    appDataManagerInstance: ApplicationDataManager;
    isDesktopApp:boolean;
    initApp:any;
    ipcRenderer:any;
  }
}
