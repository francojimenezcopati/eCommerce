import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { THUMBNAIL_PREFIX } from "../constants/constants";
import { useCart } from "../hooks/useCart";
import { AddToCartIcon, RemoveFromCartIcon } from "../utils/Icons";
import AuthContext from '../context/AuthContext'
import { createOrderProduct, deleteOrderProduct } from "../api/use.api";

const SmallProductCard = ({ product }) => {
    const navigate = useNavigate();
    const {tokens} = useContext(AuthContext)
    const { addToCart, removeFromCart, cart } = useCart();

    const checkProductInCart = (product) => {
        return cart.some((item) => item.id === product.id);
    };

    const handleCardClick = (e) => {
        if (e.target.id !== `addToCart` && !e.target.matches('svg')) {
            // navigate(`/products/${product.id}`);
            console.log(`go to the id ${product.id}`);
        }
    };

    
    const isProductInCart = checkProductInCart(product);
    
    const handleAddToCartClick = () => {
        if(isProductInCart){
            removeFromCart(product)
            deleteOrderProduct(product.id, tokens.access).then(res => console.log(res))
        }else{
            createOrderProduct(product.id, tokens.access).then(res => console.log(res))
            addToCart(product)
        }
    };
    
    return (
        <div
            onClick={handleCardClick}
            className="m-5 border rounded p-4 flex justify-between max-w-md hover:cursor-pointer hover:border-gray-400 bg-slate-800 text-cyan-50 border-gray-600"
        >
            <div className="w-1/3">
                <img src={`${THUMBNAIL_PREFIX}${product.thumbnail}`} alt={product.title} className="rounded-lg" />
            </div>
            <div className="text-center p-2 self-center">
                <strong >{product.title}</strong>
                <br />
                <span >${product.price}</span>
            </div>
            <div className="p-3 self-center">
                <button id="addToCart" className={`rounded p-2  ${isProductInCart ? 'bg-red-700' : 'bg-blue-700' }`} onClick={handleAddToCartClick}>
                    {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                </button>
            </div>
        </div>
    );
};

export default SmallProductCard;
