import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavAirLanding from "@/pages/NavAirLanding";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="App grain">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavAirLanding />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        theme="light"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "rgba(255, 255, 255, 0.95)",
            border: "1px solid rgba(125, 196, 164, 0.3)",
            color: "#2D3B2D",
            backdropFilter: "blur(12px)",
            borderRadius: "16px",
            fontFamily: "Nunito, sans-serif",
            fontWeight: "600",
          },
        }}
      />
    </div>
  );
}

export default App;
