import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function RequestModelPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Demander un modèle</h1>
      <Card>
        <CardHeader>
          <CardTitle>Formulaire de demande</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label className="block mb-2">Titre de la demande</label>
              <Input placeholder="Entrez le titre de votre demande" />
            </div>
            <div>
              <label className="block mb-2">Description</label>
              <Textarea placeholder="Décrivez votre besoin en détail..." />
            </div>
            <Button type="submit">Soumettre la demande</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 