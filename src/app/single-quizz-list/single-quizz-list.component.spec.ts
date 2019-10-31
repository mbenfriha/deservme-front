import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleQuizzListComponent } from './single-quizz-list.component';

describe('SingleQuizzListComponent', () => {
  let component: SingleQuizzListComponent;
  let fixture: ComponentFixture<SingleQuizzListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleQuizzListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleQuizzListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
