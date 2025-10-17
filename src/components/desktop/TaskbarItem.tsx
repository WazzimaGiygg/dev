"use client";

import { APPS_CONFIG } from '@/config/apps';
import { useWindows } from '@/hooks/useWindows';
import { cn } from '@/lib/utils';

interface TaskbarItemProps {
  appId: string;
}

export default function TaskbarItem({ appId }: TaskbarItemProps) {
  const { windows, openWindow, focusWindow, getActiveWindowId } = useWindows();
  const appConfig = APPS_CONFIG[appId];

  const windowInstances = Object.values(windows).filter(w => w.appId === appId);
  const isOpen = windowInstances.length > 0;
  const isMinimized = isOpen && windowInstances.every(w => w.isMinimized);
  const isActive = windowInstances.some(w => w.id === getActiveWindowId() && !w.isMinimized);

  const handleClick = () => {
    if (!isOpen || isMinimized) {
        openWindow(appId);
    } else {
        const windowToFocus = windowInstances.find(w => !w.isMinimized);
        if (windowToFocus) {
            focusWindow(windowToFocus.id);
        }
    }
  };

  if (!appConfig) return null;

  const Icon = appConfig.icon;

  return (
    <button
      onClick={handleClick}
      title={appConfig.title}
      className={cn(
        "flex items-center justify-center h-full px-3 mx-1 text-foreground/80 hover:bg-black/10 rounded-t-sm transition-all duration-150 relative",
        {
          'bg-black/10 text-foreground': isOpen && !isActive,
          'bg-background/70 text-primary shadow-inner': isActive,
        }
      )}
    >
      <Icon className="w-5 h-5" />
      <span
        className={cn(
          "absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 rounded-t-full transition-all duration-150",
          {
            'bg-accent': isOpen && !isActive,
            'bg-primary w-full': isActive,
          }
        )}
      ></span>
    </button>
  );
}
