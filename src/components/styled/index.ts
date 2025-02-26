import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
`;

export const Button = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 1rem;
  transition: background-color 0.2s;
  outline: none;
  margin-top: 1rem;
  justify-content: center;
  align-items: center;
  min-width: 120px; /* Define um tamanho mínimo para todos os botões */
  text-align: center;
  white-space: nowrap; /* Evita que o texto quebre dentro do botão */


  &:hover {
    background-color: #357abd;
  }

  &.danger {
    background-color: #e25c5c;
    margin-right: 0.5rem;
    &:hover {
      background-color: #d43d3d;
    }
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  white-space: wrap; 

  th, td {
    padding: 1rem;
    text-align: center;
    border-bottom: 1px solid #eee;
    overflow: hidden;
    text-overflow: ellipsis;
    
  }

  td {
    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: break-word;
  }

  th {
    background-color: #f8f9fa;
    font-weight: 600;
  }

  @media only screen and (max-width: 768px) {
    th, td {
      padding: 0.5rem;
      font-size: 0.9em;
    }
  }
`;

export const DialogOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  
`;

export const DialogContent = styled(Dialog.Content)`
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 1.5rem;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

export const AlertDialogOverlay = styled(AlertDialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

export const AlertDialogContent = styled(AlertDialog.Content)`
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 500px;
  padding: 1.5rem;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: break-word;
`;