"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const { login } = useAuth();

  return (
    <div className="flex items-center justify-center h-screen bg-secondary">
      <Card className="w-[380px] text-center shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">WZZM Web OS</CardTitle>
          <CardDescription>Use sua conta Google para continuar.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={login}
            className="w-full text-base py-6"
            size="lg"
          >
            <GoogleIcon className="mr-3" />
            Entrar com Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
