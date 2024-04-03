const ProductCard = ({ product }) => {
    return (
        <div className="m-5 border-gray-600 border bg-slate-800 text-cyan-50 rounded p-4 max-w-sm hover:cursor-pointer hover:border-gray-400 ">
            <div className="items-center">
                <img src={`http://localhost:8000${product.thumbnail}`} alt="Product thumbnail" className="w-2/5"/>
            </div>
            <div className="text-center mt-2">
                <strong>{product.title}</strong>
                <br />
                <span>Price: {product.price}</span>
            </div>
        </div>
    );
};

export default ProductCard;
