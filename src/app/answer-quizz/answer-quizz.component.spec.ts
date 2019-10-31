import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerQuizzComponent } from './answer-quizz.component';

describe('AnswerQuizzComponent', () => {
  let component: AnswerQuizzComponent;
  let fixture: ComponentFixture<AnswerQuizzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerQuizzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
