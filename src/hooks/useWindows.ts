'use client';

import { useContext } from 'react';
import { WindowsContext } from '@/contexts/WindowsContext';

export function useWindows() {
  const context = useContext(WindowsContext);
  if (!context) {
    throw new Error('useWindows must be used within a WindowsProvider');
  }
  return context;
}
