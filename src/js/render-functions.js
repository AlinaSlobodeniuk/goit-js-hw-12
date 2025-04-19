import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector(".load-more");
let lightbox;

export function createGallery(images){
    const markup = images.map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads
    }) => `
    <li class="gallery-item">
    <a class="gallery-link" href="${largeImageURL}"><img class="gallery-image"src="${webformatURL}" alt="${tags}"/>
    </a>
    <div class="info">
    <p class="info-item"><b>Likes</b> ${likes}</p>
    <p class="info-item"><b>Views</b> ${views}</p>
    <p class="info-item"><b>Comments</b> ${comments}</p>
    <p class="info-item"><b>Downloads</b> ${downloads}</p>
    </div>
    </li>`
    )
        .join("");
    
    gallery.insertAdjacentHTML('beforeend', markup);

    if (!lightbox) {
        lightbox = new SimpleLightbox('.gallery a', {
            captionsData: 'alt',
            captionDelay: 250,
        })
    } else {
        lightbox.refresh();
    }
}

export function clearGallery() {
    gallery.innerHTML = "";
}

export function showLoader() {
        loader.classList.add("is-loading");
        loader.textContent = "Loading images, please wait..."
}

export function hideLoader() {
        loader.classList.remove("is-loading");
        loader.textContent = "";
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove("hidden");
}


export function hideLoadMoreButton() {
  loadMoreBtn.classList.add("hidden");
}