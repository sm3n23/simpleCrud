import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Project } from '../../models/project';
import { User } from '../../models/user';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  users: User[] = [];  // Add this
  selectedProject?: Project;
  showForm = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadProjects();
    this.loadUsers();  // Add this
  }

  loadProjects(): void {
    this.apiService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (error) => console.error('Error loading projects:', error)
    });
  }

  // Add this method
  loadUsers(): void {
    this.apiService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => console.error('Error loading users:', error)
    });
  }

  
  getUserName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.nom : 'Non assigné';
  }

  deleteProject(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.apiService.deleteProject(id).subscribe({
        next: () => {
          this.loadProjects();
        },
        error: (error) => console.error('Error deleting project:', error)
      });
    }
  }

  onProjectSaved(): void {
    this.loadProjects();
    this.showForm = false;
    this.selectedProject = undefined;
  }
}