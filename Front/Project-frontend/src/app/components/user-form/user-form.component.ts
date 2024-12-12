import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Input() user?: User;
  @Output() userSaved = new EventEmitter<void>();
  userForm: FormGroup;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nom: ['', Validators.required],
      role: ['USER', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.user) {
      this.isEditing = true;
      this.userForm.patchValue({
        email: this.user.email,
        nom: this.user.nom,
        role: this.user.role
      });
      if (this.isEditing) {
        this.userForm.get('password')?.removeValidators(Validators.required);
        this.userForm.get('password')?.updateValueAndValidity();
      }
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      if (this.isEditing && this.user) {
        const userData = this.userForm.value;
        if (!userData.password) {
          delete userData.password;
        }
        this.apiService.updateUser(this.user.id!, userData).subscribe({
          next: () => this.userSaved.emit(),
          error: (error) => console.error('Error updating user:', error)
        });
      } else {
        this.apiService.createUser(this.userForm.value).subscribe({
          next: () => this.userSaved.emit(),
          error: (error) => console.error('Error creating user:', error)
        });
      }
    }
  }
}