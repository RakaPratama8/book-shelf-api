const books = require('./books.js');
const { nanoid } = require('nanoid');

const addBookHandler = (request, h) => {
    const { name = '', year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const id = nanoid(16);
    const finished = readPage === pageCount ? true : false;
    const insertedAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    if (name === '') {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });

        response.code(400)
        return response;

    } else if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });

        response.code(400)
        return response;

    } else {
        const newBook = {
            id,
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            insertedAt,
            updatedAt,
        };

        books.push(newBook);

        const isSuccess = books.filter((book) => book.id === id).length > 0;

        if (isSuccess) {
            const response = h.response({
                status: 'success',
                message: 'Buku berhasil ditambahkan',
                data: {
                    bookId: id,
                },
            });

            response.code(201);
            return response;
        };
    };
};

const showBooksHandler = (request, h) => {

    const { name = '', reading = '', finished = '' } = request.query;

    if (name !== '') {
        const response = h.response({
            status: 'success',
            data: {
                books: books.map((book) => (({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                }))).filter((book) => (book.name.toLowerCase()).includes(name.toLowerCase())),
            },
        });

        response.code(200);
        return response;
    } else if (reading !== '') {

        const readState = reading === '1' ? true : false;

        const response = h.response({
            status: 'success',
            data: {
                books: books.filter((book) => book.reading === readState).map((book) => (({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                }))),
            },
        });

        response.code(200);
        return response;
    } else if (finished !== '') {
        const finishedState = finished === '1' ? true : false;

        const response = h.response({
            status: 'success',
            data: {
                books: books.filter((book) => book.finished === finishedState).map((book) => (({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                }))),
            },
        });

        response.code(200);
        return response;
    } else {
        const response = h.response({
            status: 'success',
            data: {
                books: books.map((book) => (({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                }))),
            },
        });

        response.code(200);
        return response;
    }
}


const getBookByIdHandler = (request, h) => {
    const { id } = request.params;

    const book = books.filter((book) => book.id === id)[0];

    if (book !== undefined) {
        const response = h.response({
            status: 'success',
            data: {
                book,
            },
        });

        response.code(200);
        return response;

    } else {
        const response = h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan'
        });

        response.code(404);
        return response;
    }
}


const updateBookById = (request, h) => {
    const { name = '', year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const { id } = request.params;
    const updatedAt = new Date().toISOString();
    const finished = readPage === pageCount ? true : false;

    const index = books.findIndex((book) => book.id === id);

    if (name === '') {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });

        response.code(400)
        return response;

    } else if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });

        response.code(400)
        return response;

    } else if (index === -1) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });

        response.code(404)
        return response;
    } else {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });

        response.code(200);
        return response;
    }

}


const deleteBookById = (request, h) => {
    const { id } = request.params;

    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books.splice(index, 1);

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });

        response.code(200);
        return response;
    } else {
        const response = h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        });

        response.code(404);
        return response;
    }
}

module.exports = { addBookHandler, showBooksHandler, getBookByIdHandler, updateBookById, deleteBookById };