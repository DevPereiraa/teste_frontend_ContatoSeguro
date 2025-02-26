import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Book, Author } from '../../types';
import { Button, DialogOverlay, DialogContent } from '../styled';
import { BookForm } from './BookForm';
import { BookTable } from '../TableBookComponent';

interface BookListProps {
  books: Book[];
  authors: Author[];
  onCreateBook: (book: Omit<Book, 'id'>) => void;
  onDeleteBook: (id: string) => void;
}

export const BookList: React.FC<BookListProps> = ({
  books,
  authors,
  onCreateBook,
  onDeleteBook,
}) => {
  const [, setSelectedBook] = useState<Book | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <h2>Livros</h2>
        <Dialog.Root open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <Dialog.Trigger asChild>
            <Button>Adicionar Livro</Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <DialogOverlay />
            <DialogContent>
              <Dialog.Title>Criar Livro</Dialog.Title>
              <BookForm
                authors={authors}
                onSubmit={onCreateBook}
                onClose={() => setIsCreateDialogOpen(false)}
              />
            </DialogContent>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      <BookTable
        books={books}
        authors={authors}
        onDeleteBook={onDeleteBook}
        setSelectedBook={setSelectedBook} 
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />
    </div>
  );
};
