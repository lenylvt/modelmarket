import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CreatorDashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord Créateur</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Aperçu des revenus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-gray-500">Revenus totaux</p>
                <p className="text-2xl font-bold">0 €</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Revenus du mois</p>
                <p className="text-2xl font-bold">0 €</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Modèles actifs</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gérer mes modèles</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Créez et gérez vos modèles</p>
            <Link href="/dashboard/creator/models">
              <Button className="w-full">Voir mes modèles</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mes ventes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Suivez vos ventes et revenus</p>
            <Link href="/dashboard/creator/sales">
              <Button variant="outline" className="w-full">Voir les statistiques</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 