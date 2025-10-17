"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useWindows, WindowInstance } from '@/hooks/useWindows';
import { cn } from '@/lib/utils';
import { X, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Window(props: WindowInstance) {
  const { id, title, component, x, y, width, height, zIndex } = props;
  const { closeWindow, minimizeWindow, focusWindow, updateWindowState } = useWindows();
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.window-control-button')) {
      return;
    }
    focusWindow(id);
    setIsDragging(true);

    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      let newX = e.clientX - dragOffset.current.x;
      let newY = e.clientY - dragOffset.current.y;

      const desktop = document.getElementById('desktop-area');
      if (desktop) {
        const desktopRect = desktop.getBoundingClientRect();
        if (newY < 0) newY = 0;
        if (newY > desktopRect.height - 40) newY = desktopRect.height - 40;
      }
      
      updateWindowState(id, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, id, updateWindowState]);
  
  const handleResize = () => {
    if (windowRef.current) {
        const { width, height } = windowRef.current.getBoundingClientRect();
        updateWindowState(id, { width, height });
    }
  };

  return (
    <div
      ref={windowRef}
      className="absolute flex flex-col bg-card rounded-lg shadow-2xl border border-black/10"
      style={{ 
        left: x, 
        top: y,
        width, 
        height, 
        zIndex,
        resize: 'both',
        overflow: 'hidden',
        minWidth: '300px',
        minHeight: '200px',
        transition: 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out'
      }}
      onMouseUp={handleResize}
      onMouseDown={() => focusWindow(id)}
    >
      <div
        className="h-8 flex-shrink-0 bg-primary text-primary-foreground flex items-center justify-between pl-3 pr-1 rounded-t-md"
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <span className="text-sm font-medium truncate select-none">{title}</span>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-primary-foreground hover:bg-white/20 window-control-button"
            onClick={() => minimizeWindow(id)}
            title="Minimizar"
          >
            <Minus size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-primary-foreground hover:bg-destructive/90 window-control-button"
            onClick={() => closeWindow(id)}
            title="Fechar"
          >
            <X size={14} />
          </Button>
        </div>
      </div>
      <div className="flex-grow p-2 bg-background overflow-auto">
        {component}
      </div>
    </div>
  );
}
