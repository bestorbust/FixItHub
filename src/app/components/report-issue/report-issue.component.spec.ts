import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReportIssueComponent } from './report-issue.component';

describe('ReportIssueComponent', () => {
  let component: ReportIssueComponent;
  let fixture: ComponentFixture<ReportIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportIssueComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
