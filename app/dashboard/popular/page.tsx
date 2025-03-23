import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PopularRequestsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Demandes Populaires</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Demande Populaire</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Contenu de la demande populaire...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 