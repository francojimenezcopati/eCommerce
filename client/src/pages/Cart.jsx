import "../Cart.css";
import { useId } from "react";
import { CartIcon, ClearCartIcon } from "../utils/Icons";
import { THUMBNAIL_PREFIX } from "../constants/constants";
import { useCart } from "../hooks/useCart";
import { clearOrder, updateOrderProduct } from "../api/use.api";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function CartItem({ thumbnail, price, title, quantity, increaseQuantity, substractQuantity}) {
    return (
        <li>
            <img src={`${THUMBNAIL_PREFIX}${thumbnail}`} alt={title} />
            <div>
                <strong>{title}</strong> - ${price}
            </div>

            <footer>
                <small>Qty: {quantity}</small>
                <button disabled={quantity <= 1 ? true : false} onClick={substractQuantity}>
                    -
                </button>
                <button onClick={increaseQuantity}>+</button>
            </footer>
        </li>
    );
}

const Cart = () => {
    const cartCheckboxId = useId();
    const { addToCart, cart, clearCart, removeFromCart } = useCart();
    const {tokens} = useContext(AuthContext)
    const {access} = tokens

    const handleClearCart = () => {
        clearCart()
        clearOrder(access).then(data => console.log(data))
    }

    const handleIncreaseQuantity = (product) => {
        addToCart(product);
        updateOrderProduct(product.id, product.quantity+1, access).then(data => console.log(data))
    };

    const handleSubstractQuantity = (product) => {
        removeFromCart(product);
        updateOrderProduct(product.id, product.quantity-1, access).then(data => console.log(data));
    };

    return (
        <>
            <label className="cart-button" htmlFor={cartCheckboxId}>
                <CartIcon />
            </label>
            <input id={cartCheckboxId} type="checkbox" hidden />

            <aside className="cart">
                <ul>
                    {cart.map((product) => (
                        <CartItem
                            key={product.id}
                            substractQuantity={() => handleSubstractQuantity(product)}
                            increaseQuantity={() => handleIncreaseQuantity(product)}
                            {...product}
                        />
                    ))}
                </ul>

                <div className="grid" id="ClearCartIcon">
                    <button onClick={handleClearCart}  className="place-self-center">
                        <ClearCartIcon />
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Cart;
