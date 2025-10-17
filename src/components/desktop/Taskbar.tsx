"use client";

import { APPS_CONFIG } from '@/config/apps';
import TaskbarItem from './TaskbarItem';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import WzzmIcon from '../icons/WzzmIcon';

export default function Taskbar() {
  const { logout } = useAuth();
  const appIds = Object.keys(APPS_CONFIG);

  return (
    <div 
      className="h-[40px] bg-secondary/80 backdrop-blur-sm border-t border-black/10 flex items-center px-2 shrink-0 z-50"
    >
      <Button variant="ghost" className="font-bold text-foreground hover:bg-white/20">
        <WzzmIcon className="w-5 h-5 mr-2 text-primary"/>
        WZZM OS
      </Button>
      <div className="flex-grow flex items-center h-full px-2">
        {appIds.map(appId => (
          <TaskbarItem key={appId} appId={appId} />
        ))}
      </div>
      <div className="pr-2">
        <Button onClick={logout} variant="ghost" size="icon" className="h-8 w-8 text-foreground hover:bg-destructive/80 hover:text-destructive-foreground">
          <LogOut size={18} />
          <span className="sr-only">Sair</span>
        </Button>
      </div>
    </div>
  );
}
