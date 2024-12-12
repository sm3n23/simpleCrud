import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  selectedUser?: User;
  showForm = false;

  constructor(private apiService: ApiService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.apiService.getUsers().subscribe({
      next: (data) => this.users = data,
      error: (error) => console.error('Error loading users:', error)
    });
  }

  deleteUser(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.apiService.deleteUser(id).subscribe({
        next: () => this.loadUsers(),
        error: (error) => console.error('Error deleting user:', error)
      });
    }
  }

  onUserSaved(): void {
    this.loadUsers();
    this.showForm = false;
    this.selectedUser = undefined;
  }

  
}