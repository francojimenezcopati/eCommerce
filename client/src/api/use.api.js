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
            'Authorization': `Bearer ${accessToken}`
        },
    })

    const data = await res.json();

    return data;
};

export const ProductDetails = async (pk) => {
    const res = await fetch(endpoints_urls.products + `${pk}/`);
    const data = await res.json();

    console.log(data);
    return data;
};

// #endregion

// #region OrderProducts

export const listOrderProducts = async (accessToken) => {
    const res = await fetch(endpoints_urls.orderProducts, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${accessToken}`
        },
    });

    const data = await res.json();

    return data;
};

export const OrderProductDetails = async (pk) => {
    const res = await fetch(endpoints_urls.orderProducts + `${pk}/`);
    const data = await res.json();

    console.log(data);
    return data;
};

// #endregion

// #region Profiles

export const listProfiles = async () => {
    const res = await fetch(endpoints_urls.profiles);
    const data = await res.json();

    console.log(data);
    return data;
};

export const ProfileDetails = async (pk) => {
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
