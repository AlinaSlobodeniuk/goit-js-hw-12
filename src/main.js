import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import getImagesByQuery from "./js/pixabay-api";

import { createGallery, clearGallery, showLoader, hideLoader } from "./js/render-functions"



const form = document.querySelector('.form');
const input = form.querySelector('[name="search-text"]')

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = input.value.trim();
    if (!query) {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search query.',
            position: 'topRight',
        });
        return
    }
    
    clearGallery();
    showLoader();

    getImagesByQuery(query)
        .then((images) => {
            if (images.length > 0) {
                createGallery(images)
            } else {
                iziToast.info({
                    title: 'No Results',
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                });
            }
        })
        .catch ((error) => {
        console.log(error);
        iziToast.error({
            title: 'Error',
            message: 'Failed to fetch images. Please try again later.',
            position: 'topRight',
        });
    })
        .finally(() => {
            hideLoader()
        });
    
});