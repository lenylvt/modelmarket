'use client';

import { useSession, signIn, signOut } from "@/lib/auth-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { redirect, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ExternalLink, Trash, LogOut } from "lucide-react";

export default function SettingsPage() {
  const { data, isPending } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);
  const [stripeConnected, setStripeConnected] = useState(false);
  const [stripeAccountId, setStripeAccountId] = useState<string | null>(null);
  const [isLoadingStripe, setIsLoadingStripe] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (data?.user?.id) {
      fetch('/api/stripe/status')
        .then(res => res.json())
        .then(data => {
          setStripeConnected(data.connected);
          setStripeAccountId(data.accountId);
          setIsLoadingStripe(false);
        })
        .catch(error => {
          console.error('Error fetching Stripe status:', error);
          setIsLoadingStripe(false);
        });
    }
  }, [data?.user?.id]);

  useEffect(() => {
    const error = searchParams.get('error');
    const success = searchParams.get('success');

    if (error) {
      let message = "Une erreur s'est produite.";
      switch (error) {
        case 'missing_account':
          message = "L'ID du compte Stripe est manquant.";
          break;
        case 'unauthorized':
          message = "Vous devez être connecté pour effectuer cette action.";
          break;
        case 'invalid_account':
          message = "Le compte Stripe est invalide.";
          break;
      }
      alert(message);
    } else if (success) {
      alert("Votre compte Stripe a été connecté avec succès !");
    }
  }, [searchParams]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!data) {
    redirect("/");
  }

  const handleDeleteAccount = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
      setIsDeleting(true);
      try {
        const response = await fetch('/api/user/delete', {
          method: 'DELETE',
        });
        if (response.ok) {
          await signOut();
          redirect('/');
        } else {
          throw new Error('Erreur lors de la suppression du compte');
        }
      } catch (error) {
        console.error('Erreur:', error);
        alert("Une erreur s'est produite lors de la suppression du compte.");
      }
      setIsDeleting(false);
    }
  };

  const handleStripeConnect = async () => {
    try {
      const response = await fetch('/api/stripe/connect', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error connecting Stripe:', error);
    }
  };

  const openStripeDashboard = async () => {
    try {
      const response = await fetch('/api/stripe/dashboard', {
        method: 'GET',
      });
      const data = await response.json();
      if (data.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error opening Stripe dashboard:', error);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Paramètres</h1>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              {data.user?.image && (
                <img
                  src={data.user.image}
                  alt="Profile"
                  className="h-16 w-16 rounded-full"
                />
              )}
              <div>
                <h3 className="font-medium">{data.user?.name}</h3>
                <p className="text-sm text-muted-foreground">{data.user?.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compte Stripe</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Paiements</h3>
                <p className="text-sm text-muted-foreground">
                  {isLoadingStripe 
                    ? "Chargement..."
                    : stripeConnected 
                      ? "Gérez vos paiements et vos revenus" 
                      : "Connectez votre compte pour recevoir des paiements"}
                </p>
              </div>
              {!isLoadingStripe && (
                stripeConnected ? (
                  <Button variant="outline" onClick={openStripeDashboard}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Dashboard Stripe
                  </Button>
                ) : (
                  <Button onClick={handleStripeConnect}>
                    Connecter Stripe
                  </Button>
                )
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Actions Dangereuses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-4">
              <Button 
                variant="outline" 
                onClick={() => signOut()}
                className="w-full justify-between"
              >
                Se déconnecter
                <LogOut className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="w-full justify-between"
              >
                {isDeleting ? 'Suppression...' : 'Supprimer le compte'}
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 