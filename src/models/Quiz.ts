import lodash from "lodash";

interface UtilImpl {
  escape(string?: string | undefined): string;
}

export type QuizResponseType = {
  category: string;
  type: "multiple";
  difficulty: "easy" | "medium" | "hard";
  question: string;
  correct_answer: string;
  incorrect_answers: [string, string, string];
};

export class Quiz {
  private _category: string;
  private _type: "multiple";
  private _difficulty: "easy" | "medium" | "hard";
  private _question: string;
  private _correctAnswer: string;
  private _incorrectAnswers: [string, string, string];

  constructor(quiz: QuizResponseType, _: UtilImpl = lodash) {
    const { category, type, difficulty, question, correct_answer, incorrect_answers } = quiz;
    this._category = category;
    this._type = type;
    this._difficulty = difficulty;
    this._question = _.escape(question);
    this._correctAnswer = _.escape(correct_answer);
    this._incorrectAnswers = incorrect_answers.map((incorrectAnswer) =>
      _.escape(incorrectAnswer),
    ) as [string, string, string];
  }

  get category() {
    return this._category;
  }

  get type() {
    return this._type;
  }

  get difficulty() {
    return this._difficulty;
  }

  get question() {
    return this._question;
  }

  get correctAnswer() {
    return this._correctAnswer;
  }

  get incorrectAnswers() {
    return this._incorrectAnswers;
  }
}
