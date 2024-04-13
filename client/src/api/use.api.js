export const BASE_URL = "http://127.0.0.1:8000/api/";

const endpoints_urls = {
    orderProducts: BASE_URL + "orders/products/",
    products: BASE_URL + "products/",
    profiles: BASE_URL + "profiles/",
};

// #region Products

export const listProducts = async (accessToken) => {
    const res = await fetch(endpoints_urls.products, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const data = await res.json();

    return data;
};

export const productDetails = async (pk) => {
    const res = await fetch(endpoints_urls.products + `${pk}/`);
    const data = await res.json();

    console.log(data);
    return data;
};

// #endregion

// #region OrderProducts

export const getOrderProducts = async (accessToken) => {
    const res = await fetch(endpoints_urls.orderProducts, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const data = await res.json();

    const orderProducts = [];
    if (data) {
        data.map((orderProduct) => {
            orderProduct.product['quantity'] = orderProduct.quantity
            orderProducts.push(orderProduct.product);
        });
    }

    return orderProducts;
};

export const orderProductDetails = async (pk) => {
    const res = await fetch(endpoints_urls.orderProducts + `${pk}/`);
    const data = await res.json();

    console.log(data);
    return data;
};

export const createOrderProduct = async (productId, accessToken) => {
    // PORQUE SIEMPRE QUE HACEMOS UNA LLAMADA A ESTA URL CON POST, ES PARA PONER UN NUEVO OrderProduct,
    // por lo tanto siempre tendra un quantity=1. Es decir, esto solo se llama si el producto NO esta en el carrito.
    const res = await fetch(endpoints_urls.orderProducts, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ productId }),
    });
    const data = await res.json();

    return data;
};

export const updateOrderProduct = async (productId, quantity, accessToken) => {
    // Aca se actualiza un order product ya existente, ya sea para sumarle o restarle el quantity
    const res = await fetch(endpoints_urls.orderProducts + `${productId}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ quantity }),
    });
    const data = await res.json();

    return data;
};

export const deleteOrderProduct = async (productId, accessToken) => {
    const res = await fetch(endpoints_urls.orderProducts + `${productId}/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        }
    });
    const data = await res.json();

    return data;
}

export const clearOrder = async (accessToken) => {
    const res = await fetch(endpoints_urls.orderProducts, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        }
    });
    const data = await res.json();

    return data;
}


// #endregion

// #region Profiles

export const listProfiles = async () => {
    const res = await fetch(endpoints_urls.profiles);
    const data = await res.json();

    console.log(data);
    return data;
};

export const profileDetails = async (pk) => {
    const res = await fetch(endpoints_urls.profiles + `${pk}/`);
    const data = await res.json();

    console.log(data);
    return data;
};

// #endregion

// #region Tokens

export const loginUser = async (username, password) => {
    const res = await fetch(BASE_URL + "token/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (res.status === 200) {
        return data;
    } else {
        return null;
    }
};

// #endregion
