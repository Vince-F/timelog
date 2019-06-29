import { BrowserModule } from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgModule, TRANSLATIONS, LOCALE_ID, TRANSLATIONS_FORMAT } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { I18n } from "@ngx-translate/i18n-polyfill";

import { MatToolbarModule, MatListModule, MatButtonModule, MatIconModule, MatSidenavModule, MatInputModule, MatDialogModule, MatBadgeModule, MatChipsModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MatCardModule, MatCheckboxModule } from "@angular/material";

import { AppComponent } from "./app.component";
import { TaskListComponent } from "./components/tasks/task-list/task-list.component";
import { TaskDetailComponent } from "./components/tasks/task-detail/task-detail.component";
import { AppToolbarComponent } from "./components/menus/app-toolbar/app-toolbar.component";
import { AppNavigationMenuComponent } from "./components/menus/app-navigation-menu/app-navigation-menu.component";
import { AppRoutingModule } from "./app-routing.module";
import { TaskCreateFormComponent } from "./components/tasks/task-create-form/task-create-form.component";
import { TaskDataManager } from "./services/dataManager/taskDataManager";
import { TimelogCreateFormComponent } from "./components/timelog/timelog-create-form/timelog-create-form.component";
import { TimelogDataManager } from "./services/dataManager/timelogDataManager";
import { ReportsViewComponent } from "./components/reports/reports-view/reports-view.component";
import { ReportsFilterViewComponent } from "./components/reports/reports-filter-view/reports-filter-view.component";
import { ReportsContentViewComponent } from "./components/reports/reports-content-view/reports-content-view.component";
import { SettingsViewComponent } from "./components/settings/settings-view/settings-view.component";
import { SettingsManager } from "./services/dataManager/settingsManager";
import { ErrorViewComponent } from "./components/layout/error-view/error-view.component";

declare const require; // Use the require method provided by webpack
const translations = require(`raw-loader!../locale/messages.en.xlf`);

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskDetailComponent,
    AppToolbarComponent,
    AppNavigationMenuComponent,
    TaskCreateFormComponent,
    TimelogCreateFormComponent,
    ReportsViewComponent,
    ReportsFilterViewComponent,
    ReportsContentViewComponent,
    SettingsViewComponent,
    ErrorViewComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule, BrowserAnimationsModule,
    ReactiveFormsModule, FormsModule,
    MatToolbarModule, MatListModule, MatButtonModule, MatIconModule, MatSidenavModule, MatInputModule, MatDialogModule,
    MatBadgeModule, MatChipsModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MatCardModule, MatCheckboxModule
  ],
  entryComponents: [TaskCreateFormComponent, TimelogCreateFormComponent],
  providers: [
    {provide: TRANSLATIONS, useValue: translations},
    {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
    {provide: LOCALE_ID, useValue: "en"}
    , I18n,
    TaskDataManager, TimelogDataManager, SettingsManager],
  bootstrap: [AppComponent]
})
export class AppModule { }
