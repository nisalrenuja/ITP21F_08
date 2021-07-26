/* global describe, test, document, expect */
import React from "react";
import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import What from "./What";

describe("AboutUsModule - What.jsx", () => {
  test("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<What />, div);
  });

  test("render with correct title", () => {
    const titleText = "What is MS Club of SLIIT ?";
    render(<What />);
    expect(screen.queryByText(titleText)).toBeInTheDocument();
  });
});
