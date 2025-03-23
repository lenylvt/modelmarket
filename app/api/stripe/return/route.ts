import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';
import { cookies, headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // Récupérer l'ID du compte Stripe depuis les paramètres d'URL
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get('account');

    if (!accountId) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/settings?error=missing_account`);
    }

    // Vérifier que l'utilisateur est connecté
    const session = await auth.api.getSession({
      headers: await headers()
    });
    
    if (!session?.user?.id) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/settings?error=unauthorized`);
    }

    // Vérifier que le compte existe sur Stripe
    const account = await stripe.accounts.retrieve(accountId);
    if (!account) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/settings?error=invalid_account`);
    }

    // Mettre à jour l'utilisateur avec l'ID du compte Stripe
    await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        stripeAccountId: accountId
      }
    });

    // Rediriger vers la page des paramètres
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/settings?success=true`);
  } catch (error) {
    console.error('Stripe return error:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/settings?error=unknown`);
  }
} 