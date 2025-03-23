"use client"

import * as React from "react"
import {
  Home,
  UserCircle,
  Paintbrush,
  Command,
  LifeBuoy,
  Settings,
} from "lucide-react"
import { useSession } from "@/lib/auth-client"
import Link from "next/link"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navMain = [
  {
    title: "Accueil",
    url: "/dashboard",
    icon: Home,
    isActive: true,
    items: [
      {
        title: "À la une",
        url: "/dashboard",
      },
      {
        title: "Populaire",
        url: "/dashboard/popular",
      },
      {
        title: "Récent",
        url: "/dashboard/recent",
      },
    ],
  },
  {
    title: "Client",
    url: "/dashboard/client",
    icon: UserCircle,
    items: [
      {
        title: "Demander un modèle",
        url: "/dashboard/client/request",
      },
      {
        title: "Mes demandes",
        url: "/dashboard/client/requests",
      },
      {
        title: "Mes modèles",
        url: "/dashboard/client/models",
      },
    ],
  },
  {
    title: "Créateur",
    url: "/dashboard/creator",
    icon: Paintbrush,
    items: [
      {
        title: "Mes Créations",
        url: "/dashboard/creator/models",
      },
      {
        title: "Mes Ventes",
        url: "/dashboard/creator/sales",
      },
    ],
  },
]

const navSecondary = [
  {
    title: "Support",
    url: "#",
    icon: LifeBuoy,
  },
  {
    title: "Paramètres",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data } = useSession()

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">ModelMarket</span>
                  <span className="truncate text-xs">Marketplace</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {data?.user && <NavUser user={data.user} />}
      </SidebarFooter>
    </Sidebar>
  )
}
