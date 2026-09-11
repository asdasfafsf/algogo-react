import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import Landing from "@/page/Landing";
import "../../src/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MemoryRouter initialEntries={["/landing"]}>
      <Landing />
    </MemoryRouter>
  </StrictMode>,
);
