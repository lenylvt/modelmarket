import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { DiscordLogoIcon } from "@radix-ui/react-icons"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="space-y-2 pb-2">
          <CardTitle className="text-2xl font-bold text-center">Modèles Marketplace</CardTitle>
          <CardDescription className="text-center">Connectez-vous pour accéder au marché des modèles d'IA, des ensembles de données et plus encore</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <Button className="w-full bg-[#5865F2] hover:bg-[#4752c4] shadow-sm transition-all" asChild>
            <Link href="/api/auth/discord" className="flex items-center justify-center">
              <DiscordLogoIcon className="mr-2 h-5 w-5" />
              Continuer avec Discord
            </Link>
          </Button>

          <div className="flex items-center space-x-2">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground font-medium">AVANTAGES</span>
            <Separator className="flex-1" />
          </div>

          <div className="grid grid-cols-1 gap-3">
            
            <div className="rounded-lg border-2 dark:border-blue-600 p-5 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all">
              <h3 className="mb-2 text-base font-medium flex items-center flex-wrap text-gray-900 dark:text-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
                Faites des Demandes de Modèles
              </h3>
              <p className="text-sm text-muted-foreground">
              Décrivez les modèles dont vous avez besoin et recevez des solutions personnalisées
              </p>
            </div>

            <div className="rounded-lg border-2 dark:border-blue-600 p-5 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all">
              <h3 className="mb-2 text-base font-medium flex items-center flex-wrap text-gray-900 dark:text-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                Gagnez de l'Argent 
              </h3>
              <p className="text-sm text-muted-foreground">
                Connectez votre compte pour recevoir des paiements pour vos modèles et contributions
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 pt-2">
          <p className="text-xs text-center text-muted-foreground">
            En vous connectant, vous acceptez nos <Link href="/terms" className="underline hover:text-blue-600">Conditions d'Utilisation</Link> et notre <Link href="/privacy" className="underline hover:text-blue-600">Politique de Confidentialité</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
