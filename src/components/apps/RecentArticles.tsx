"use client"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const articles = [
  { id: 1, title: 'O Futuro do Desenvolvimento Web com WebAssembly', author: 'Ana Silva', preview: 'WebAssembly (Wasm) está mudando a forma como pensamos sobre performance na web...' },
  { id: 2, title: 'Gerenciamento de Estado em React: Além do useState', author: 'Bruno Costa', preview: 'Explorando bibliotecas como Zustand, Jotai e Redux Toolkit para aplicações complexas...' },
  { id: 3, title: 'Guia Completo de Acessibilidade (a11y) para Web', author: 'Carla Dias', preview: 'Tornar a web acessível para todos não é apenas uma boa prática, é uma necessidade...' },
  { id: 4, title: 'Desvendando os Server Components do Next.js', author: 'Daniel Alves', preview: 'Uma análise profunda de como os Server Components funcionam e quando usá-los...' },
];

export default function RecentArticles() {
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(articles[0]);

  return (
    <div className="h-full w-full grid grid-cols-1 md:grid-cols-3 gap-2">
      <div className="md:col-span-1 h-full">
        <Card className="h-full border-0 shadow-none rounded-none flex flex-col">
          <CardHeader>
            <CardTitle>Artigos Recentes</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-grow">
            <ScrollArea className="h-full px-6">
              <ul className="space-y-2">
                {articles.map(article => (
                  <li key={article.id} onClick={() => setSelectedArticle(article)}
                    className={`p-3 rounded-lg cursor-pointer ${selectedArticle?.id === article.id ? 'bg-primary/10' : 'hover:bg-muted/50'}`}>
                    <p className="font-semibold text-sm truncate">{article.title}</p>
                    <p className="text-xs text-muted-foreground">por {article.author}</p>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2 h-full">
        <Card className="h-full border-0 shadow-none rounded-none">
          <ScrollArea className="h-full">
            {selectedArticle ? (
              <>
                <CardHeader>
                  <CardTitle className="text-xl">{selectedArticle.title}</CardTitle>
                  <CardDescription>por {selectedArticle.author}</CardDescription>
                </CardHeader>
                <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                  <p>{selectedArticle.preview}</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.</p>
                  <p>Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.</p>
                </CardContent>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Selecione um artigo na lista para ver os detalhes.</p>
              </div>
            )}
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
