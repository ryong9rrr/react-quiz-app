import { requestBuilder } from "@/lib/axios";
import { Quiz, QuizResponseType } from "@/models/Quiz";

const { VITE_QUIZ_API_END_POINT } = import.meta.env;

type ResponseData = {
  response_code: number;
  results: QuizResponseType[];
};

const quizApiRequest = requestBuilder({
  baseURL: VITE_QUIZ_API_END_POINT,
  timeout: 3000,
  headers: { "Content-Type": "application/json" },
});

export const createNewQuiz = async () => {
  const response = await quizApiRequest.get("", {
    params: { amount: 10, type: "multiple" },
  });

  if (response.data && response.data.response_code !== 0) {
    throw new Error("data is nothing. Probably url is wrong.");
  }

  const quizList = response.data as ResponseData;

  return { ...quizList, results: quizList.results.map((quiz) => new Quiz(quiz)) };
};
