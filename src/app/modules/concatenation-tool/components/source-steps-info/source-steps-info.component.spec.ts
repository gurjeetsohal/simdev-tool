import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceStepsInfoComponent } from './source-steps-info.component';

describe('SourceStepsInfoComponent', () => {
  let component: SourceStepsInfoComponent;
  let fixture: ComponentFixture<SourceStepsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SourceStepsInfoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceStepsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
