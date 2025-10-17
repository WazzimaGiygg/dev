import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AdvancedSearch() {
  return (
    <div className="h-full w-full">
      <Card className="h-full border-0 shadow-none rounded-none">
        <CardHeader>
          <CardTitle>Busca Avançada</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="term">Termo de busca</Label>
              <Input id="term" placeholder="Ex: Inteligência Artificial" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Autor</Label>
              <Input id="author" placeholder="Ex: Alan Turing" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Ano de Publicação</Label>
              <Input id="year" type="number" placeholder="Ex: 2023" />
            </div>
            <Button type="submit">Buscar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
