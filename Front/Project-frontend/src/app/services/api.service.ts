import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Project } from '../models/project';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // User endpoints
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/utilisateurs`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/utilisateurs/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/utilisateurs`, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/utilisateurs/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/utilisateurs/${id}`);
  }

  // Project endpoints
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/projets`);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/projets/${id}`);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}/projets`, project);
  }

  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.baseUrl}/projets/${id}`, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/projets/${id}`);
  }

  // Task endpoints
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/taches`);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/taches/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/taches`, task);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/taches/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/taches/${id}`);
  }

  // Additional methods for getting tasks by project
  getTasksByProject(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/projets/${projectId}/taches`);
  }

  // Additional methods for getting projects by user
  getProjectsByUser(userId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/utilisateurs/${userId}/projets`);
  }
}