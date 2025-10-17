import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const contributions = [
  { id: 1, text: 'Revisão do artigo "História da Web"' },
  { id: 2, text: 'Criação do artigo "Introdução ao Next.js 14"' },
];

const messages = [
    { id: 1, user: 'Admin', text: 'Bem-vindo ao WZZM OS! Sinta-se à vontade para explorar.'}
]

export default function UserProfile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="h-full w-full">
      <Card className="h-full border-0 shadow-none rounded-none">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.photoURL} alt={user.displayName} />
            <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user.displayName}</h1>
            <p className="text-muted-foreground capitalize">Cargo: {user.role}</p>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="contributions">
            <TabsList>
              <TabsTrigger value="contributions">Minhas Contribuições</TabsTrigger>
              <TabsTrigger value="personal-page">Página Pessoal</TabsTrigger>
              <TabsTrigger value="discussion">Discussão</TabsTrigger>
            </TabsList>
            <TabsContent value="contributions" className="mt-4">
                <h3 className="font-semibold mb-2">Últimas Contribuições</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                    {contributions.map(c => <li key={c.id}>{c.text}</li>)}
                </ul>
            </TabsContent>
            <TabsContent value="personal-page" className="mt-4">
                <h3 className="font-semibold mb-2">Editar Minha Página</h3>
                <Textarea rows={10} placeholder="Escreva sobre você..." />
                <div className="flex gap-2 mt-2">
                    <Button>Salvar</Button>
                    <Button variant="outline">Cancelar</Button>
                </div>
            </TabsContent>
            <TabsContent value="discussion" className="mt-4">
                <h3 className="font-semibold mb-2">Mensagens e Notificações</h3>
                <div className="space-y-3">
                    {messages.length > 0 ? messages.map(msg => (
                        <div key={msg.id} className="text-sm p-3 bg-muted/50 rounded-lg">
                            <span className="font-bold">{msg.user}:</span> {msg.text}
                        </div>
                    )) : (
                        <p className="text-sm text-muted-foreground text-center py-4">Nenhuma mensagem nova.</p>
                    )}
                </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
