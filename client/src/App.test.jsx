import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders navbar", () => {
    render(<App />);
    const navElement = screen.getAllByText(/IMGXR/i);
    expect(navElement).toBeInTheDocument();
});
