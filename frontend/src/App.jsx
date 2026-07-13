import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Translator from "./pages/Translator";
import Saved from "./pages/Saved";
import Practice from "./pages/Practice";
import History from "./pages/History";
import Settings from "./pages/Settings";

function App() {

    return (
 
        <BrowserRouter>
          
            <Routes>

                {/* ================= PUBLIC ================= */}

                <Route
                    path="/"
                    element={<LandingPage />}
                />

                <Route
                    path="/auth"
                    element={<Auth />}
                />

                <Route
                    path="/reset-password"
                    element={<ResetPassword />}
                />

                {/* ================= DASHBOARD ================= */}

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                {/* ================= TRANSLATOR ================= */}

                <Route path="/translator/:mode" element={<Translator />} />

                {/* ================= SAVED ================= */}

                <Route
                    path="/saved"
                    element={<Saved />}
                />

                {/* ================= PRACTICE ================= */}

                <Route
                    path="/practice"
                    element={<Practice />}
                />

                {/* ================= HISTORY ================= */}

                <Route
                    path="/history"
                    element={<History />}
                />

                {/* ================= SETTINGS ================= */}

                <Route
                    path="/settings"
                    element={<Settings />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;