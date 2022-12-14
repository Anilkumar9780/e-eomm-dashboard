// api url 
const BASE_URL = process.env.REACT_APP_API;

export const URLS = {

    GET_PRODUCTS_LIST: `${BASE_URL}/products`,

    REGISTRATION_USER: `${BASE_URL}/signup`,

    DELETE_PRODUCT: `${BASE_URL}/product/#ID#`,

    EDIT_UPDATE_PRODUCT: `${BASE_URL}/product/#ID#`,

    ADD_PRODUCT: `${BASE_URL}/add-product`,
}