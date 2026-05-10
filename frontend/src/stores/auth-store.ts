// Auth Store - EntertainingHub Pro

import { createContext } from '@lit/context';
import type { User } from '../types';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export const authContext = createContext<AuthState>('auth');

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};
