"use client";

import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { WindowsProvider } from "@/contexts/WindowsContext";
import LoginPage from "@/components/auth/LoginPage";
import Desktop from "@/components/desktop/Desktop";

function WzzmApp() {
  const { user } = useAuth();

  if (!user) {
    return <LoginPage />;
  }

  return <Desktop />;
}

export default function Home() {
  return (
    <main>
      <AuthProvider>
        <WindowsProvider>
          <WzzmApp />
        </WindowsProvider>
      </AuthProvider>
    </main>
  );
}
