import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../services/issue.service';
import { SharedModule } from '../../shared/shared/shared.module';
@Component({
  selector: 'app-home',
  imports:[SharedModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  latestIssues: any[] = [];

  constructor(private issueService: IssueService) {}

  ngOnInit(): void {
    this.issueService.getLatestIssues().subscribe((data) => {
      this.latestIssues = data;
    });
  }
  
}
