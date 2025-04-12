import { Component, OnInit } from '@angular/core';
import { IssuesService } from '../../services/issues.service';
import { SharedModule } from '../../shared/shared/shared.module';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  issues: any[] = [];
  comments: { [key: string]: any[] } = {};
  newComment: { [key: string]: string } = {};
  votedIssues: { [key: string]: string } = {};
  userEmail: string | null = localStorage.getItem('user_email');

  constructor(private issuesService: IssuesService) {}

  ngOnInit(): void {
    this.loadIssues();
  }

  loadIssues(): void {
    this.issuesService.getIssues().subscribe({
      next: (data) => {
        this.issues = data;
        this.loadUserVotes();
      },
      error: (err) => console.error('Error fetching issues:', err)
    });
  }

  loadComments(issueId: string): void {
    this.issuesService.getComments(issueId).subscribe({
      next: (data) => (this.comments[issueId] = data),
      error: (err) => console.error('Error fetching comments:', err)
    });
  }

  submitComment(issueId: string): void {
    const commentText = this.newComment[issueId]?.trim();
    if (!commentText) return;

    this.issuesService.addComment(issueId, commentText).subscribe({
      next: () => {
        this.newComment[issueId] = '';
        this.loadComments(issueId);
      },
      error: (err) => console.error('Error adding comment:', err)
    });
  }

  deleteComment(commentId: string, issueId: string): void {
    this.issuesService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments[issueId] = this.comments[issueId].filter(comment => comment._id !== commentId);
      },
      error: (err) => console.error('Error deleting comment:', err)
    });
  }

  vote(issueId: string, voteType: 'upvote' | 'downvote'): void {
    this.issuesService.voteIssue(issueId, voteType).subscribe({
      next: (response) => {
        this.updateIssueVotes(issueId, response.votes);
      },
      error: (err) => console.error(`Error ${voteType}ing issue:`, err)
    });
  }

  updateIssueVotes(issueId: string, newVotes: number): void {
    const issue = this.issues.find(i => i._id === issueId);
    if (issue) {
      issue.votes = newVotes;
    }
  }

  loadUserVotes(): void {
    this.votedIssues = {};
    this.issues.forEach(issue => {
      if (issue.votes && this.userEmail && issue.votes[this.userEmail]) {
        this.votedIssues[issue._id] = issue.votes[this.userEmail];
      }
    });
  }
}
