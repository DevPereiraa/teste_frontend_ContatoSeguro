import React from 'react';
import { Table, Button, DialogOverlay, DialogContent, AlertDialogOverlay, AlertDialogContent } from './styled';
import * as Dialog from '@radix-ui/react-dialog';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Author } from '../types';

interface TableProps {
  authors: Author[];
  onDeleteAuthor: (id: string) => void;
  onSetSelectedAuthor: (author: Author) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TableAuthorComponent: React.FC<TableProps> = ({
  authors,
  onDeleteAuthor,
  onSetSelectedAuthor,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
}) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {authors.map((author) => (
          <tr key={author.id}>
            <td>{author.name}</td>
            <td>{author.email || '-'}</td>
            <td>
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Button onClick={() => onSetSelectedAuthor(author)}>
                    Visualizar
                  </Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <DialogOverlay />
                  <DialogContent>
                    <Dialog.Title>Detalhes do Autor</Dialog.Title>
                    <div>
                      <p><strong>Nome:</strong> {author.name}</p>
                      <p><strong>Email:</strong> {author.email || '-'}</p>
                      <p><strong>ID:</strong> {author.id}</p>
                    </div>
                    <Dialog.Close asChild>
                      <Button style={{ marginTop: '1rem' }}>Fechar</Button>
                    </Dialog.Close>
                  </DialogContent>
                </Dialog.Portal>
              </Dialog.Root>

              <AlertDialog.Root open={isDeleteDialogOpen}>
                <AlertDialog.Trigger asChild>
                  <Button
                    className="danger"
                    onClick={() => {
                      onSetSelectedAuthor(author);
                      setIsDeleteDialogOpen(true);
                    }}
                    style={{ marginLeft: '0.5rem' }}
                  >
                    Deletar
                  </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Portal>
                  <AlertDialogOverlay />
                  <AlertDialogContent>
                    <AlertDialog.Title>Deletar Autor</AlertDialog.Title>
                    <AlertDialog.Description>
                      Você tem certeza que deseja deletar o autor ({author.name})? 
                      Essa ação não pode ser desfeita.
                    </AlertDialog.Description>
                    <div
                      style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}
                    >
                      <AlertDialog.Cancel asChild>
                        <Button onClick={() => setIsDeleteDialogOpen(false)}>
                          Cancelar
                        </Button>
                      </AlertDialog.Cancel>
                      <AlertDialog.Action asChild>
                        <Button
                          className="danger"
                          onClick={() => {
                            onDeleteAuthor(author.id);
                            setIsDeleteDialogOpen(false);
                          }}
                        >
                          Deletar
                        </Button>
                      </AlertDialog.Action>
                    </div>
                  </AlertDialogContent>
                </AlertDialog.Portal>
              </AlertDialog.Root>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
