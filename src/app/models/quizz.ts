export class Quizz {
  _id: string;
  title: string;
  user_id: string;
  questions: [Question];
}

export class Question {
  _id: string
  name: string;
  choices: [Choice];
}

export class Choice {
  name: string;
  rep: boolean;
}
