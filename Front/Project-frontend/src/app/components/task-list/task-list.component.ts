import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Task } from '../../models/task';
import { Project } from '../../models/project';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  projects: Project[] = [];
  selectedTask?: Task;
  showForm = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      tasks: this.apiService.getTasks(),
      projects: this.apiService.getProjects()
    }).subscribe({
      next: (data) => {
        this.projects = data.projects;
        this.tasks = data.tasks;
        console.log('Projects loaded:', this.projects);
        console.log('Tasks loaded:', this.tasks);
      },
      error: (error) => console.error('Error loading data:', error)
    });
  }

  getProjectName(projectId: number): string {
    const project = this.projects.find(p => Number(p.id) === Number(projectId));
    return project ? project.nom : 'Non assigné';
  }

  updateTaskStatus(task: Task, status: 'A_FAIRE' | 'EN_COURS' | 'TERMINE'): void {
    const updatedTask = { ...task, statut: status };
    this.apiService.updateTask(task.id!, updatedTask).subscribe({
      next: () => this.loadData(),
      error: (error) => console.error('Error updating task:', error)
    });
  }

  deleteTask(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      this.apiService.deleteTask(id).subscribe({
        next: () => this.loadData(),
        error: (error) => console.error('Error deleting task:', error)
      });
    }
  }

  onTaskSaved(): void {
    this.loadData();
    this.showForm = false;
    this.selectedTask = undefined;
  }
}