import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { SharedModule } from '../../shared/shared/shared.module';
// import { IssueService } from '../../services/issue.service';
@Component({
  selector: 'app-manage-issues',
  imports:[SharedModule],
  templateUrl: './manage-issues.component.html',
  styleUrls: ['./manage-issues.component.css']
})
export class ManageIssuesComponent implements OnInit {
  issues: any[] = [];
  statuses: string[] = ["Pending", "In Progress", "Resolved"];

  constructor(private adminService: AdminService ) {}

  ngOnInit(): void {
    this.fetchIssues();
  }

  fetchIssues() {
    this.adminService.getIssues().subscribe({
      next: (data) => {
        console.log("API Response:", data); // Debugging line
        this.issues = data;
        console.log("Issues Array:", this.issues);
      },
      error: (err) => console.error("Error fetching issues:", err)
    });
  }
  

  updateStatus(issueId: string, newStatus: string): void {
    this.adminService.updateIssueStatus(issueId, newStatus).subscribe(
      (response) => {
        if (response.success) {
          this.fetchIssues(); // Refresh issue list
        }
      },
      (error) => {
        console.error("Error updating status:", error);
      }
    );
  }

  deleteIssue(issueId: string): void {
    if (confirm("Are you sure you want to delete this issue?")) {
      this.adminService.deleteIssue(issueId).subscribe(
        (response) => {
          if (response.success) {
            this.fetchIssues(); // Refresh issue list
          }
        },
        (error) => {
          console.error("Error deleting issue:", error);
        }
      );
    }
  }
}
