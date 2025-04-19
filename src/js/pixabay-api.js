import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { createGallery, hideLoader } from "./render-functions";

const API_KEY = '49743900-b0f1cd5437de5205d7989fbc4';

export default function getImagesByQuery(query) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true
    });

    return axios.get(`https://pixabay.com/api/?${params}`)
        .then(({ data }) => {
            return data.hits
        })
        .catch(error => {
            console.log(error);
            throw error;
        });
}