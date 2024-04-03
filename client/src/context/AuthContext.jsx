import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, BASE_URL } from "../api/use.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const localTokens = () => JSON.parse(localStorage.getItem("tokens"));

    const [tokens, setTokens] = useState(localTokens);
    const [loading, setLoading] = useState(true);

    const handleLogin = async (username, password) => {
        const data = await loginUser(username, password);

        if (data) {
            setTokens(data);
            localStorage.setItem("tokens", JSON.stringify(data));
            navigate("/");
        } else {
            alert("Something went wrong!");
        }
    };

    const handleLogout = () => {
        setTokens(null);
        localStorage.removeItem("tokens");
        navigate("/login/");
    };

    const updateToken = async () => {
        const res = await fetch(BASE_URL + "token/refresh/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: tokens?.refresh }),
        });
        const data = await res.json();

        if (res.status === 200) {
            setTokens(data);
            localStorage.setItem("tokens", JSON.stringify(data));
        } else {
            handleLogout();
        }

        if (loading) {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (loading) {
            updateToken();
        }

        const fourMinutes = 1000 * 60 * 4;
        const intervalId = setInterval(() => {
            if (tokens) {
                updateToken();
            }
        }, fourMinutes);

        return () => clearInterval(intervalId);
    }, [tokens, loading]);

    const contextData = {
        handleLogin,
        tokens,
        handleLogout,
    };

    return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

export default AuthContext;
