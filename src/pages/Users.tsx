
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Users as UsersIcon, Plus, Edit, Trash, Mail, User, Shield } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'dirigeant' | 'comptable' | 'caissier';
  status: 'active' | 'invited' | 'suspended';
  lastLogin: string;
  createdAt: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@monentreprise.fr',
      role: 'dirigeant',
      status: 'active',
      lastLogin: '2024-01-15 09:30',
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      firstName: 'Marie',
      lastName: 'Martin',
      email: 'marie.martin@monentreprise.fr',
      role: 'comptable',
      status: 'active',
      lastLogin: '2024-01-14 17:45',
      createdAt: '2024-01-05'
    },
    {
      id: '3',
      firstName: 'Pierre',
      lastName: 'Durand',
      email: 'pierre.durand@monentreprise.fr',
      role: 'caissier',
      status: 'invited',
      lastLogin: '-',
      createdAt: '2024-01-10'
    }
  ]);

  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'caissier' as User['role']
  });

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const roleLabels = {
    dirigeant: 'Dirigeant',
    comptable: 'Comptable',
    caissier: 'Caissier'
  };

  const statusLabels = {
    active: 'Actif',
    invited: 'Invité',
    suspended: 'Suspendu'
  };

  const statusColors = {
    active: 'bg-green-100 text-green-700',
    invited: 'bg-orange-100 text-orange-700',
    suspended: 'bg-red-100 text-red-700'
  };

  const rolePermissions = {
    dirigeant: ['Tous les modules', 'Gestion utilisateurs', 'Paramètres', 'Rapports'],
    comptable: ['Journaux', 'Comptes', 'Pièces', 'Rapports'],
    caissier: ['Saisie factures', 'Consultation comptes']
  };

  const planLimits = {
    Gratuit: 1,
    Pro: 5,
    Premium: Infinity
  };

  const currentPlan = 'Pro';
  const currentUserCount = users.filter(u => u.status !== 'suspended').length;
  const maxUsers = planLimits[currentPlan as keyof typeof planLimits];

  const handleAddUser = () => {
    if (currentUserCount >= maxUsers) {
      alert('Limite d\'utilisateurs atteinte pour votre plan');
      return;
    }

    const user: User = {
      id: Date.now().toString(),
      ...newUser,
      status: 'invited',
      lastLogin: '-',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsers([...users, user]);
    setNewUser({ firstName: '', lastName: '', email: '', role: 'caissier' });
    setIsAddDialogOpen(false);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  const handleStatusChange = (userId: string, newStatus: User['status']) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: newStatus } : u
    ));
  };

  const resendInvitation = (email: string) => {
    console.log('Renvoi invitation à:', email);
    // Logic to resend invitation
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <UsersIcon className="h-8 w-8" />
              Gestion des utilisateurs
            </h1>
            <p className="text-gray-600">
              Gérez votre équipe et leurs accès aux modules
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Inviter un utilisateur
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Inviter un nouvel utilisateur</DialogTitle>
                <DialogDescription>
                  L'utilisateur recevra un email d'invitation pour rejoindre votre espace ComptaNova.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      value={newUser.firstName}
                      onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      value={newUser.lastName}
                      onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="role">Rôle</Label>
                  <Select value={newUser.role} onValueChange={(value: User['role']) => setNewUser({...newUser, role: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="caissier">Caissier</SelectItem>
                      <SelectItem value="comptable">Comptable</SelectItem>
                      <SelectItem value="dirigeant">Dirigeant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Permissions preview */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium mb-2">Permissions pour ce rôle :</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {rolePermissions[newUser.role].map((permission, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                        {permission}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddUser}>
                  Envoyer l'invitation
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Plan Usage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Utilisation du plan {currentPlan}</span>
              <Badge variant="outline">
                {currentUserCount} / {maxUsers === Infinity ? '∞' : maxUsers} utilisateurs
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {maxUsers === Infinity 
                  ? 'Utilisateurs illimités avec votre plan Premium'
                  : `${maxUsers - currentUserCount} utilisateur(s) supplémentaire(s) disponible(s)`
                }
              </p>
              {currentUserCount >= maxUsers && maxUsers !== Infinity && (
                <Button variant="outline" size="sm">
                  Upgrader le plan
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle>Équipe ({users.length})</CardTitle>
            <CardDescription>
              Gérez les accès et permissions de votre équipe
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-700 font-semibold">
                        {user.firstName[0]}{user.lastName[0]}
                      </span>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{user.firstName} {user.lastName}</p>
                        <Badge variant="outline" className={statusColors[user.status]}>
                          {statusLabels[user.status]}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          {roleLabels[user.role]}
                        </span>
                        <span>Dernière connexion: {user.lastLogin}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {user.status === 'invited' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => resendInvitation(user.email)}
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        Renvoyer
                      </Button>
                    )}
                    
                    {user.status === 'active' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(user.id, 'suspended')}
                      >
                        Suspendre
                      </Button>
                    )}
                    
                    {user.status === 'suspended' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(user.id, 'active')}
                      >
                        Réactiver
                      </Button>
                    )}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingUser(user)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    {user.role !== 'dirigeant' && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Supprimer l'utilisateur</AlertDialogTitle>
                            <AlertDialogDescription>
                              Êtes-vous sûr de vouloir supprimer {user.firstName} {user.lastName} ? 
                              Cette action est irréversible.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteUser(user.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Roles & Permissions */}
        <Card>
          <CardHeader>
            <CardTitle>Rôles et permissions</CardTitle>
            <CardDescription>
              Aperçu des accès par rôle dans ComptaNova
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(rolePermissions).map(([role, permissions]) => (
                <div key={role} className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    {roleLabels[role as keyof typeof roleLabels]}
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {permissions.map((permission, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                        {permission}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Users;
