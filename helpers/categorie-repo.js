const fs = require('fs');

let categories = require('../data/categories.json');

export const categoriesRepo = {
    getAll: () => categories,
    create,
    delete: _delete
};

function create(categorie) {
    categorie.id = categories.length ? Math.max(...categories.map(x => x.id)) + 1 : 1;
    categories.push(categorie);
    saveData();
}

function _delete(id) {
    categories = categories.filter(x => x.id.toString() !== id.toString());
    saveData();
}

function saveData() {
    fs.writeFileSync('./data/categories.json', JSON.stringify(categories, null, 4));
}