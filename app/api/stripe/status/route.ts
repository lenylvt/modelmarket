import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { headers } from 'next/headers';

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

    return NextResponse.json({
      connected: !!user?.stripeAccountId,
      accountId: user?.stripeAccountId || null
    });
  } catch (error) {
    console.error('Stripe status error:', error);
    return NextResponse.json(
      { error: "Erreur lors de la vérification du statut Stripe" },
      { status: 500 }
    );
  }
} 