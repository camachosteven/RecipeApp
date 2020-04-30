import { elements } from './base';
import { limitTitle } from './SearchUI';

export const toggleLikeBtn = isLiked => {
    const icon = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${icon}`);
};

export const toggleLikeMenu = numLikes => {
    elements.menu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

export const displayLike = like => {
    const item = `
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.image}" alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitTitle(like.title)}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
    </li>
    `;
    elements.likesList.insertAdjacentHTML('beforeend', item);
};

export const deleteLike = id => {
    const item = document.querySelector(`.likes__link[href*="#${id}"]`);
    if (item) item.parentNode.removeChild(item);
};