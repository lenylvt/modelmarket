import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function CreatorModelsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mes Créations</h1>
        <Button>Ajouter un modèle</Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Nom du modèle</CardTitle>
              <Badge variant="secondary">Publié</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Description du modèle...</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Créé le: 23 Mars 2024</span>
              <Button variant="outline">Modifier</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 