import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllQuizzComponent } from './all-quizz.component';

describe('AllQuizzComponent', () => {
  let component: AllQuizzComponent;
  let fixture: ComponentFixture<AllQuizzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllQuizzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
