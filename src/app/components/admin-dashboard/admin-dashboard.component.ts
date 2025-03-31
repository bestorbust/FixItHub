import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  totalIssues: number = 0;
  resolvedIssues: number = 0;
  activeUsers: number = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  loadDashboardStats(): void {
    this.adminService.getDashboardStats().subscribe(
      (response) => {
        console.log('Admin Dashboard API Response:', response);
        
        this.totalIssues = response.total_issues ?? 0;
        this.resolvedIssues = response.resolved_issues ?? 0;
        this.activeUsers = response.active_users ?? 0;
      },
      (error) => {
        console.error('Error fetching dashboard stats:', error);
      }
    );
  }
  
}
