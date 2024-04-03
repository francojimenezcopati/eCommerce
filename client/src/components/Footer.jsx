import { useCart } from "../hooks/useCart";
import "./Footer.css";

export function Footer() {
    const {cart} = useCart()

    return (
        <footer className="footer">
            {/* {JSON.stringify(cart, null)} */}
            <span>Django + React</span>
        </footer>
    );
}
