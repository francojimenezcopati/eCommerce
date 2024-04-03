import React from "react";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { listProducts, listOrderProducts, listProfiles } from "../api/use.api";
import SmallProductCard from "../components/SmallProductCard";
import Cart from "./Cart";
// import ProductFormPage from "./ProductFormPage";

const HomePage = () => {
    const { tokens } = useContext(AuthContext);
    const [products, setProducts] = useState(null);

    useEffect(() => {
        listProducts(tokens.access).then((data) => {
            setProducts(data);
        });
    }, []);

    return (
        <div>
            {products && (
                <div>
                    <strong>Available Products:</strong>
                    <Cart products={products}/>
                    {/* <ul className="grid grid-cols-2 place-items-center max-w-fit">
                        {products.map((product) => (
                            <SmallProductCard key={product.id} product={product} />
                        ))}
                    </ul> */}
                </div>
            )}
        </div>
    );
};

export default HomePage;
