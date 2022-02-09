import { request } from "./request.js";

const databaseUrl = 'https://shoeshelf-f4148-default-rtdb.firebaseio.com/';

const api = {
    shoes: `${databaseUrl}/shoes.json`,
}

export const getAllShoes = async (searchText) => {
    let res = await request(api.shoes, 'GET');

    //console.log(Object.keys(res).map(key => ({key, ...res[key]})));

    //It works without the filter part

    return Object.keys(res).map(key => ({key, ...res[key]}))//.filter(x => !searchText || searchText == key.title);
}

export const getOneById = async (id) => {
    let res = await request(`${databaseUrl}/shoes/${id}.json`, 'GET');

    return res;
}

export const addShoe = async (shoeData) => {
    let res = await request(api.shoes, 'POST', shoeData);

    return res;
}

export const editShoe = async (id, shoeData) => {
    let res = await request(`${databaseUrl}/shoes/${id}.json`, 'PATCH', shoeData);

    return res;
}

export const deleteShoe = async (id) => {
    let res = await request(`${databaseUrl}/shoes/${id}.json`, 'DELETE');

    return res;
}