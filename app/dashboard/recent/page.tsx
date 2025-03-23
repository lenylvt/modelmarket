import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function RecentRequestsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Demandes Récentes</h1>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Demande Récente #{i}</CardTitle>
                <Badge variant="secondary">Nouveau</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Description de la demande récente...</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">Il y a {i} heure{i > 1 ? 's' : ''}</span>
                <span className="text-sm font-medium">Par: Utilisateur_{i}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 