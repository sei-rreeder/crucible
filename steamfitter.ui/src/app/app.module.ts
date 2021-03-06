/*
Crucible
Copyright 2020 Carnegie Mellon University.
NO WARRANTY. THIS CARNEGIE MELLON UNIVERSITY AND SOFTWARE ENGINEERING INSTITUTE MATERIAL IS FURNISHED ON AN "AS-IS" BASIS. CARNEGIE MELLON UNIVERSITY MAKES NO WARRANTIES OF ANY KIND, EITHER EXPRESSED OR IMPLIED, AS TO ANY MATTER INCLUDING, BUT NOT LIMITED TO, WARRANTY OF FITNESS FOR PURPOSE OR MERCHANTABILITY, EXCLUSIVITY, OR RESULTS OBTAINED FROM USE OF THE MATERIAL. CARNEGIE MELLON UNIVERSITY DOES NOT MAKE ANY WARRANTY OF ANY KIND WITH RESPECT TO FREEDOM FROM PATENT, TRADEMARK, OR COPYRIGHT INFRINGEMENT.
Released under a MIT (SEI)-style license, please see license.txt or contact permission@sei.cmu.edu for full terms.
[DISTRIBUTION STATEMENT A] This material has been approved for public release and unlimited distribution.  Please see Copyright notice for non-US Government use and distribution.
Carnegie Mellon� and CERT� are registered in the U.S. Patent and Trademark Office by Carnegie Mellon University.
DM20-0181
*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsService } from './services/settings/settings.service';
import { AuthGuard } from './services/auth/auth-guard.service';
import { AuthService } from './services/auth/auth.service';
import { AuthInterceptor } from './services/auth/auth.interceptor.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { ErrorService } from './services/error/error.service';
import { BASE_PATH } from './swagger-codegen/dispatcher.api';
import { ApiModule as SwaggerCodegenApiModule } from './swagger-codegen/dispatcher.api/api.module';
import { AuthCallbackComponent } from './components/auth/auth-callback.component';
import { AuthCallbackSilentComponent } from './components/auth/auth-callback-silent.component';
import { HomeAppComponent } from './components/home-app/home-app.component';
import { AuthLogoutComponent } from './components/auth/auth-logout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { VmListComponent } from './components/vm-list/vm-list.component';
import { SystemMessageService } from './services/system-message/system-message.service';
import { SystemMessageComponent } from './components/shared/system-message/system-message.component';
import { VmTaskExecuteComponent } from './components/vm-task-execute/vm-task-execute.component';
import { ScenariosComponent } from './components/scenarios/scenarios.component';
import { ScenarioEditComponent } from './components/scenarios/scenario-edit/scenario-edit.component';
import { ScenarioEditDialogComponent } from './components/scenarios/scenario-edit-dialog/scenario-edit-dialog.component';
import { ScenarioListComponent } from './components/scenarios/scenario-list/scenario-list.component';
import { SessionsComponent } from './components/sessions/sessions.component';
import { SessionEditComponent } from './components/sessions/session-edit/session-edit.component';
import { SessionEditDialogComponent } from './components/sessions/session-edit-dialog/session-edit-dialog.component';
import { SessionListComponent } from './components/sessions/session-list/session-list.component';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { CommandsComponent } from './components/commands/commands.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/shared/confirm-dialog/confirm-dialog.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { ClipboardModule } from 'ngx-clipboard';
import { AdminContainerComponent } from './components/admin/admin-container/admin-container.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MatBottomSheetModule,
  MatBadgeModule,
  MatFormFieldModule,
  MatTreeModule
} from '@angular/material';
import { ExecuteResultsComponent } from './components/execute-results/execute-results.component';
import { DialogService } from './services/dialog/dialog.service';
import { TaskHistoryComponent } from './components/task-history/task-history.component';
import { TaskTreeComponent } from './components/tasks/task-tree/task-tree.component';
import { TaskEditComponent } from './components/tasks/task-edit/task-edit.component';
import { TasksComponent } from './components/tasks/tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthCallbackComponent,
    AuthCallbackSilentComponent,
    AuthLogoutComponent,
    HomeAppComponent,
    VmListComponent,
    SystemMessageComponent,
    VmTaskExecuteComponent,
    ScenariosComponent,
    ScenarioEditComponent,
    ScenarioEditDialogComponent,
    ScenarioListComponent,
    SessionsComponent,
    SessionEditComponent,
    SessionEditDialogComponent,
    SessionListComponent,
    CommandsComponent,
    ExecuteResultsComponent,
    ConfirmDialogComponent,
    TaskHistoryComponent,
    TaskTreeComponent,
    TaskEditComponent,
    TasksComponent,
    AdminContainerComponent,
    AdminUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SwaggerCodegenApiModule,
    HttpModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatBottomSheetModule,
    MatBadgeModule,
    MatFormFieldModule,
    CdkTableModule,
    MatTreeModule,
    CdkTreeModule,
    NgxMaterialTimepickerModule,
    ClipboardModule
  ],
  exports: [
    MatSortModule
  ],
  providers: [
    AuthService,
    SettingsService,
    AuthGuard,
    AuthService,
    DialogService,
    SystemMessageService,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [SettingsService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: BASE_PATH,
      useFactory: getBasePath,
      deps: [SettingsService],
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: ErrorService
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SystemMessageComponent,
    ConfirmDialogComponent,
    ScenarioEditDialogComponent,
    SessionEditDialogComponent,
    TaskEditComponent
  ]
})
export class AppModule { }

export function initConfig(settings: SettingsService) {
  return () => settings.load();
}

export function getBasePath(settings: SettingsService) {
  return settings.ApiUrl;
}

