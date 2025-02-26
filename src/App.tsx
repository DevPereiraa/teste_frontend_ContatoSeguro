import { useState, useEffect } from 'react';
import { Container } from './components/styled';
import { AuthorList } from './components/Authors/AuthorList';
import { BookList } from './components/Books/BookList';
import { StorageService } from './services/storage';
import { Author, Book } from './types';
import { GlobalStyles } from './styles/GlobalStyles';

function App() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    setAuthors(StorageService.getAuthors());
    setBooks(StorageService.getBooks());
  }, []);

  const handleCreateAuthor = (authorData: Omit<Author, 'id'>) => {
    const newAuthor: Author = {
      ...authorData,
      id: crypto.randomUUID(),
    };
    StorageService.saveAuthor(newAuthor);
    setAuthors([...authors, newAuthor]);
  };

  const handleDeleteAuthor = (id: string) => {
    StorageService.deleteAuthor(id);
    setAuthors(authors.filter(author => author.id !== id));
    
    const updatedBooks = books.filter(book => book.author_id !== id);
    setBooks(updatedBooks);
    StorageService.deleteBook(id);
  };

  const handleCreateBook = (bookData: Omit<Book, 'id'>) => {
    const newBook: Book = {
      ...bookData,
      id: crypto.randomUUID(),
    };
    StorageService.saveBook(newBook);
    setBooks([...books, newBook]);
  };

  const handleDeleteBook = (id: string) => {
    StorageService.deleteBook(id);
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <>
      <GlobalStyles />
      <Container>
        <h1 style={{ marginBottom: '2rem' }}>Gerenciador de Livros e Autores</h1>
        
        <AuthorList
          authors={authors}
          onCreateAuthor={handleCreateAuthor}
          onDeleteAuthor={handleDeleteAuthor}
        />
        
        <div style={{ height: '2rem' }} />
        
        <BookList
          books={books}
          authors={authors}
          onCreateBook={handleCreateBook}
          onDeleteBook={handleDeleteBook}
        />
      </Container>
    </>
  );
}

export default App;