import { elements } from './base';

function displayRecipe(recipe) {
    let item = `
    <li>
        <a class="results__link" href="#${recipe['recipe_id']}">
            <figure class="results__fig">
                <img src="${recipe['image_url']}" alt="${limitTitle(recipe['title'])}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitTitle(recipe['title'])}</h4>
                <p class="results__author">${recipe['publisher']}</p>
            </div>
        </a>
    </li>
    `;
    elements.resultList.insertAdjacentHTML('beforeend', item);
}

export const limitTitle = (title, limit = 17) => {
    if (title.length > limit) {
        const titleSplit = title.split(" ");
        const newTitle = [];

        titleSplit.reduce((acc, cur) => {
           if (acc + cur.length <= limit) newTitle.push(cur); 
           return acc + cur.length;
        }, 0);

        return `${newTitle.join(' ')} ...`;
    }
    return title;
};

const createButton = (cur, type) => `
    <button class="btn-inline results__btn--${type}">
    <span>Page ${type === 'prev' ? cur - 1 : cur + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type == 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const displayButtons = (currentPage, totalPages) => {
    if (totalPages !== 1) {
        const left = createButton(currentPage, 'prev');
        const right = createButton(currentPage, 'next');
        if (currentPage > 1 && currentPage < totalPages) {
            elements.resultButtonsDiv.innerHTML = `${left}${right}`;
        } else if (currentPage === 1) {
            elements.resultButtonsDiv.innerHTML = `${right}`;
        } else {
            elements.resultButtonsDiv.innerHTML = `${left}`;
        }
    }
};

export const getQuery = () => elements.searchInput.value;
export const clearQuery = () => elements.searchInput.value = '';
export const clearResults = () => elements.resultList.innerHTML = '';
export const displayRecipes = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    const totalPages = Math.ceil(recipes.length / resPerPage);
    recipes.slice(start, end).forEach(displayRecipe);
    displayButtons(page, totalPages);
};
export const highlightSelected = id => {
    const results = Array.from(document.querySelectorAll('.results__link'));
    results.forEach(el => el.classList.remove('results__link--active'));
    document.querySelector(`a[href*="#${id}"]`).classList.add('results__link--active');
};