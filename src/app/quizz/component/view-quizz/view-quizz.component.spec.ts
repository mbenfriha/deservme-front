import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuizzComponent } from './view-quizz.component';

describe('ViewQuizzComponent', () => {
  let component: ViewQuizzComponent;
  let fixture: ComponentFixture<ViewQuizzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewQuizzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
