import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../models/task';
import { Project } from '../../models/project';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Input() task?: Task;
  @Output() taskSaved = new EventEmitter<void>();
  taskForm: FormGroup;
  projects: Project[] = [];
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.taskForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      dateEcheance: ['', Validators.required],
      statut: ['A_FAIRE'],
      projetId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProjects();
    if (this.task) {
      this.isEditing = true;
      this.taskForm.patchValue({
        titre: this.task.titre,
        description: this.task.description,
        dateEcheance: this.formatDate(this.task.dateEcheance),
        statut: this.task.statut,
        projetId: this.task.projetId
      });
    }
  }

  loadProjects(): void {
    this.apiService.getProjects().subscribe({
      next: (data) => this.projects = data,
      error: (error) => console.error('Error loading projects:', error)
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formData = {
        ...this.taskForm.value,
        dateEcheance: new Date(this.taskForm.value.dateEcheance)
      };

      if (this.isEditing && this.task) {
        this.apiService.updateTask(this.task.id!, formData).subscribe({
          next: () => this.taskSaved.emit(),
          error: (error) => console.error('Error updating task:', error)
        });
      } else {
        this.apiService.createTask(formData).subscribe({
          next: () => this.taskSaved.emit(),
          error: (error) => console.error('Error creating task:', error)
        });
      }
    }
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}