import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { SharedModule } from '../../shared/shared/shared.module';
@Component({
  selector: 'app-admin-users',
  imports:[SharedModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit {
  users: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  // Fetch users from API
  fetchUsers(): void {
    this.adminService.getUsers().subscribe(
      (data) => {
        console.log("Fetched users:", data.users);
        this.users = data.users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // Warn a user
  warnUser(email: string): void {
    if (confirm('Are you sure you want to warn this user?')) {
      this.adminService.warnUser(email).subscribe(
        (response) => {
          alert(response.message);
          this.fetchUsers(); // Refresh list
        },
        (error) => {
          console.error('Error warning user:', error);
        }
      );
    }
  }

  // Deactivate a user
  deactivateUser(email: string): void {
    if (confirm('Are you sure you want to deactivate this user?')) {
      this.adminService.deactivateUser(email).subscribe(
        (response) => {
          alert(response.message);
          this.fetchUsers(); // Refresh list
        },
        (error) => {
          console.error('Error deactivating user:', error);
        }
      );
    }
  }

  // Activate a user
activateUser(email: string): void {
  if (confirm('Are you sure you want to activate this user?')) {
    this.adminService.activateUser(email).subscribe(
      (response) => {
        alert(response.message);
        this.fetchUsers(); // Refresh the user list
      },
      (error) => {
        console.error('Error activating user:', error);
      }
    );
  }
}

}
