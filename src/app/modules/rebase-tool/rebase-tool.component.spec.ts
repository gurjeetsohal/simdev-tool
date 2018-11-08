import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RebaseToolComponent } from '../rebase-tool/rebase-tool.component';

describe('RebaseToolComponent', () => {
  let component: RebaseToolComponent;
  let fixture: ComponentFixture<RebaseToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RebaseToolComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RebaseToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
