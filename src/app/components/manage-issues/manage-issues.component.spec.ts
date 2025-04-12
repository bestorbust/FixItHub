import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ManageIssuesComponent } from './manage-issues.component';

describe('ManageIssuesComponent', () => {
  let component: ManageIssuesComponent;
  let fixture: ComponentFixture<ManageIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageIssuesComponent,HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
