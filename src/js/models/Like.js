export default class Like {
    constructor() {
        this.list = [];
    }

    addLike(id, title, author, image) {
        const item = {
            id,
            title,
            author,
            image
        };
        this.list.push(item);
        this.persistData();
        return item;
    }

    deleteLike(id) {
        const index = this.list.findIndex(el => el.id === id);
        this.list.splice(index, 1);
        this.persistData();
        return id;
    }

    isLiked(id) {
        return this.list.find(el => el.id === id);
    }

    getNumLikes() {
        return this.list.length;
    }
    
    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.list));
    }

    readStorage() {
        const storage = localStorage.getItem('likes');
        if (storage) this.list = JSON.parse(storage);
    }
};