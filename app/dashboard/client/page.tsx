import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ClientDashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord Client</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Demander un modèle</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Créez une nouvelle demande de modèle personnalisé</p>
            <Link href="/dashboard/client/request">
              <Button className="w-full">Nouvelle demande</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mes demandes en cours</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Consultez l'état de vos demandes en cours</p>
            <Link href="/dashboard/client/requests">
              <Button variant="outline" className="w-full">Voir mes demandes</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ma collection</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Accédez à vos modèles achetés</p>
            <Link href="/dashboard/client/models">
              <Button variant="outline" className="w-full">Voir mes modèles</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 