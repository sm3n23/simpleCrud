import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  stats = {
    totalProjects: 0,
    totalTasks: 0,
    totalUsers: 0,
    tasksInProgress: 0
  };

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.apiService.getProjects().subscribe(projects => {
      this.stats.totalProjects = projects.length;
    });

    this.apiService.getTasks().subscribe(tasks => {
      this.stats.totalTasks = tasks.length;
      this.stats.tasksInProgress = tasks.filter(t => t.statut === 'EN_COURS').length;
    });

    this.apiService.getUsers().subscribe(users => {
      this.stats.totalUsers = users.length;
    });
  }
}