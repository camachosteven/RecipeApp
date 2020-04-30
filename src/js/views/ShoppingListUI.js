import {elements} from './base';

export const displayItem = ingredient => {
    const markup = `
        <li class="shopping__item" data-itemid=${ingredient.id}>
            <div class="shopping__count">
                <input type="number" class="shopping__count-value" value="${ingredient.count}" step="${ingredient.count}">
                <p>${ingredient.unit}</p>
            </div>
            <p class="shopping__description">${ingredient.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;
    elements.shopping.insertAdjacentHTML('beforeend', markup);
};

export const removeItem = id => {
    const item = document.querySelector(`[data-itemid=${id}]`);
    item.parentNode.removeChild(item);
}