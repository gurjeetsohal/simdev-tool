import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskidInputComponent } from './taskid-input.component';

describe('TaskidInputComponent', () => {
  let component: TaskidInputComponent;
  let fixture: ComponentFixture<TaskidInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskidInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskidInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
