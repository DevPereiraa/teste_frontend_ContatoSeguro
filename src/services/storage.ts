import { Author, Book } from '../types';

const BOOKS_KEY = 'books';
const AUTHORS_KEY = 'authors';

export const StorageService = {
  getBooks: (): Book[] => {
    const books = localStorage.getItem(BOOKS_KEY);
    return books ? JSON.parse(books) : [];
  },

  saveBook: (book: Book): void => {
    const books = StorageService.getBooks();
    books.push(book);
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
  },

  deleteBook: (id: string): void => {
    const books = StorageService.getBooks().filter(book => book.id !== id);
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
  },



  getAuthors: (): Author[] => {
    const authors = localStorage.getItem(AUTHORS_KEY);
    return authors ? JSON.parse(authors) : [];
  },

  saveAuthor: (author: Author): void => {
    const authors = StorageService.getAuthors();
    authors.push(author);
    localStorage.setItem(AUTHORS_KEY, JSON.stringify(authors));
  },

  deleteAuthor: (id: string): void => {
    const authors = StorageService.getAuthors().filter(author => author.id !== id);
    localStorage.setItem(AUTHORS_KEY, JSON.stringify(authors));
  }
};