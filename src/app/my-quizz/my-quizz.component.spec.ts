import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQuizzComponent } from './my-quizz.component';

describe('MyQuizzComponent', () => {
  let component: MyQuizzComponent;
  let fixture: ComponentFixture<MyQuizzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyQuizzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
