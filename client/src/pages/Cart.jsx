import "../Cart.css";
import { useId } from "react";
import { CartIcon, ClearCartIcon } from "../utils/Icons";
import { THUMBNAIL_PREFIX } from "../constants/constants";
import { useCart } from "../hooks/useCart";

function CartItem({ thumbnail, price, title, quantity, addToCart, removeFromCart }) {
    return (
        <li>
            <img src={`${THUMBNAIL_PREFIX}${thumbnail}`} alt={title} />
            <div>
                <strong>{title}</strong> - ${price}
            </div>

            <footer>
                <small>Qty: {quantity}</small>
                <button disabled={quantity <= 1 ? true : false} onClick={removeFromCart}>
                    -
                </button>
                <button onClick={addToCart}>+</button>
            </footer>
        </li>
    );
}

const Cart = () => {
    const cartCheckboxId = useId();
    const { addToCart, cart, clearCart, removeFromCart } = useCart();

    return (
        <>
            <label className="cart-button" htmlFor={cartCheckboxId}>
                <CartIcon />
            </label>
            <input id={cartCheckboxId} type="checkbox" hidden />

            <aside className="cart ">
                <ul>
                    {cart.map((product) => (
                        <CartItem key={product.id} removeFromCart={() => removeFromCart(product)} addToCart={() => addToCart(product)} {...product} />
                    ))}
                </ul>

                <div className="grid" id="ClearCartIcon">
                    <button onClick={clearCart}  className="place-self-center">
                        <ClearCartIcon />
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Cart;
