import React from 'react';
import { useForm } from 'react-hook-form';
import { Book, Author } from '../../types';
import { Form, FormField, Input, Button } from '../styled';

interface BookFormProps {
  authors: Author[];
  onSubmit: (data: Omit<Book, 'id'>) => void;
  onClose: () => void;
}

export const BookForm: React.FC<BookFormProps> = ({ authors, onSubmit, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Omit<Book, 'id'>>();

  const handlePagesInput = (e: React.FormEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    if (inputValue.startsWith('-')) {
      e.preventDefault();
    }
  };

  const handleFormSubmit = (data: Omit<Book, 'id'>) => {
    onSubmit(data); 
    onClose();
  };

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <FormField>
        <label htmlFor="name">Nome *</label>
        <Input
          id="name"
          {...register('name', { required: 'O nome é obrigatório' })}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </FormField>

      <FormField>
        <label htmlFor="author_id">Autor *</label>
        <select
          id="author_id"
          {...register('author_id', { required: 'O autor é obrigatório, crie um autor primeiro!' })}
          style={{
            padding: '0.5rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '1rem'
          }}
        >
          <option value="">Selecione um autor</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        {errors.author_id && <span>{errors.author_id.message}</span>}
      </FormField>

      <FormField>
        <label htmlFor="pages">Páginas</label>
        <Input
          id="pages"
          type="number"
          min="0"
          {...register('pages', { 
            valueAsNumber: true,
            validate: value => (value === undefined || value >= 0) || 'O número de páginas não pode ser negativo'
          })}
          onInput={handlePagesInput}
        />
        {errors.pages && <span>{errors.pages.message}</span>}
      </FormField>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <Button type="submit">Salvar Livro</Button>
        <Button type="button" className="danger" onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </Form>
  );
};
