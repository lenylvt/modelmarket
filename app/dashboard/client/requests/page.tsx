import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MyRequestsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mes demandes</h1>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Titre de la demande</CardTitle>
              <Badge>En attente</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Description de la demande...</p>
            <div className="mt-4 text-sm text-gray-500">
              Soumis le: 23 Mars 2024
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 