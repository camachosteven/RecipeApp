import Search from './models/Search';
import * as SearchUI from './views/SearchUI';
import { elements, elementStrings, renderLoader, removeLoader } from './views/base';
import Recipe from './models/Recipe';
import * as RecipeUI from './views/RecipeUI';
import ShoppingList from './models/ShoppingList';
import * as ShoppingListUI from './views/ShoppingListUI';
import Like from './models/Like';
import * as LikeUI from './views/LikeUI';

/* global app state
- search object
- current recipe object
- shopping list object
- liked recipes
*/

const state = {};

const ctrlSearch = async () => {
    const query = SearchUI.getQuery();
    if (query) {
        try {
            state.search = new Search(query);
            SearchUI.clearQuery();
            SearchUI.clearResults();
            renderLoader(elements.results);
            state.page = 1;
            await state.search.getResults();
            removeLoader(elements.results);
            SearchUI.displayRecipes(state.search.result, state.page);
        } catch(err) {
            alert(err);
            removeLoader(elements.results);
        }
    }
};



elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    ctrlSearch();
});

function hasButton(el, buttonTag) {
    while (el !== elements.resultButtonsDiv) {
        if (el.classList.contains(buttonTag)) return true;
        el = el.parentNode;
    }
    return false;
}

elements.resultButtonsDiv.addEventListener('click', e => {
    if (hasButton(e.target, elementStrings.resultPrevButton)) {
        SearchUI.clearResults();
        SearchUI.displayRecipes(state.search.result, --state.page);
    } else if (hasButton(e.target, elementStrings.resultNextButton)) {
        SearchUI.clearResults();
        SearchUI.displayRecipes(state.search.result, ++state.page);
    }
});

window.addEventListener('load', () => {
    state.likes = new Like();
    state.likes.readStorage();
    LikeUI.toggleLikeMenu(state.likes.getNumLikes());
    state.likes.list.forEach(like => LikeUI.displayLike(like));
});


////////////////////////////////////

const ctrlRecipe = async e => {
    const recipeLink = window.location.hash.replace('#', '');
    if (recipeLink) {
        RecipeUI.removeDetails();
        renderLoader(elements.recipeContainer);
        state.recipe = new Recipe(recipeLink);
        if (state.search) SearchUI.highlightSelected(recipeLink);
        try {
            await state.recipe.getRecipe();
            state.recipe.calcTime();
            state.recipe.calcServings();
            state.recipe.parseIngredients();
            removeLoader(elements.recipeContainer);
            RecipeUI.displayDetails(state.recipe);
            if (state.likes.isLiked(state.recipe.id)) {
                LikeUI.toggleLikeBtn(true);
            } else {
                LikeUI.toggleLikeBtn(false);
            }
        } catch (error) {
            alert('There was an error processing the recipe');
        }
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, ctrlRecipe));

const changeServings = el => {
    const buttons = document.querySelectorAll('.btn-tiny');
    let direction;
    buttons[0] === el ? direction = 'decrement' : direction = 'increment';
    console.log(direction);
    if (state.recipe.servings > 1 || direction === 'increment') {
        state.recipe.updateServings(direction);
        RecipeUI.updateServings(state.recipe);
    }
};

const addToShoppingCart = el => {
    const buttons = document.querySelectorAll('.recipe__btn');
    if (buttons[0] === el) {
        if (!state.shoppingList) state.shoppingList = new ShoppingList();
        state.recipe.ingredients.forEach(el => {
            const item = state.shoppingList.addItem(el.count, el.unit, el.ingredient);
            ShoppingListUI.displayItem(item);
        });
    }
};

elements.recipeContainer.addEventListener('click', e => {
    if (e.target.closest('.btn-tiny')) {
        changeServings(e.target.closest('.btn-tiny'));
    } else if (e.target.matches('.recipe__btn, .recipe__btn *')) {
        addToShoppingCart(e.target.closest('.recipe__btn'));
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        let item;
        if (!state.likes) state.likes = new Like();
        if (!state.likes.isLiked(state.recipe.id)) {
            item = addToLikes();
            LikeUI.toggleLikeBtn(true);
            LikeUI.displayLike(item);
        }
        else {
            item = deleteFromLikes();
            LikeUI.toggleLikeBtn(false);
            LikeUI.deleteLike(item);
        }
        LikeUI.toggleLikeMenu(state.likes.getNumLikes());
    }
});

elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    state.shoppingList.deleteItem(id);
    ShoppingListUI.removeItem(id);
});

function addToLikes() {
    return state.likes
    .addLike(state.recipe.id, state.recipe.title, state.recipe.author, state.recipe.image);

}

function deleteFromLikes() {
    return state.likes.deleteLike(state.recipe.id);
}