export class Answer {
  _id: string;
  title: string;
  user_id: string;
  username: string;
  avatar: string;
  avatar_type: string;
  createdAt: string;
  questions: [Question];
}

export class Question {
  _id: string;
  question_id: string;
  name: string;
  answer: Choice;
}

export class Choice {
  name: string;
  rep: boolean;
}
