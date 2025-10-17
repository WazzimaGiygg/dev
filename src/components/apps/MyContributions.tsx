import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const contributions = [
  { id: 1, title: 'Revisão do artigo "História da Web"', date: '2 dias atrás' },
  { id: 2, title: 'Adição de fontes ao artigo "Computação Quântica"', date: '5 dias atrás' },
  { id: 3, title: 'Criação do artigo "Introdução ao Next.js 14"', date: '1 semana atrás' },
  { id: 4, title: 'Correção ortográfica em "Protocolo HTTP/3"', date: '2 semanas atrás' },
];

export default function MyContributions() {
  return (
    <div className="h-full w-full">
      <Card className="h-full border-0 shadow-none rounded-none flex flex-col">
        <CardHeader>
          <CardTitle>Minhas Contribuições</CardTitle>
          <CardDescription>Aqui está uma lista das suas atividades recentes.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <ScrollArea className="h-full">
            <ul className="space-y-4">
              {contributions.map(contrib => (
                <li key={contrib.id} className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-semibold text-sm">{contrib.title}</p>
                  <p className="text-xs text-muted-foreground">{contrib.date}</p>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
