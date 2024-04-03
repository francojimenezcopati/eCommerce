import { useNavigate } from "react-router-dom";
import { AddToCartIcon, RemoveFromCartIcon } from "../utils/Icons";

const SmallProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleCardClick = (e) => {
        // console.log(e.target);
        if (e.target.id !== "addToCart" && !e.target.matches('svg')) {
            // navigate(`/products/${product.id}`);
            console.log(`go to the id ${product.id}`);
        }
    };

    const handleAddToCartClick = () => {
        console.log(`Añadir ${product.title} al carrito`);
    };

    const isProductInCart = false;

    return (
        <div
            onClick={handleCardClick}
            className="m-5 border rounded p-4 flex justify-between max-w-md hover:cursor-pointer hover:border-gray-400 bg-slate-800 text-cyan-50 border-gray-600"
        >
            <div className="w-1/3">
                <img src={`http://localhost:8000${product.thumbnail}`} alt={product.title} className="rounded-lg" />
            </div>
            <div className="text-center p-2 self-center">
                <strong >{product.title}</strong>
                <br />
                <span >${product.price}</span>
            </div>
            <div className="p-3 self-center">
                <button id="addToCart" className="bg-blue-700 rounded p-2" onClick={handleAddToCartClick}>
                    {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                </button>
            </div>
        </div>
    );
};

export default SmallProductCard;
