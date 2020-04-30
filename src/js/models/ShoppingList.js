import uniqid from 'uniqid';
import {elements, elementStrings } from '../views/base';

export default class ShoppingList {
    constructor() {
        this.cart = [];
    }

    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        };
        this.cart.push(item);
        return item;
    }

    deleteItem(id) {
        const index = this.cart.findIndex(el => el.id === id);
        this.cart.splice(index, 1);
    }

    updateCount(id, newCount) {
        this.cart.find(el => el.id === id).count = newCount;
    }
};