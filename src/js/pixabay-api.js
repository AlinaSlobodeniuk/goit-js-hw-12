import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { createGallery, hideLoader } from "./render-functions";

const API_KEY = '49743900-b0f1cd5437de5205d7989fbc4';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export async function getImagesByQuery(query, page = 1) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: PER_PAGE,
        page,
    });

    try {
        const response = await axios.get(`${BASE_URL}?${params}`);
        return response.data
    } catch (error) {
        console.log(error);
            throw error;
    }
}