import { useContext } from 'react';

import { AuthContext } from '../contexts/Auth/AuthContext';
import { IAuthContextDataProps } from '../contexts/Auth/AuthContext.interface';

export function useAuth(): IAuthContextDataProps {
  const context = useContext(AuthContext);

  return context;
}