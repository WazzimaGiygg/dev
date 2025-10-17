import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CreateArticle() {
  return (
    <div className="h-full w-full">
      <Card className="h-full border-0 shadow-none rounded-none">
        <CardHeader>
          <CardTitle>Criar Novo Artigo</CardTitle>
          <CardDescription>Preencha os campos abaixo para criar um novo artigo.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título do Artigo</Label>
              <Input id="title" placeholder="Insira o título aqui" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Conteúdo</Label>
              <Textarea id="content" placeholder="Comece a escrever seu artigo..." rows={15} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
              <Input id="tags" placeholder="Ex: tecnologia, programação, web" />
            </div>
            <Button type="submit">Publicar Artigo</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
