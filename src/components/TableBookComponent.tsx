import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Book, Author } from '../types';
import { AlertDialogContent, AlertDialogOverlay, Button, DialogContent, DialogOverlay, Table } from './styled';

interface BookTableProps {
    books: Book[];
    authors: Author[];
    onDeleteBook: (id: string) => void;
    setSelectedBook: React.Dispatch<React.SetStateAction<Book | null>>;
    isDeleteDialogOpen: boolean;
    setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const getAuthorName = (authorId: string, authors: Author[]) => {
    const author = authors.find((a) => a.id === authorId);
    return author ? author.name : 'Unknown Author';
};

export const BookTable: React.FC<BookTableProps> = ({
    books,
    authors,
    onDeleteBook,
    setSelectedBook,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    }) => {
    return (
        <Table>
        <thead>
            <tr>
            <th>Nome</th>
            <th>Autor</th>
            <th>Páginas</th>
            <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            {books.map((book) => (
            <tr key={book.id}>
                <td>{book.name}</td>
                <td>{getAuthorName(book.author_id, authors)}</td>
                <td>{book.pages || '-'}</td>
                <td>

                <Dialog.Root>
                    <Dialog.Trigger asChild>
                    <Button onClick={() => setSelectedBook(book)}>
                        Visualizar
                    </Button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                    <DialogOverlay />
                    <DialogContent>
                        <Dialog.Title>Detalhes do Livro</Dialog.Title>
                        <div>
                        <p><strong>Nome:</strong> {book.name}</p>
                        <p><strong>ID do Livro:</strong> {book.id}</p>
                        <p><strong>Autor:</strong> {getAuthorName(book.author_id, authors)}</p>
                        <p><strong>ID do Autor:</strong> {book.author_id}</p>
                        <p><strong>Páginas:</strong> {book.pages || '-'}</p>
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
                        setSelectedBook(book);
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
                        <AlertDialog.Title>Deletar Livro</AlertDialog.Title>
                        <AlertDialog.Description>
                        Você tem certeza que deseja deletar o livro ({book.name})? 
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
                                onDeleteBook(book.id);
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
