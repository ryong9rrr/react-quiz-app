import React from "react";
import { render, screen } from "@testing-library/react";

function App() {
  return <h1>Hello World!</h1>;
}

describe("App", () => {
  it("renders headline", () => {
    render(<App />);
    screen.getByText("Hello World!");
  });
});
