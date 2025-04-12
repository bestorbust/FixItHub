import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../services/issue.service';
import { LocationService } from '../../services/location.service';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared/shared.module';

@Component({
  selector: 'app-report-issue',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.css']
})
export class ReportIssueComponent implements OnInit {
  issueData = {
    title: '',
    description: '',
    location: '',
    category: '',
    priority: 'Medium',
    contact_info: '',
    tags: [] as string[],
    tagsString: '',
    anonymous: false,
    images: [] as File[]
  };

  isSubmitting = false;
  errorMessage = '';

  constructor(
    private issueService: IssueService,
    private locationService: LocationService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      const location = await this.locationService.getCurrentLocation();
      this.issueData.location = `${location.latitude}, ${location.longitude}`;
      console.log('Location fetched:', this.issueData.location);
    } catch (error) {
      console.error('Error fetching location:', error);
      this.issueData.location = 'Unable to fetch location (Check permissions)';
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.issueData.images = Array.from(event.target.files);
    } else {
      this.issueData.images = [];
    }
  }

  updateTags() {
    this.issueData.tags = this.issueData.tagsString
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');
  }

  submitIssue() {
    this.isSubmitting = true;
    this.errorMessage = '';
    this.updateTags();

    const formData = new FormData();

    Object.entries(this.issueData).forEach(([key, value]) => {
      if (key === 'images') {
        this.issueData.images.forEach((file) => {
          formData.append('images', file, file.name);
        });
      } else if (key === 'tags') {
        (value as string[]).forEach(tag => formData.append('tags', tag));
      } else {
        formData.append(key, String(value));
      }
    });

    console.log('Submitting FormData:', [...formData.entries()]);

    this.issueService.reportIssue(formData).subscribe({
      next: () => {
        alert('Issue reported successfully!');
        // this.router.navigate(['/dashboard']);
        this.isSubmitting = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to report issue. Try again!';
        console.error('API Error:', error);
        this.isSubmitting = false;
      }
    });
  }
}
