const fs = require('fs');

let articles = require('../data/articles.json');

export const articlesRepo = {
    getAll: () => articles,
    getById: id => articles.find(x => x.id.toString() === id.toString()),
    find: x => articles.find(x),
    create,
    update,
    delete: _delete
};

function create(article) {
    article.id = articles.length ? Math.max(...articles.map(x => x.id)) + 1 : 1;
    articles.push(article);
    saveData();
}

function update(id, params) {
    const article = articles.find(x => x.id.toString() === id.toString());
    Object.assign(article, JSON.parse(params));
    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
    articles = articles.filter(x => x.id.toString() !== id.toString());
    saveData();
}

function saveData() {
    fs.writeFileSync('./data/articles.json', JSON.stringify(articles, null, 4));
}