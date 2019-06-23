import { app, BrowserWindow } from 'electron';
import { createDatabaseInstanceOptions } from "./appDataPersistence";
import { ApplicationDataManager, DataPersistenceController, MigrationHelper } from "timelog-appcore-data-persistence";

class MainWindow {
    private instance: BrowserWindow;

    constructor() {
        this.instance = null;
    }

    createMainWindow(dataAppMgr: ApplicationDataManager) {
        global.dataAppManager = dataAppMgr;
        this.instance = new BrowserWindow({ width: 800, height: 600, webPreferences: {nodeIntegration: true} });

        //this.injectAppContextManager(dataAppMgr);
        this.instance.loadFile(require.resolve("timelog-ui/dist/timelog-ui/index.html"));
        this.instance.webContents.executeJavaScript(`window.isDesktopApp = true;
            window.appDataManagerInstance = require('electron').remote.getGlobal('dataAppManager');
            initApp();`);
        //this.instance.loadURL("file://" + require.resolve("timelog-ui/dist/timelog-ui/index.html"));

        // Open the DevTools.
        // this.instance.webContents.openDevTools()
        this.instance.on('closed', () => {
            this.instance = null;
        });

    }

    getWindow() {
        return this.instance;
    }

    injectAppContextManager(dataAppMgr: ApplicationDataManager) {
        this.instance.webContents.executeJavaScript(`
        window.isDesktopApp = true
        console.log('hello world');
        var ipcRenderer = require('electron').ipcRenderer;
        console.log("IPC is ",ipcRenderer)
        ipcRenderer.on('app-context-manager', function (event,ctxMgr) {
            console.log("received",ctxMgr)
            window.appDataManagerInstance = ctxMgr;
            initApp();
        });
        `, false, () => { this.instance.loadFile(require.resolve("timelog-ui/dist/timelog-ui/index.html")); });
        this.instance.webContents.send("app-context-manager", dataAppMgr);
    }
}

let mainWindow = new MainWindow();

app.on('ready', () => {
    let appDataPath = app.getPath("userData");
    let userDataFilename = appDataPath + "/userdata.sqlite";
    let dbInstanceOptions = createDatabaseInstanceOptions(userDataFilename);
    let dataPersistenceCtrl = new DataPersistenceController(userDataFilename);
    let migrationManager = new MigrationHelper(dataPersistenceCtrl);
    dataPersistenceCtrl.connect()
        .then(() => {
            let dataAppMgr = new ApplicationDataManager(dataPersistenceCtrl.dbInstance);
            dataAppMgr.createTables()
                .then(() => {
                    migrationManager.runMigration()
                        .then(() => {
                            console.log("Migrations completed");
                            mainWindow.createMainWindow(dataAppMgr);
                        }).catch(() => {
                            throw "Fail to migrate data";
                        });
                }).catch(() => {
                    throw "Fail to intialise the data";
                });
            //mainWindow.injectAppContextManager(dataAppMgr);
        }).catch((error) => {
            console.log(error)
            throw "Fatal error with DB";
        })
    //appContextManagerInstance.createDatabaseInstance("app", "", "", dbInstanceOptions);

});

app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow.getWindow() === null) {
        //mainWindow.createMainWindow();
    }
});
