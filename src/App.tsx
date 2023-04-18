import React, { useEffect, useState } from "react";
import { quizApi } from "./apis";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    quizApi.createNewQuiz().then((data) => console.log(data));
  });

  return <div className="App" />;
}

export default App;
