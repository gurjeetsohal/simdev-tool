import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceTaskInfoComponent } from './source-task-info.component';

describe('SourceTaskInfoComponent', () => {
  let component: SourceTaskInfoComponent;
  let fixture: ComponentFixture<SourceTaskInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SourceTaskInfoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceTaskInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
