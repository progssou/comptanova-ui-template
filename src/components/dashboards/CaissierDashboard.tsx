
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CaissierDashboard = () => {
  const cashData = [
    { day: 'Lun', entrees: 1200, sorties: 850 },
    { day: 'Mar', entrees: 1850, sorties: 1200 },
    { day: 'Mer', entrees: 950, sorties: 750 },
    { day: 'Jeu', entrees: 2100, sorties: 1400 },
    { day: 'Ven', entrees: 1650, sorties: 980 },
    { day: 'Sam', entrees: 2200, sorties: 1100 },
    { day: 'Dim', entrees: 800, sorties: 450 },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards pour Caissier */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Solde caisse</CardTitle>
            <CardDescription>Disponible</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">€3,450</div>
            <p className="text-sm text-gray-600">Solde actuel</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Entrées du jour</CardTitle>
            <CardDescription>Recettes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">€2,200</div>
            <p className="text-sm text-green-600">+15% vs hier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Sorties du jour</CardTitle>
            <CardDescription>Dépenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">€1,100</div>
            <p className="text-sm text-red-600">+5% vs hier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Transactions</CardTitle>
            <CardDescription>Aujourd'hui</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">28</div>
            <p className="text-sm text-gray-600">Opérations traitées</p>
          </CardContent>
        </Card>
      </div>

      {/* Graphique des flux de caisse */}
      <Card>
        <CardHeader>
          <CardTitle>Flux de caisse - Cette semaine</CardTitle>
          <CardDescription>Entrées et sorties quotidiennes</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cashData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value) => [`€${value}`, '']} />
              <Line type="monotone" dataKey="entrees" stroke="#10B981" strokeWidth={2} name="Entrées" />
              <Line type="monotone" dataKey="sorties" stroke="#EF4444" strokeWidth={2} name="Sorties" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Activité et alertes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Dernières transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">Vente client #1234</p>
                  <p className="text-sm text-gray-500">Il y a 15 min</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">+€450.00</div>
                  <Badge variant="outline" className="text-green-600">Espèces</Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">Achat fournitures</p>
                  <p className="text-sm text-gray-500">Il y a 1h</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-red-600">-€125.50</div>
                  <Badge variant="outline" className="text-blue-600">Carte</Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">Vente client #1233</p>
                  <p className="text-sm text-gray-500">Il y a 2h</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">+€280.00</div>
                  <Badge variant="outline" className="text-purple-600">Chèque</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contrôles et alertes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 border rounded bg-yellow-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-yellow-800">Rapprochement caisse</p>
                  <p className="text-sm text-yellow-600">À effectuer avant 18h</p>
                </div>
                <Badge className="bg-yellow-200 text-yellow-800">Pending</Badge>
              </div>
            </div>
            
            <div className="p-3 border rounded bg-green-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-green-800">Dépôt bancaire</p>
                  <p className="text-sm text-green-600">Effectué ce matin</p>
                </div>
                <Badge className="bg-green-200 text-green-800">OK</Badge>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Objectif journalier</span>
                <span>€2,200 / €2,500</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CaissierDashboard;
