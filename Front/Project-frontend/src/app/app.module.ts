import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    TaskListComponent,
    ProjectFormComponent,
    TaskFormComponent,
    UserListComponent,
    UserFormComponent,
    HomeComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
