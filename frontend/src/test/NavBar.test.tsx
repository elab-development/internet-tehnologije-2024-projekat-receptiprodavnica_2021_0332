
import { render, screen } from "@testing-library/react"; 

import App from "../App.js"; 

test("If NavBar is showing", () => { 

render(<App/>) 

 const message = screen.queryByText("CookMate") 

expect(message).toBeVisible() 

}) 