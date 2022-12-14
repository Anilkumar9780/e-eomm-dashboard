import axios from "axios";

import { URLS } from "./config/URL";

export const REGISTER_USER = async (name, email, password) => {
    return await axios.post(`${URLS.REGISTRATION_USER}`, name, email, password);
};


export const GET_PRODUCTS_LIST = async () => {
    return await axios.get(`${URLS.GET_PRODUCTS_LIST}`, {
        headers: {
            authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
    });
};

export const DELETE_PRODUCT = async (id) => {
    return await axios.delete(URLS.DELETE_PRODUCT.replace("#ID#", id), {
        headers: {
            authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
    });
};


