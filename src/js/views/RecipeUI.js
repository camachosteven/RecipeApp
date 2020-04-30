import * as base from './base';
import { Fraction } from 'fractional';

const createIngredient = ing => `
    <li class="recipe__item">
    <svg class="recipe__icon">
        <use href="img/icons.svg#icon-check"></use>
    </svg>
    <div class="recipe__count">${formatCount(ing.count)}</div>
    <div class="recipe__ingredient">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.ingredient}
    </div>
    </li>
`;

const formatCount = count => {
    if (count) {
        const newCount = Math.round(count * 10000) / 10000;
        const [int, dec] = count.toString().split('.').map(el => parseInt(el, 10));
        if (!dec) return count;
        if (int === 0) {
            const fr = new Fraction(count);
            return `${fr.numerator}/${fr.denominator}`;
        }
        const fr = new Fraction(count - int);
        return `${int} ${fr.numerator}/${fr.denominator}`;
    }
    return '?';
};

export const removeDetails = () => {
    base.elements.recipeContainer.innerHTML = '';
};

export const removeIngredients = () => {
    document.querySelector('.recipe__ingredient-list').innerHTML = '';
};

export const displayDetails = rec => {
    const markup = `
        <figure class="recipe__fig">
            <img src="${rec.image}" alt="${rec.title}" class="recipe__img">
            <h1 class="recipe__title">
                <span>${rec.title}</span>
            </h1>
        </figure>
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${rec.time}</span>
                <span class="recipe__info-text"> minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${rec.servings}</span>
                <span class="recipe__info-text"> servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>

            </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart-outlined"></use>
                </svg>
            </button>
        </div>



        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
                ${rec.ingredients.map(el => createIngredient(el)).join('')}
            </ul>

            <button class="btn-small recipe__btn">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>

        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">The Pioneer Woman</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${rec.url}" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>

            </a>
        </div>
    `;
    base.elements.recipeContainer.innerHTML = markup;
}; 

export const updateServings = rec => {
    document.querySelector('.recipe__info-data--people').textContent = rec.servings;
    const ingred = Array.from(document.querySelectorAll('.recipe__count'));
    ingred.forEach((e, i) => e.textContent = formatCount(rec.ingredients[i].count));
};