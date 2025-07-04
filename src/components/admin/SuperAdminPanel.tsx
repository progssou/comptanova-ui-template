
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Shield, 
  Users, 
  Settings, 
  Database, 
  Activity, 
  AlertTriangle,
  Server,
  BarChart3,
  FileText,
  Mail,
  Trash,
  Edit,
  Plus,
  Globe
} from "lucide-react";
import ContentManagement from "./ContentManagement";

interface Company {
  id: string;
  name: string;
  plan: string;
  users: number;
  status: 'active' | 'suspended' | 'trial';
  lastActivity: string;
}

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'support';
  lastLogin: string;
  status: 'active' | 'inactive';
}

const SuperAdminPanel = () => {
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: '1',
      name: 'MonEntreprise SARL',
      plan: 'Pro',
      users: 3,
      status: 'active',
      lastActivity: '2024-01-15 14:30'
    },
    {
      id: '2',
      name: 'TechCorp SAS',
      plan: 'Premium',
      users: 15,
      status: 'active',
      lastActivity: '2024-01-15 09:15'
    },
    {
      id: '3',
      name: 'StartupXYZ',
      plan: 'Gratuit',
      users: 1,
      status: 'trial',
      lastActivity: '2024-01-14 16:45'
    }
  ]);

  const [systemUsers, setSystemUsers] = useState<SystemUser[]>([
    {
      id: '1',
      name: 'Admin Principal',
      email: 'admin@comptanova.com',
      role: 'super_admin',
      lastLogin: '2024-01-15 10:00',
      status: 'active'
    },
    {
      id: '2',
      name: 'Support Tech',
      email: 'support@comptanova.com',
      role: 'support',
      lastLogin: '2024-01-15 08:30',
      status: 'active'
    }
  ]);

  const [systemStats] = useState({
    totalCompanies: 156,
    activeUsers: 1247,
    monthlyRevenue: 45670,
    systemUptime: '99.9%',
    dailyTransactions: 8934,
    storageUsed: '2.4 TB'
  });

  const statusColors = {
    active: 'bg-green-100 text-green-700',
    suspended: 'bg-red-100 text-red-700',
    trial: 'bg-orange-100 text-orange-700',
    inactive: 'bg-gray-100 text-gray-700'
  };

  const roleLabels = {
    super_admin: 'Super Admin',
    admin: 'Administrateur',
    support: 'Support'
  };

  const suspendCompany = (companyId: string) => {
    setCompanies(companies.map(c => 
      c.id === companyId ? { ...c, status: 'suspended' as const } : c
    ));
  };

  const activateCompany = (companyId: string) => {
    setCompanies(companies.map(c => 
      c.id === companyId ? { ...c, status: 'active' as const } : c
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2 text-foreground">
            <Shield className="h-8 w-8 text-primary" />
            Panneau Super Admin
          </h1>
          <p className="text-muted-foreground">
            Gestion complète du système ComptaNova
          </p>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Entreprises</p>
                <p className="text-2xl font-bold text-foreground">{systemStats.totalCompanies}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Utilisateurs actifs</p>
                <p className="text-2xl font-bold text-foreground">{systemStats.activeUsers}</p>
              </div>
              <Activity className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenus mensuel</p>
                <p className="text-2xl font-bold text-foreground">€{systemStats.monthlyRevenue.toLocaleString()}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Uptime système</p>
                <p className="text-2xl font-bold text-foreground">{systemStats.systemUptime}</p>
              </div>
              <Server className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Transactions/jour</p>
                <p className="text-2xl font-bold text-foreground">{systemStats.dailyTransactions.toLocaleString()}</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Stockage utilisé</p>
                <p className="text-2xl font-bold text-foreground">{systemStats.storageUsed}</p>
              </div>
              <Database className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="content" className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Contenu site
          </TabsTrigger>
          <TabsTrigger value="companies">Entreprises</TabsTrigger>
          <TabsTrigger value="system-users">Admins système</TabsTrigger>
          <TabsTrigger value="system-config">Configuration</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        {/* Content Management */}
        <TabsContent value="content">
          <ContentManagement />
        </TabsContent>

        {/* Companies Management */}
        <TabsContent value="companies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des entreprises</CardTitle>
              <CardDescription>
                Gérez toutes les entreprises utilisant ComptaNova
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {companies.map((company) => (
                  <div key={company.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-foreground">{company.name}</p>
                          <Badge variant="outline" className={statusColors[company.status]}>
                            {company.status}
                          </Badge>
                          <Badge variant="secondary">
                            Plan {company.plan}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span>{company.users} utilisateurs</span>
                          <span>Dernière activité: {company.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Modifier
                      </Button>
                      
                      {company.status === 'active' ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => suspendCompany(company.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Suspendre
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => activateCompany(company.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          Activer
                        </Button>
                      )}
                      
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Users */}
        <TabsContent value="system-users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Administrateurs système
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvel admin
                </Button>
              </CardTitle>
              <CardDescription>
                Gérez les accès administrateur au système
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold text-sm">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-foreground">{user.name}</p>
                          <Badge variant="outline" className={statusColors[user.status]}>
                            {user.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span>{user.email}</span>
                          <span>{roleLabels[user.role]}</span>
                          <span>Dernière connexion: {user.lastLogin}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Configuration */}
        <TabsContent value="system-config" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Configuration générale</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="maintenance">Mode maintenance</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="maintenance" />
                    <span className="text-sm text-muted-foreground">Activer le mode maintenance</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registrations">Nouvelles inscriptions</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="registrations" defaultChecked />
                    <span className="text-sm text-muted-foreground">Autoriser les nouvelles inscriptions</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trial-duration">Durée d'essai (jours)</Label>
                  <Input id="trial-duration" type="number" defaultValue="30" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Limites système</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="max-users-free">Max utilisateurs plan gratuit</Label>
                  <Input id="max-users-free" type="number" defaultValue="1" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-users-pro">Max utilisateurs plan Pro</Label>
                  <Input id="max-users-pro" type="number" defaultValue="5" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storage-limit">Limite stockage (GB)</Label>
                  <Input id="storage-limit" type="number" defaultValue="100" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Monitoring */}
        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Alertes système
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-orange-800">Utilisation CPU élevée</p>
                        <p className="text-sm text-orange-600">CPU à 85% depuis 10 minutes</p>
                        <p className="text-xs text-orange-500">Il y a 5 minutes</p>
                      </div>
                      <Badge className="bg-orange-100 text-orange-700">Moyenne</Badge>
                    </div>
                  </div>

                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-red-800">Échec de sauvegarde</p>
                        <p className="text-sm text-red-600">Sauvegarde automatique échouée</p>
                        <p className="text-xs text-red-500">Il y a 1 heure</p>
                      </div>
                      <Badge className="bg-red-100 text-red-700">Critique</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions système</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Database className="h-4 w-4 mr-2" />
                  Lancer sauvegarde manuelle
                </Button>
                
                <Button className="w-full" variant="outline">
                  <Activity className="h-4 w-4 mr-2" />
                  Redémarrer services
                </Button>
                
                <Button className="w-full" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Télécharger logs système
                </Button>
                
                <Button className="w-full text-red-600 hover:text-red-700" variant="outline">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Mode maintenance d'urgence
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminPanel;
