import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcatenationToolComponent } from '../concatenation-tool/concatenation-tool.component';

describe('ConcatenationToolComponent', () => {
  let component: ConcatenationToolComponent;
  let fixture: ComponentFixture<ConcatenationToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConcatenationToolComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcatenationToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
