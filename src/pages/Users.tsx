
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Mail, 
  User,
  Shield,
  CheckCircle,
  XCircle
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const users = [
  {
    id: 1,
    name: "Marie Dubois",
    email: "marie.dubois@comptanova.com",
    role: "Dirigeant",
    status: "Actif",
    lastLogin: "Il y a 2h",
    permissions: ["Toutes permissions"],
  },
  {
    id: 2,
    name: "Pierre Martin",
    email: "pierre.martin@entreprise.com",
    role: "Comptable",
    status: "Actif", 
    lastLogin: "Il y a 1 jour",
    permissions: ["Écritures", "Rapports", "Comptes"],
  },
  {
    id: 3,
    name: "Sophie Laurent",
    email: "sophie.laurent@entreprise.com",
    role: "Caissier",
    status: "Invité",
    lastLogin: "Jamais",
    permissions: ["Transactions", "Caisse"],
  },
];

const rolePermissions = {
  "Dirigeant": ["Toutes permissions"],
  "Comptable": ["Écritures", "Rapports", "Comptes", "Clients", "Fournisseurs"],
  "Caissier": ["Transactions", "Caisse", "Factures"],
  "Consultant": ["Rapports", "Consultation"],
};

const planLimits = {
  "Gratuit": 1,
  "Pro": 5,
  "Premium": "Illimité",
};

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [currentPlan] = useState("Pro"); // This would come from context/state
  
  const [inviteForm, setInviteForm] = useState({
    email: "",
    role: "",
    sendEmail: true,
  });

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Inviting user:", inviteForm);
    setIsInviteDialogOpen(false);
    setInviteForm({ email: "", role: "", sendEmail: true });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Dirigeant": return "bg-purple-100 text-purple-800";
      case "Comptable": return "bg-blue-100 text-blue-800";
      case "Caissier": return "bg-green-100 text-green-800";
      case "Consultant": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    return status === "Actif" ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-gray-400" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des utilisateurs</h1>
          <p className="text-gray-600">Gérez les accès et permissions de votre équipe</p>
        </div>
        
        <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
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
                Ajoutez un membre à votre équipe avec des permissions spécifiques
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="utilisateur@entreprise.com"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="role">Rôle</Label>
                <Select onValueChange={(value) => setInviteForm(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Comptable">Comptable</SelectItem>
                    <SelectItem value="Caissier">Caissier</SelectItem>
                    <SelectItem value="Consultant">Consultant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {inviteForm.role && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium mb-2">Permissions incluses :</p>
                  <div className="flex flex-wrap gap-1">
                    {rolePermissions[inviteForm.role as keyof typeof rolePermissions]?.map((permission) => (
                      <Badge key={permission} variant="secondary" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="sendEmail"
                  checked={inviteForm.sendEmail}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, sendEmail: e.target.checked }))}
                />
                <Label htmlFor="sendEmail" className="text-sm">
                  Envoyer l'invitation par email
                </Label>
              </div>

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit">Envoyer l'invitation</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Plan Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-blue-900">Plan actuel : {currentPlan}</h3>
              <p className="text-sm text-blue-700">
                Utilisateurs : {users.length} / {planLimits[currentPlan as keyof typeof planLimits]}
              </p>
            </div>
            <Button variant="outline" size="sm" className="text-blue-700 border-blue-300">
              Mettre à niveau
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Équipe ({users.length})</CardTitle>
          <CardDescription>
            Gérez les membres de votre équipe et leurs permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{user.name}</h3>
                      {getStatusIcon(user.status)}
                    </div>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">{user.lastLogin}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="hidden md:flex flex-wrap gap-1 max-w-xs">
                    {user.permissions.slice(0, 2).map((permission) => (
                      <Badge key={permission} variant="outline" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                    {user.permissions.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{user.permissions.length - 2}
                      </Badge>
                    )}
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="h-4 w-4 mr-2" />
                        Renvoyer invitation
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Shield className="h-4 w-4 mr-2" />
                        Permissions
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role Explanations */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(rolePermissions).map(([role, permissions]) => (
          <Card key={role}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Badge className={getRoleColor(role)}>{role}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {permissions.map((permission) => (
                  <div key={permission} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    {permission}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
