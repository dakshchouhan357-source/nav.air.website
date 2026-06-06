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
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "rgba(20,20,20,0.9)",
            border: "1px solid rgba(0,240,255,0.2)",
            color: "#fff",
            backdropFilter: "blur(12px)",
          },
        }}
      />
    </div>
  );
}

export default App;
