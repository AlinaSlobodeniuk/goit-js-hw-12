import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api";

import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton
} from "./js/render-functions"



const form = document.querySelector('.form');
const input = form.querySelector('[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');


let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
let loadedHits = 0;

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    currentQuery = input.value.trim();
    if (!currentQuery) {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search query.',
            position: 'topRight',
        });
        return
    }
    
    currentPage = 1;
    loadedHits = 0;
    clearGallery();
    hideLoadMoreButton();
    showLoader();

    try {
        const data = await getImagesByQuery(currentQuery, currentPage);
        totalHits = data.totalHits;

        if (data.hits.length === 0) {
            iziToast.info({
                    title: 'No Results',
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                });
        } else {
            createGallery(data.hits);
            loadedHits += data.hits.length;
            if (loadedHits < totalHits) {
                showLoadMoreButton();
            }
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Failed to fetch images. Please try again later.',
            position: 'topRight',
        })
    } finally {
        hideLoader();
    }
});

loadMoreBtn.addEventListener('click', async () => {
    currentPage++;
    showLoader();
    hideLoadMoreButton();

    try {
        const data = await getImagesByQuery(currentQuery, currentPage);
        createGallery(data.hits);
        loadedHits += data.hits.length;

        smoothScroll();

        if (loadedHits < totalHits) {
            showLoadMoreButton();
        } else {
            iziToast.info({
                title: 'End of results',
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
            })
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Failed to fetch more images.',
            position: 'topRight',
        })
    } finally {
        hideLoader();
    }
});

function smoothScroll() {
    const card = document.querySelector(".gallery-item");
    if (card) {
        const cardHeight = card.getBoundingClientRect().height;
        window.scrollBy({
            left: 0,
            top: cardHeight * 2,
            behavior: "smooth"
        });
    }
}