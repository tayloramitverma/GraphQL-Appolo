import { render, screen } from "@testing-library/react";
import Form from "../components/Form";

test("render component", () => {
  render(<Form />);

  const ele = screen.getByRole("button", { name: "Login" });
  expect(ele).toBeInTheDocument();
});
