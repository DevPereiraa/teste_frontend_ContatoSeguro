import React from 'react';
import { useForm } from 'react-hook-form';
import * as Dialog from '@radix-ui/react-dialog';
import { Author } from '../../types';
import { Form, FormField, Input, Button } from '../styled';

interface AuthorFormProps {
  onSubmit: (data: Omit<Author, 'id'>) => void;
  onClose: () => void;
}

export const AuthorForm: React.FC<AuthorFormProps> = ({ onSubmit, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Omit<Author, 'id'>>();

  const handleSaveAuthor = (data: Omit<Author, 'id'>) => {
    onSubmit(data); 
    onClose();
  };

  return (
    <Form onSubmit={handleSubmit(handleSaveAuthor)}>
      <FormField>
        <label htmlFor="name">Nome *</label>
        <Input
          id="name"
          {...register('name', { required: 'O nome é obrigatório' })}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </FormField>

      <FormField>
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          {...register('email')}
        />
      </FormField>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <Button type="submit">Salvar Autor</Button>
        <Dialog.Close asChild>
          <Button type="button" className="danger">
            Cancelar
          </Button>
        </Dialog.Close>
      </div>
    </Form>
  );
};
