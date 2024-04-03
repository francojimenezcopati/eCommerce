import { Route, BrowserRouter, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { Footer } from "./components/Footer";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
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
                    <Footer/>
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
