
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ComptableDashboard = () => {
  const validationData = [
    { month: 'Jan', ecritures: 45, validees: 42 },
    { month: 'Fév', ecritures: 52, validees: 48 },
    { month: 'Mar', ecritures: 48, validees: 46 },
    { month: 'Avr', ecritures: 58, validees: 55 },
    { month: 'Mai', ecritures: 65, validees: 62 },
    { month: 'Jun', ecritures: 72, validees: 68 },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards pour Comptable */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Écritures à valider</CardTitle>
            <CardDescription>En attente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">12</div>
            <p className="text-sm text-gray-600">Nécessite validation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Validées ce mois</CardTitle>
            <CardDescription>Juin 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">68</div>
            <p className="text-sm text-green-600">+8% vs mois précédent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Anomalies détectées</CardTitle>
            <CardDescription>À corriger</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-sm text-gray-600">Incohérences trouvées</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Taux de validation</CardTitle>
            <CardDescription>Performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">94%</div>
            <p className="text-sm text-gray-600">Objectif: 95%</p>
          </CardContent>
        </Card>
      </div>

      {/* Graphique de validation */}
      <Card>
        <CardHeader>
          <CardTitle>Activité de validation</CardTitle>
          <CardDescription>Écritures saisies vs validées</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={validationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ecritures" fill="#3B82F6" name="Écritures saisies" />
              <Bar dataKey="validees" fill="#10B981" name="Validées" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tâches en cours */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tâches prioritaires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">Validation des factures clients</p>
                  <p className="text-sm text-gray-500">8 factures en attente</p>
                </div>
                <Badge variant="outline" className="text-orange-600">Urgent</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">Rapprochement bancaire</p>
                  <p className="text-sm text-gray-500">Compte principal</p>
                </div>
                <Badge variant="outline" className="text-blue-600">Normal</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">Révision charges sociales</p>
                  <p className="text-sm text-gray-500">Déclaration mensuelle</p>
                </div>
                <Badge variant="outline" className="text-green-600">Fait</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Objectifs du mois</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Écritures validées</span>
                <span>68 / 75</span>
              </div>
              <Progress value={91} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Rapprochements</span>
                <span>12 / 15</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Délai moyen validation</span>
                <span>1.2j / 2j</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComptableDashboard;
