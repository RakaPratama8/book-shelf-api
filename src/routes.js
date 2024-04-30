const { addBookHandler, showBooksHandler,  getBookByIdHandler, updateBookById, deleteBookById } = require('./handler.js');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },

    {
        method: 'GET',
        path: '/books',
        handler: showBooksHandler,
    },

    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookByIdHandler,
    },

    {
        method: 'PUT',
        path: '/books/{id}',
        handler: updateBookById,
    },

    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookById,
    },
];

module.exports = routes;