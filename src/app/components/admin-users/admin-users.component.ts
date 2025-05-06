import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { SharedModule } from '../../shared/shared/shared.module';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit {
  users: any[] = [];
  filterText: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.adminService.getUsers().subscribe(
      (data) => {
        console.log('Fetched users:', data.users);
        this.users = data.users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  filteredUsers() {
    if (!this.filterText.trim()) {
      return this.users;
    }
  
    const lowerFilter = this.filterText.toLowerCase();
  
    return this.users.filter(user =>
      user.email.toLowerCase().includes(lowerFilter) ||
      user.username.toLowerCase().includes(lowerFilter)
    );
  }

  warnUser(email: string): void {
    if (confirm('Are you sure you want to warn this user?')) {
      this.adminService.warnUser(email).subscribe(
        (response) => {
          alert(response.message);
          this.fetchUsers();
        },
        (error) => {
          console.error('Error warning user:', error);
        }
      );
    }
  }

  deactivateUser(email: string): void {
    if (confirm('Are you sure you want to deactivate this user?')) {
      this.adminService.deactivateUser(email).subscribe(
        (response) => {
          alert(response.message);
          this.fetchUsers();
        },
        (error) => {
          console.error('Error deactivating user:', error);
        }
      );
    }
  }

  activateUser(email: string): void {
    if (confirm('Are you sure you want to activate this user?')) {
      this.adminService.activateUser(email).subscribe(
        (response) => {
          alert(response.message);
          this.fetchUsers();
        },
        (error) => {
          console.error('Error activating user:', error);
        }
      );
    }
  }
}
