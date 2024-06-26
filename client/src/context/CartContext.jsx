import { useContext } from "react";
import { useEffect } from "react";
import { useReducer, createContext } from "react";
import { getOrderProducts } from "../api/use.api";
import AuthContext from "./AuthContext";

export const CartContext = createContext();

const CART_ACTION_TYPES = {
    ADD_TO_CART: "ADD_TO_CART",
    REMOVE_FROM_CART: "REMOVE_FROM_CART",
    CLEAR_CART: "CLEAR_CART",
    INITIALIZE_CART: "INITIALIZE_CART",
};

const initialState = [];

const reducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.ADD_TO_CART: {
            const { id } = payload;
            const productInCartIndex = state.findIndex((product) => product.id === id);

            if (productInCartIndex >= 0) {
                const newState = [
                    ...state.slice(0, productInCartIndex),
                    { ...state[productInCartIndex], quantity: state[productInCartIndex].quantity + 1 },
                    ...state.slice(productInCartIndex + 1),
                ];

                return newState;
            }

            const newState = [
                ...state,
                {
                    ...payload,
                    quantity: 1,
                },
            ];

            return newState;
        }

        case CART_ACTION_TYPES.REMOVE_FROM_CART: {
            const { id } = payload;
            const productInCartIndex = state.findIndex((product) => product.id === id);

            if (state[productInCartIndex].quantity >= 2) {
                const newState = [
                    ...state.slice(0, productInCartIndex),
                    { ...state[productInCartIndex], quantity: state[productInCartIndex].quantity - 1 },
                    ...state.slice(productInCartIndex + 1),
                ];

                return newState;
            }

            const newState = state.filter((product) => product.id !== id);
            return newState;
        }

        case CART_ACTION_TYPES.INITIALIZE_CART: {
            return payload
        }

        case CART_ACTION_TYPES.CLEAR_CART: {
            return initialState;
        }

        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const { tokens } = useContext(AuthContext);
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if(tokens){
            getOrderProducts(tokens.access).then(cart => initializeCart(cart))
        }
    }, [tokens])

    const addToCart = (product) =>
        dispatch({
            type: CART_ACTION_TYPES.ADD_TO_CART,
            payload: product,
        });

    const removeFromCart = (product) =>
        dispatch({
            type: CART_ACTION_TYPES.REMOVE_FROM_CART,
            payload: product,
        });

    const clearCart = () =>
        dispatch({
            type: CART_ACTION_TYPES.CLEAR_CART,
        });

    const initializeCart = (cart) => {dispatch({ type: CART_ACTION_TYPES.INITIALIZE_CART, payload: cart })};

    const contextData = {
        addToCart,
        removeFromCart,
        clearCart,
        cart: state,
    };

    return <CartContext.Provider value={contextData}>{children}</CartContext.Provider>;
};
