import { createRoot } from "react-dom/client";
import CinematicSignal from "./CinematicSignal";
import "../shared/base.css";
import "./cinematic-signal.css";

// StrictMode is omitted so the one-time opening is not double-invoked in development.
createRoot(document.getElementById("root")!).render(<CinematicSignal />);
