import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssueService } from '../../services/issue.service';
import { SharedModule } from '../../shared/shared/shared.module';
@Component({
  selector: 'app-my-issues',
  imports: [SharedModule],
  templateUrl: './my-issues.component.html',
  styleUrls: ['./my-issues.component.css']
})
export class MyIssuesComponent implements OnInit {
  myIssues: any[] = [];
  selectedIssue: any = { title: '', description: '', category: '', location: '' };
  showEditModal: boolean = false;

  constructor(private issueService: IssueService, private router: Router) {}

  ngOnInit(): void {
    this.loadMyIssues();
  }

  // Fetch the logged-in user's issues
  loadMyIssues() {
    this.issueService.getMyIssues().subscribe(
      (issues) => {
        this.myIssues = issues;
      },
      (error) => {
        console.error('Error fetching issues:', error);
      }
    );
  }

  // Show edit modal with issue details
  openEditModal(issue: any) {
    console.log("Opening edit modal for issue:", issue); // Debugging
  
    if (!issue._id) {
      console.error("Issue ID is undefined! Possible missing `_id` field in issue object:", issue);
      alert("Error: Issue ID is missing!");
      return;
    }
  
    this.selectedIssue = { ...issue };
    this.showEditModal = true;
  }


  
  // Update issue
  updateIssue() {
    console.log("Updating issue with ID:", this.selectedIssue._id); // Debugging
  
    if (!this.selectedIssue._id) {
      console.error("Issue ID is undefined, cannot update.");
      alert("Error: Issue ID is missing.");
      return;
    }
  
    this.issueService.editIssue(this.selectedIssue._id, this.selectedIssue).subscribe(
      (response) => {
        alert("Issue updated successfully");
        this.showEditModal = false;
        this.loadMyIssues(); // Refresh issue list
      },
      (error) => {
        alert("Error updating issue");
        console.error("Update error:", error);
      }
    );
  }

  reopenIssue(issueId: string) {
    this.issueService.reopenIssue(issueId).subscribe(
      (response) => {
        alert('Issue reopened successfully');
        this.loadMyIssues(); // Refresh list
      },
      (error) => {
        alert('Error reopening issue');
        console.error(error);
      }
    );
  }
  
  // Delete issue
  deleteIssue(issueId: string) {
    if (confirm('Are you sure you want to delete this issue?')) {
      this.issueService.deleteIssue(issueId).subscribe(
        (response) => {
          alert('Issue deleted successfully');
          this.loadMyIssues(); // Refresh issue list
        },
        (error) => {
          alert('Error deleting issue');
        }
      );
    }
  }
}
