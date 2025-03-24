"use client"

import { useSession, signOut } from "@/lib/auth-client"
import { useSearchParams, redirect } from "next/navigation"
import { useState, useEffect } from "react"
import { AlertTriangle, CreditCard, Upload } from "lucide-react"
import { toast } from "sonner"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SettingsPage() {
  const { data, isPending } = useSession()
  const [isDeleting, setIsDeleting] = useState(false)
  const [stripeConnected, setStripeConnected] = useState(false)
  const [stripeAccountId, setStripeAccountId] = useState<string | null>(null)
  const [isLoadingStripe, setIsLoadingStripe] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    if (data?.user?.id) {
      fetch("/api/stripe/status")
        .then((res) => res.json())
        .then((data) => {
          setStripeConnected(data.connected)
          setStripeAccountId(data.accountId)
          setIsLoadingStripe(false)
        })
        .catch((error) => {
          console.error("Error fetching Stripe status:", error)
          setIsLoadingStripe(false)
        })
    }
  }, [data?.user?.id])

  useEffect(() => {
    const error = searchParams.get("error")
    const success = searchParams.get("success")

    if (error) {
      let message = "Une erreur s'est produite."
      let description = ""

      switch (error) {
        case "missing_account":
          message = "L'ID du compte Stripe est manquant."
          description = "Veuillez réessayer ou contacter le support."
          break
        case "unauthorized":
          message = "Vous devez être connecté pour effectuer cette action."
          description = "Veuillez vous connecter et réessayer."
          break
        case "invalid_account":
          message = "Le compte Stripe est invalide."
          description = "Veuillez vérifier vos informations et réessayer."
          break
      }

      toast.error(message, {
        description: description,
        action: {
          label: "Réessayer",
          onClick: () => {},
        },
      })
    } else if (success) {
      toast.success("Connexion réussie", {
        description: "Votre compte Stripe a été connecté avec succès !",
      })
    }
  }, [searchParams])

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Chargement de vos paramètres...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    redirect("/")
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch("/api/user/delete", {
        method: "DELETE",
      })
      if (response.ok) {
        toast.success("Compte supprimé", {
          description: "Votre compte a été supprimé avec succès.",
        })
        await signOut()
        redirect("/")
      } else {
        throw new Error("Erreur lors de la suppression du compte")
      }
    } catch (error) {
      console.error("Erreur:", error)
      toast.error("Erreur", {
        description: "Une erreur s'est produite lors de la suppression du compte.",
      })
    }
    setIsDeleting(false)
  }

  const handleStripeConnect = async () => {
    try {
      const response = await fetch("/api/stripe/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          redirectUrl: "/dashboard/settings",
        }),
      })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error("Error connecting Stripe:", error)
      toast.error("Erreur", {
        description: "Une erreur s'est produite lors de la connexion à Stripe.",
      })
    }
  }

  const openStripeDashboard = async () => {
    try {
      const response = await fetch("/api/stripe/dashboard", {
        method: "GET",
      })
      const data = await response.json()
      if (data.url) {
        window.open(data.url, "_blank")
      }
    } catch (error) {
      console.error("Error opening Stripe dashboard:", error)
      toast.error("Erreur", {
        description: "Une erreur s'est produite lors de l'ouverture du tableau de bord Stripe.",
      })
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Tableau de bord</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Paramètres</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
              {/* Profile Section */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Profil</CardTitle>
                  <CardDescription>Gérez vos informations personnelles et les détails de votre compte</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col gap-6 sm:flex-row">
                    <div className="flex flex-col items-center gap-2">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={data.user?.image || ""} alt={data.user?.name || "Profil"} />
                        <AvatarFallback className="text-lg">
                          {data.user?.name ? getInitials(data.user.name) : "U"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Nom</Label>
                        <Input id="name" value={data.user?.name || ""} disabled />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={data.user?.email || ""} disabled />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Connecté avec : <span className="font-medium">Discord</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stripe Integration */}
              <Card>
                <CardHeader>
                  <CardTitle>Intégration Stripe</CardTitle>
                  <CardDescription>Connectez votre compte Stripe pour gérer les paiements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-4 rounded-lg border p-4">
                    <CreditCard className="h-8 w-8 text-primary shrink-0" />
                    <div className="flex-1 text-center sm:text-left">
                      <h4 className="text-sm font-medium">Compte Stripe</h4>
                      <p className="text-sm text-muted-foreground">
                        {isLoadingStripe ? "Chargement..." : stripeConnected ? "Connecté" : "Non connecté"}
                      </p>
                    </div>
                    {!isLoadingStripe && (
                      <Button 
                        variant={stripeConnected ? "destructive" : "default"}
                        onClick={stripeConnected ? () => {} : handleStripeConnect}
                        className="w-full sm:w-auto"
                      >
                        {stripeConnected ? "Déconnecter" : "Connecter"}
                      </Button>
                    )}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    disabled={!stripeConnected}
                    onClick={openStripeDashboard}
                  >
                    Accéder au tableau de bord Stripe
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Danger Zone */}
            <Card className="border-destructive">
              <CardHeader className="text-destructive">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  <CardTitle>Zone de danger</CardTitle>
                </div>
                <CardDescription>Ces actions ne peuvent pas être annulées. Veuillez procéder avec précaution.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-destructive/20 p-4">
                  <h4 className="font-medium">Supprimer le compte</h4>
                  <p className="text-sm text-muted-foreground">
                    Une fois votre compte supprimé, il n'y a pas de retour en arrière possible. Toutes vos données seront définitivement supprimées.
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive" className="mt-4">
                        Supprimer le compte
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Êtes-vous absolument sûr ?</DialogTitle>
                        <DialogDescription>
                          Cette action ne peut pas être annulée. Cela supprimera définitivement votre compte et toutes vos
                          données de nos serveurs.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="confirm">
                            Tapez <span className="font-medium">delete</span> pour confirmer
                          </Label>
                          <Input id="confirm" placeholder="delete" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Annuler</Button>
                        <Button 
                          variant="destructive" 
                          onClick={handleDeleteAccount}
                          disabled={isDeleting}
                        >
                          {isDeleting ? "Suppression..." : "Supprimer le compte"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

