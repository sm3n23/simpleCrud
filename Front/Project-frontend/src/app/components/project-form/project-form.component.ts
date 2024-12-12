import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../models/project';
import { User } from '../../models/user';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  @Input() project?: Project;
  @Output() projectSaved = new EventEmitter<void>();
  projectForm: FormGroup;
  isEditing = false;
  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.projectForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      utilisateurId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    
    this.loadUsers();

    if (this.project) {
      this.isEditing = true;
      this.projectForm.patchValue({
        nom: this.project.nom,
        description: this.project.description,
        utilisateurId: this.project.utilisateurId
      });
    }
  }

  loadUsers(): void {
    this.apiService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => console.error('Error loading users:', error)
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      if (this.isEditing && this.project) {
        this.apiService.updateProject(this.project.id!, this.projectForm.value)
          .subscribe({
            next: () => this.projectSaved.emit(),
            error: (error) => console.error('Error updating project:', error)
          });
      } else {
        this.apiService.createProject(this.projectForm.value)
          .subscribe({
            next: () => this.projectSaved.emit(),
            error: (error) => console.error('Error creating project:', error)
          });
      }
    }
  }
}