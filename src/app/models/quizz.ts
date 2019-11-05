export class Quizz {
  _id: string;
  title: string;
  user_id: string;
  answer_count: number;
  avatar: string;
  avatar_type: string;
  createdAt: string;
  questions: [Question];
  username: string;
  private: boolean;
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
