"use client";

import { useWindows } from '@/hooks/useWindows';
import Window from './Window';
import Taskbar from './Taskbar';

export default function Desktop() {
  const { windows } = useWindows();

  return (
    <div className="desktop-background h-screen w-screen overflow-hidden flex flex-col">
      <div className="flex-grow relative" id="desktop-area">
        {Object.values(windows)
          .filter(win => !win.isMinimized)
          .map(win => (
          <Window key={win.id} {...win} />
        ))}
      </div>
      <Taskbar />
    </div>
  );
}
