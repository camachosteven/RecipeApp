export let elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    results: document.querySelector('.results'),
    resultList: document.querySelector('.results__list'),
    resultPrevButton: document.querySelector('.results__btn--prev'),
    resultNextButton: document.querySelector('.results__btn--next'),
    resultButtonsDiv: document.querySelector('.results__pages'),
    recipeContainer: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping__list'),
    menu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list')
}

export let elementStrings = {
    resultPrevButton: 'results__btn--prev',
    resultNextButton: 'results__btn--next'
};

export const renderLoader = parent => {
    const loader = `
        <div class="loader">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const removeLoader = parent => {
    parent.removeChild(document.querySelector('.loader'));
};