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
  userEmail: string | null = localStorage.getItem('user_email');
  votedIssues: { [key: string]: string } = {};
  

  constructor(private issuesService: IssuesService) {}

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('user_email');
    console.log('Logged-in user:', this.userEmail);  // Debugging: Check email
    this.loadIssues();
  }
  

  // Load all issues
  loadIssues(): void {
    this.issuesService.getIssues().subscribe({
      next: (data) => {
        console.log("Fetched Issues:", data);
        this.issues = data;
        
      },
      error: (err) => console.error('Error fetching issues:', err)
    });
  }


  // Load comments for a specific issue
  loadComments(issueId: string): void {
    this.issuesService.getComments(issueId).subscribe({
      next: (data) => this.comments[issueId] = data,
      error: (err) => console.error('Error fetching comments:', err)
    });
  }

  // Submit a new comment
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

  // Delete a comment (only if the user owns it)
  deleteComment(commentId: string, issueId: string): void {
    this.issuesService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments[issueId] = this.comments[issueId].filter(comment => comment._id !== commentId);
      },
      error: (err) => console.error('Error deleting comment:', err)
    });
  }



   // Upvote an issue
upvoteIssue(issueId: string): void {
  this.issuesService.voteIssue(issueId, 'upvote').subscribe({
    next: (response) => {
      this.updateIssueVotes(issueId, response.votes);
    },
    error: (err) => console.error('Error upvoting issue:', err)
  });
}

// Downvote an issue
downvoteIssue(issueId: string): void {
  this.issuesService.voteIssue(issueId, 'downvote').subscribe({
    next: (response) => {
      this.updateIssueVotes(issueId, response.votes);
    },
    error: (err) => console.error('Error downvoting issue:', err)
  });
}

// Update UI votes count
updateIssueVotes(issueId: string, newVotes: number): void {
  const issue = this.issues.find(i => i._id === issueId);
  if (issue) {
    issue.votes = newVotes;  // Update the votes count in the UI
  }
}



  // Load the user's votes for issues
  loadUserVotes(): void {
    this.votedIssues = {};
    this.issues.forEach(issue => {
      if (issue.votes && issue.votes[this.userEmail!]) {
        this.votedIssues[issue._id] = issue.votes[this.userEmail!];
      }
    });
  }

  vote(issueId: string, voteType: 'upvote' | 'downvote'): void {
    this.issuesService.voteIssue(issueId, voteType).subscribe({
      next: (response) => {
        this.updateIssueVotes(issueId, response.votes);
      },
      error: (err) => console.error('Error voting:', err)
    });
  }
  
}
