import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MyIssuesComponent } from './my-issues.component';

describe('MyIssuesComponent', () => {
  let component: MyIssuesComponent;
  let fixture: ComponentFixture<MyIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyIssuesComponent,HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
