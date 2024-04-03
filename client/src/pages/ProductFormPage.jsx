import React from "react";
import { useId } from "react";

const ProductFormPage = () => {
    const titleId = useId();
    const priceId = useId();
    const descId = useId()
    const stockId = useId()
    const thumbnailId = useId()
    const imagesId = useId()

    const handleClick = (e) => {
        e.preventDefault()
        const title = document.getElementById(titleId).value;
        const price = document.getElementById(priceId).value;
        const description = document.getElementById(descId).value;
        const stock = document.getElementById(stockId).value;
        const thumbnail = document.getElementById(thumbnailId).files[0];
        console.log(thumbnail);
        console.log(title);
    }

    return (
        <div className="border border-cyan-50 rounded p-4">
            <form action="POST">
                <div className="my-3 ">
                    <div className="my-3">
                        <label htmlFor="titleId">Title: </label>
                        <input className="text-gray-900 p-0.5" type="text" id={titleId} required/>
                    </div>
                    <div className="my-3">
                        <label htmlFor={priceId}>Price: </label>
                        <input className="text-gray-900 p-0.5" type="number" step="0.01" min={0} id={priceId} required/>
                    </div>
                    <div className="my-3">
                        <label htmlFor={descId}>Desc: </label>
                        <textarea className="text-gray-900 p-0.5" type="area" id={descId}/>
                    </div>
                    <div className="my-3">
                        <label htmlFor={stockId}>Available stock: </label>
                        <input className="text-gray-900 p-0.5" type="number" min='0' id={stockId} required/>
                    </div>
                    <div className="my-3">
                        <label htmlFor={thumbnailId}>Thumbnail: </label>
                        <input type="file" id={thumbnailId} accept="image/png, image/jpeg" required/>
                    </div>
                    <div className="my-3">
                        <label htmlFor={imagesId}>Images: </label>
                        <input type="file" id={imagesId} accept="image/png, image/jpeg" multiple />
                    </div>
                </div>
                <br />
                <button className="btn btn-blue" onClick={handleClick}>Save</button>
            </form>
        </div>
    );
};

export default ProductFormPage;
