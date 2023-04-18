import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage, QuizPage, ResultPage, CheckNotePage, NotFoundPage, PATH } from "./pages";

export default function Router() {
  return (
    <Routes>
      <Route path={PATH.HOME} element={<HomePage />} />
      <Route path={PATH.QUIZ} element={<QuizPage />} />
      <Route path={PATH.RESULT} element={<ResultPage />} />
      <Route path={PATH.CHECK_NOTE} element={<CheckNotePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
