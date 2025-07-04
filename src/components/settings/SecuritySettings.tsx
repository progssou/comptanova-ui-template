
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const SecuritySettings = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Sécurité du compte</CardTitle>
          <CardDescription>
            Protégez votre compte et vos données comptables
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Mot de passe</h4>
              <p className="text-sm text-gray-600 mb-3">Dernière modification: il y a 2 mois</p>
              <Button variant="outline" size="sm">Modifier le mot de passe</Button>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Authentification à deux facteurs</h4>
              <p className="text-sm text-gray-600 mb-3">Sécurisez votre compte avec 2FA</p>
              <Button variant="outline" size="sm">Activer 2FA</Button>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-4">Sessions actives</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Navigateur actuel</p>
                  <p className="text-sm text-gray-600">Chrome sur Windows • Paris, France</p>
                  <p className="text-xs text-gray-500">Actif maintenant</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Actuelle
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Mobile Safari</p>
                  <p className="text-sm text-gray-600">iPhone • Paris, France</p>
                  <p className="text-xs text-gray-500">Il y a 2 heures</p>
                </div>
                <Button variant="outline" size="sm" className="text-red-600">
                  Déconnecter
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          <div className="p-4 bg-red-50 rounded-lg">
            <h4 className="font-medium text-red-800 mb-2">Zone de danger</h4>
            <p className="text-sm text-red-700 mb-3">
              Actions irréversibles qui affecteront définitivement votre compte
            </p>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="text-red-600">
                Exporter toutes les données
              </Button>
              <Button variant="outline" size="sm" className="text-red-600">
                Supprimer le compte
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;
