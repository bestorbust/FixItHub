import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { SharedModule } from '../../shared/shared/shared.module';

@Component({
  selector: 'app-manage-issues',
  imports: [SharedModule],
  templateUrl: './manage-issues.component.html',
  styleUrls: ['./manage-issues.component.css']
})
export class ManageIssuesComponent implements OnInit {
  issues: any[] = [];
  statuses: string[] = ["Pending", "In Progress", "Resolved"];
  searchText = '';
  statusFilter = '';
  sortKey = 'title';
  sortAsc = true;
  selectedDescription = '';
  selectedIssues: Set<string> = new Set();

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchIssues();
  }

  fetchIssues() {
    this.adminService.getIssues().subscribe({
      next: (data) => {
        this.issues = data;
      },
      error: (err) => console.error("Error fetching issues:", err)
    });
  }

  updateStatus(issueId: string, newStatus: string): void {
    this.adminService.updateIssueStatus(issueId, newStatus).subscribe(
      (response) => {
        if (response.success) {
          this.fetchIssues();
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
          if (response.success) this.fetchIssues();
        },
        (error) => {
          console.error("Error deleting issue:", error);
        }
      );
    }
  }

  bulkDelete() {
    if (this.selectedIssues.size === 0) return;
    if (confirm(`Delete ${this.selectedIssues.size} selected issues?`)) {
      this.selectedIssues.forEach(id => this.deleteIssue(id));
      this.selectedIssues.clear();
    }
  }

  filteredIssues() {
    let filtered = this.issues;
    if (this.searchText.trim()) {
      const text = this.searchText.toLowerCase();
      filtered = filtered.filter(issue =>
        issue.title.toLowerCase().includes(text) ||
        issue.reported_by.toLowerCase().includes(text)
      );
    }
    if (this.statusFilter) {
      filtered = filtered.filter(issue => issue.status === this.statusFilter);
    }
    return filtered.sort((a, b) => {
      const valueA = a[this.sortKey]?.toLowerCase();
      const valueB = b[this.sortKey]?.toLowerCase();
      if (valueA < valueB) return this.sortAsc ? -1 : 1;
      if (valueA > valueB) return this.sortAsc ? 1 : -1;
      return 0;
    });
  }

  sortBy(key: string) {
    this.sortKey === key ? this.sortAsc = !this.sortAsc : (this.sortKey = key, this.sortAsc = true);
  }

  viewDescription(desc: string) {
    this.selectedDescription = desc;
  }

  markResolved(issueId: string) {
    this.updateStatus(issueId, 'Resolved');
  }

  reopenIssue(issueId: string) {
    this.updateStatus(issueId, 'Pending');
  }

  toggleIssueSelection(issueId: string) {
    this.selectedIssues.has(issueId) ? this.selectedIssues.delete(issueId) : this.selectedIssues.add(issueId);
  }

  countStatus(status: string) {
    return this.issues.filter(issue => issue.status === status).length;
  }
}
