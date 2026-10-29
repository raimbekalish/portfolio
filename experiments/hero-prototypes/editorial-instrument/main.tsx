import { createRoot } from "react-dom/client";
import EditorialInstrument from "./EditorialInstrument";
import "../shared/base.css";
import "./editorial-instrument.css";

// StrictMode is omitted so the one-time opening is not double-invoked in development.
createRoot(document.getElementById("root")!).render(<EditorialInstrument />);
