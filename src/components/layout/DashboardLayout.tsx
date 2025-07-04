
import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AIAssistantModal from "@/components/modals/AIAssistantModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  Menu,
  Bell,
  Search,
  LogOut,
  User,
  Moon,
  Sun,
  Globe
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useLanguage } from "../../hooks/useLanguage";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { currentLanguage, changeLanguage, allLanguages, t } = useLanguage();

  const menuItems = [
    { 
      name: t('dashboard'), 
      path: "/dashboard", 
      icon: LayoutDashboard,
      description: "Vue d'ensemble"
    },
    { 
      name: t('journals'), 
      path: "/journals", 
      icon: FileText,
      description: "Saisie comptable",
      badge: "3"
    },
    { 
      name: t('accounts'), 
      path: "/accounts", 
      icon: FileText,
      description: "Plan comptable"
    },
    { 
      name: "Rapprochement", 
      path: "/bank-reconciliation", 
      icon: FileText,
      description: "Rapprochement bancaire"
    },
    { 
      name: "Pièces", 
      path: "/documents", 
      icon: FileText,
      description: "Factures & documents"
    },
    { 
      name: "Utilisateurs", 
      path: "/users", 
      icon: Users,
      description: "Gestion d'équipe"
    },
    { 
      name: t('settings'), 
      path: "/settings", 
      icon: Settings,
      description: "Configuration"
    },
  ];

  const isCurrentPath = (path: string) => location.pathname === path;

  return (
    <div className={`flex h-screen bg-background ${currentLanguage.rtl ? 'rtl' : ''}`}>
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-card border-r border-border flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">CN</span>
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-lg font-bold text-foreground">ComptaNova</h1>
                <p className="text-xs text-muted-foreground">MonEntreprise SARL</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isCurrentPath(item.path);
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  isActive 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && (
                  <>
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                    {item.badge && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* User info */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Jean Dupont</p>
                <p className="text-xs text-muted-foreground">Dirigeant</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-4 w-4" />
              </Button>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  className="pl-10 w-64"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <Globe className="h-4 w-4" />
                    <span>{currentLanguage.flag}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {allLanguages.map((lang) => (
                    <DropdownMenuItem 
                      key={lang.code} 
                      onClick={() => changeLanguage(lang.code)}
                      className={currentLanguage.code === lang.code ? 'bg-accent' : ''}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.nativeName}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* AI Assistant */}
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-primary/10 text-primary border-primary/20"
                onClick={() => setAiModalOpen(true)}
              >
                🤖 Assistant IA
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></div>
              </Button>

              {/* Theme toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground text-xs font-bold">JD</span>
                    </div>
                    <span className="hidden md:block text-foreground">Jean Dupont</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    Mon profil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/')}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-background">
          {children || <Outlet />}
        </main>
      </div>

      {/* AI Assistant Modal */}
      <AIAssistantModal open={aiModalOpen} onOpenChange={setAiModalOpen} />
    </div>
  );
};

export default DashboardLayout;
