import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AuthorForm } from './AuthorForm';
import { TableAuthorComponent } from '../TableAuthorComponent';
import { Button, DialogOverlay, DialogContent } from '../styled';
import { Author } from '../../types';

interface AuthorListProps {
  authors: Author[];
  onCreateAuthor: (author: Omit<Author, 'id'>) => void;
  onDeleteAuthor: (id: string) => void;
}

const generateRandomId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const AuthorList: React.FC<AuthorListProps> = ({
  authors,
  onCreateAuthor,
  onDeleteAuthor,
}) => {
  const [, setSelectedAuthor] = useState<Author | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateAuthor = (author: Omit<Author, 'id'>) => {
    const newAuthor = { ...author, id: generateRandomId() };
    onCreateAuthor(newAuthor);
    setIsCreateDialogOpen(false);
  };

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
        <h2>Autores</h2>

        <Dialog.Root open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <Dialog.Trigger asChild>
            <Button>Criar Autor</Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <DialogOverlay />
            <DialogContent>
              <Dialog.Title>Criar Autor</Dialog.Title>
              <AuthorForm
                onSubmit={handleCreateAuthor}
                onClose={() => setIsCreateDialogOpen(false)}
              />
            </DialogContent>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      <TableAuthorComponent
        authors={authors}
        onDeleteAuthor={onDeleteAuthor}
        onSetSelectedAuthor={setSelectedAuthor}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />
    </div>
  );
};
