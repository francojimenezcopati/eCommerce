import { useState } from "react";
import { useContext } from "react";

export const CartContext = useContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevState) => {
            [
                ...prevState,
                {
                    ...product,
                    quantity: 1,
                },
            ];
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    const contextData = {
        clearCart,
        addToCart,
        cart,
    };

    return <CartContext.Provider value={contextData}>{children}</CartContext.Provider>;
};
