import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const results = [
  { id: 1, title: 'Artigo sobre Inteligência Artificial', snippet: 'Uma visão geral sobre os avanços recentes em IA...' },
  { id: 2, title: 'IA e o Mercado de Trabalho', snippet: 'Como a automação está transformando as profissões...' },
  { id: 3, title: 'Ética na Inteligência Artificial', snippet: 'Os desafios e dilemas morais da IA moderna...' },
];

export default function SearchArticles() {
  return (
    <div className="h-full w-full">
      <Card className="h-full border-0 shadow-none rounded-none flex flex-col">
        <CardHeader>
          <CardTitle>Wiki Zero - Busca de Artigos e Trabalhos</CardTitle>
          <CardDescription>Digite um termo para encontrar artigos relevantes.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <div className="flex w-full max-w-2xl items-center space-x-2">
            <Input type="search" placeholder="Buscar artigos..." className="text-base"/>
            <Button type="submit" size="icon" aria-label="Buscar">
              <Search className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-grow pt-4">
            <h3 className="text-lg font-semibold mb-2">Resultados da busca</h3>
            <div className="space-y-4">
              {results.map(result => (
                <div key={result.id} className="p-4 border rounded-lg">
                  <h4 className="font-bold text-primary cursor-pointer hover:underline">{result.title}</h4>
                  <p className="text-sm text-muted-foreground">{result.snippet}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
