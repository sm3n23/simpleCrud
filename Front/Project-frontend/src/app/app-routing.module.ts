import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: '', 
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'projects', component: ProjectListComponent },
      { path: 'tasks', component: TaskListComponent },
      { path: 'users', component: UserListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }