import React from "react";
import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Proizvodi from "./Proizvodi"; // prilagodi putanju ako je potrebno

test("prikazuje naslov i grešku ako postoji", async () => {
  render(
    <MemoryRouter>
      <Proizvodi azurirajKorpu={vi.fn()} />
    </MemoryRouter>
  );

  // Čeka da se pojavi naslov "Proizvodi"
  expect(await screen.findByText("Proizvodi")).toBeInTheDocument();
});

test("paginacija - prelazak na sledeću stranicu", async () => {
  render(
    <MemoryRouter>
      <Proizvodi azurirajKorpu={vi.fn()} />
    </MemoryRouter>
  );

  // Proveravamo da postoji paginacija
  const nextButton = await screen.findByText("Sledeća");
  expect(nextButton).toBeInTheDocument();

  // Kliknemo na dugme za sledeću stranicu
  fireEvent.click(nextButton);

  // Očekujemo da se stranica promenila (možda bi ovde trebalo simulirati useState)
  expect(await screen.findByText(/Stranica 2/i)).toBeInTheDocument();
});