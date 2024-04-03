import { Route, BrowserRouter, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <NavBar />
                <div className="container mx-9">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <HomePage />
                                </PrivateRoute>
                            }
                            exact
                        />
                        <Route path="/login" element={<LoginPage />} />
                    </Routes>
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
