import { useContext } from 'react';
import ModalContext from './ModalContext';

export default function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('Need to register ModalProvider');
  }

  return context;
}
