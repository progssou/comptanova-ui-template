
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  CreditCard,
  FileText,
  Users,
  Settings,
  Menu,
  X,
  Bot
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Tableau de bord",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Journaux",
    url: "/journaux",
    icon: BookOpen,
  },
  {
    title: "Comptes",
    url: "/comptes",
    icon: CreditCard,
  },
  {
    title: "Pièces",
    url: "/pieces",
    icon: FileText,
  },
  {
    title: "Utilisateurs",
    url: "/utilisateurs",
    icon: Users,
  },
  {
    title: "Paramètres",
    url: "/parametres",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + '/');

  const getNavClass = (isActiveRoute: boolean) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
      isActiveRoute
        ? "bg-primary text-primary-foreground"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} border-r bg-white`}>
      <SidebarContent className="p-4">
        <div className="mb-8">
          <h1 className={`font-bold text-primary ${collapsed ? "text-sm" : "text-xl"}`}>
            {collapsed ? "CN" : "ComptaNova"}
          </h1>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={getNavClass(isActive(item.url))}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <div className="mt-auto pt-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="h-5 w-5 text-primary" />
                <span className="font-medium text-sm">Assistant IA</span>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                Posez vos questions comptables...
              </p>
              <Button size="sm" className="w-full bg-primary hover:bg-primary-600">
                Démarrer
              </Button>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
