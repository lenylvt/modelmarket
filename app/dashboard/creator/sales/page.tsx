import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CreatorSalesPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mes Ventes</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Résumé des ventes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-gray-500">Ventes totales</p>
                <p className="text-2xl font-bold">0 €</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ce mois</p>
                <p className="text-2xl font-bold">0 €</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Modèles vendus</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Dernière vente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Aucune vente pour le moment</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 