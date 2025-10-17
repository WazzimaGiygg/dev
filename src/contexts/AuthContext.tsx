'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface User {
  displayName: string;
  email: string;
  photoURL: string;
  role: 'admin' | 'editor' | 'guest';
}

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    const avatar = PlaceHolderImages.find(img => img.id === 'user-avatar');
    setUser({
      displayName: 'Usuário Convidado',
      email: 'guest.user@wzzm.com',
      photoURL: avatar?.imageUrl || '',
      role: 'editor',
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
