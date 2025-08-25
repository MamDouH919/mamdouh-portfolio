import type { ReactNode } from "react"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="px-2 py-1 text-base font-semibold">Dashboard</div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={false}>
                    <Link href="/dashboard/testimonials">
                      <span>Testimonials</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={false}>
                    <Link href="/dashboard/visitors">
                      <span>Visitors</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="border-b">
          <div className="flex h-12 items-center gap-2 px-4">
            <SidebarTrigger />
            <div className="text-sm text-muted-foreground">Admin</div>
          </div>
        </div>
        <div className="p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}



