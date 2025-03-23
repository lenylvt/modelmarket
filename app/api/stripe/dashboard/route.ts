import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id
      },
      select: {
        stripeAccountId: true
      }
    });

    if (!user?.stripeAccountId) {
      return NextResponse.json(
        { error: "Compte Stripe non connecté" },
        { status: 400 }
      );
    }

    const loginLink = await stripe.accounts.createLoginLink(user.stripeAccountId);

    return NextResponse.json({ url: loginLink.url });
  } catch (error) {
    console.error('Stripe dashboard error:', error);
    return NextResponse.json(
      { error: "Erreur lors de l'accès au dashboard Stripe" },
      { status: 500 }
    );
  }
} 