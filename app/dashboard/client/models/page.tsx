import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ClientModelsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mes modèles</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Nom du modèle</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Description du modèle...</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Acheté le: 23 Mars 2024</span>
              <Button variant="outline">Télécharger</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 