import React from "react";
import { render, screen } from "@testing-library/react"
import  index  from "../pages/index"

it('renders: h1', () => {
    render(<DatePicker />);
        const myElement = screen.getByText('Meine Termine');
        expect(myElement).toBeInTheDocument();
})

