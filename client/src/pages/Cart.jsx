import '../Cart.css'
import { useId } from "react";
import SmallProductCard from "../components/SmallProductCard";
import { CartIcon, ClearCartIcon } from "../utils/Icons";

const Cart = ({products}) => {
    const cartCheckboxId = useId();
    console.log(products);

    return (
        <>
            <label className="cart-button" htmlFor={cartCheckboxId}>
                <CartIcon />
            </label>
            <input id={cartCheckboxId} type="checkbox" hidden />

            <aside className="cart">
                <ul>
                    {/* {cart.map((product) => (
                        <CartItem key={product.id} addToCart={() => addToCart(product)} {...product} />
                    ))} */}
                    {products.map((product) => (
                        <SmallProductCard key={product.id} product={product} />
                    ))}
                </ul>

                <button onClick={() => {console.log('a');}}>
                    <ClearCartIcon />
                </button>
            </aside>
        </>
    );
};

export default Cart;
