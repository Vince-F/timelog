import { NgModule,ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { TaskDetailComponent } from './components/tasks/task-detail/task-detail.component';
import { ReportsViewComponent } from './components/reports/reports-view/reports-view.component';
import { SettingsViewComponent } from './components/settings/settings-view/settings-view.component';

// guards
/*import { AdminGuard } from "./services/guards/adminGuard.service"
import { AuthenticationGuard } from "./services/guards/authenticationGuard.service"
import { NeedSaveGuard } from "./services/guards/needSaveGuard.service"*/

//import { PageNotFoundComponent } from './not-found.component';

const appRoutes: Routes = [
    { path: 'task', component: TaskListComponent },
    { path: 'task/:id', component: TaskDetailComponent },
    { path: 'reports', component: ReportsViewComponent },
    { path: 'settings', component: SettingsViewComponent },

    { path: '', redirectTo: '/task', pathMatch: 'full' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true } // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AppRoutingModule,
            //providers: [AuthenticationGuard]
        };
    }
}