import { Component, OnInit } from '@angular/core';
import {Choice, Question, Quizz} from '../models/quizz';

@Component({
  selector: 'app-create-quizz',
  templateUrl: './create-quizz.component.html',
  styleUrls: ['./create-quizz.component.scss']
})
export class CreateQuizzComponent implements OnInit {

  quizz: Quizz;
  question: Question;
  answer: Choice;
  answers: [Choice];

  constructor() { }

  ngOnInit() {
    this.quizz = new Quizz;
    this.quizz.title = '';
    this.question = new Question;
    this.question.name = '';
    this.quizz.questions = [this.question];
    console.log(this.quizz);
    this.answers = [new Choice] ;
    this.answers.push(new Choice);
    this.answers[0].name = '';
    this.answers[1].name = '';
    this.answers[0].rep = true;
    this.answers[1].rep = false;
    this.quizz.questions[0].choices = this.answers;
    console.log(this.quizz);
  }

  uncheckAll(q, a) {
    if (!this.quizz.questions[q].choices[a].rep) {
      this.quizz.questions[q].choices.map(v => v.rep = false);
      this.quizz.questions[q].choices[a].rep = true;
    }
  }

  addAnswer(nbr) {
    console.log(nbr);
    this.answer = new Choice;
    this.answer.name = '';
    this.answer.rep = false;
    this.quizz.questions[nbr].choices.push(this.answer);
  }

  addQuestion() {
    this.question = new Question;
    this.question.name = '';
    this.answers = [new Choice] ;
    this.answers.push(new Choice);
    this.answers[0].name = '';
    this.answers[1].name = '';
    this.answers[0].rep = true;
    this.answers[1].rep = false;
    this.question.choices = this.answers;
    this.quizz.questions.push(this.question);
  }
}
