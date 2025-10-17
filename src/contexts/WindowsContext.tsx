"use client";

import React, { createContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { APPS_CONFIG, AppConfig } from '@/config/apps';

export interface WindowInstance {
  id: string;
  appId: string;
  title: string;
  component: React.ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface WindowsContextType {
  windows: Record<string, WindowInstance>;
  openWindow: (appId: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowState: (id: string, updates: Partial<WindowInstance>) => void;
  getActiveWindowId: () => string | null;
}

export const WindowsContext = createContext<WindowsContextType | undefined>(undefined);

const BASE_Z_INDEX = 10;
let windowCounter = 0;

export function WindowsProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<Record<string, WindowInstance>>({});
  const [focusOrder, setFocusOrder] = useState<string[]>([]);

  const getActiveWindowId = useCallback(() => {
    return focusOrder.length > 0 ? focusOrder[focusOrder.length - 1] : null;
  }, [focusOrder]);
  
  const focusWindow = useCallback((id: string) => {
    setFocusOrder(prev => {
      const newOrder = prev.filter(windowId => windowId !== id);
      newOrder.push(id);
      return newOrder;
    });

    setWindows(prev => {
      const focusedWindow = prev[id];
      if (focusedWindow.isMinimized) {
        return {
          ...prev,
          [id]: { ...focusedWindow, isMinimized: false }
        }
      }
      return prev;
    });
  }, []);

  const openWindow = useCallback((appId: string) => {
    const appConfig = APPS_CONFIG[appId];
    if (!appConfig) return;

    // Check if a window for this app is already open
    const existingWindow = Object.values(windows).find(w => w.appId === appId && !w.isMinimized);
    if(existingWindow) {
      focusWindow(existingWindow.id);
      return;
    }
    
    // Check if a window is minimized
    const minimizedWindow = Object.values(windows).find(w => w.appId === appId && w.isMinimized);
    if(minimizedWindow) {
      focusWindow(minimizedWindow.id);
      return;
    }

    const newId = `${appId}-${++windowCounter}`;
    const newWindow: WindowInstance = {
      id: newId,
      appId: appId,
      title: appConfig.title,
      component: appConfig.component,
      x: 50 + (Object.keys(windows).length % 10) * 30,
      y: 50 + (Object.keys(windows).length % 10) * 30,
      width: appConfig.defaultSize.width,
      height: appConfig.defaultSize.height,
      isMinimized: false,
      isMaximized: false,
      zIndex: 0 // Will be set by useEffect
    };

    setWindows(prev => ({ ...prev, [newId]: newWindow }));
    setFocusOrder(prev => [...prev, newId]);
  }, [windows, focusWindow]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => {
      const newWindows = { ...prev };
      delete newWindows[id];
      return newWindows;
    });
    setFocusOrder(prev => prev.filter(windowId => windowId !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true }
    }));
  }, []);

  const updateWindowState = useCallback((id: string, updates: Partial<WindowInstance>) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], ...updates }
    }));
  }, []);
  
  useEffect(() => {
    setWindows(prev => {
      const newWindows = { ...prev };
      let changed = false;
      focusOrder.forEach((id, index) => {
        if (newWindows[id] && newWindows[id].zIndex !== BASE_Z_INDEX + index) {
          newWindows[id] = { ...newWindows[id], zIndex: BASE_Z_INDEX + index };
          changed = true;
        }
      });
      return changed ? newWindows : prev;
    });
  }, [focusOrder]);

  // Open default window on start
  useEffect(() => {
    openWindow('artigos');
  }, []);

  return (
    <WindowsContext.Provider value={{ windows, openWindow, closeWindow, minimizeWindow, focusWindow, updateWindowState, getActiveWindowId }}>
      {children}
    </WindowsContext.Provider>
  );
}
