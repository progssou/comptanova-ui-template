
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const ActivityAndGoals = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-2 border rounded">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Facture FAC-2024-156 payée</p>
                <p className="text-xs text-gray-500">Il y a 2 heures</p>
              </div>
              <Badge variant="outline" className="text-green-600">€2,340</Badge>
            </div>
            
            <div className="flex items-center gap-3 p-2 border rounded">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Nouvelle facture créée</p>
                <p className="text-xs text-gray-500">Il y a 4 heures</p>
              </div>
              <Badge variant="outline" className="text-blue-600">€1,850</Badge>
            </div>
            
            <div className="flex items-center gap-3 p-2 border rounded">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Rappel: Facture en retard</p>
                <p className="text-xs text-gray-500">Il y a 1 jour</p>
              </div>
              <Badge variant="outline" className="text-orange-600">€890</Badge>
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
              <span>Chiffre d'affaires</span>
              <span>€72,450 / €80,000</span>
            </div>
            <Progress value={90} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Nouvelles factures</span>
              <span>23 / 30</span>
            </div>
            <Progress value={77} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Taux de recouvrement</span>
              <span>94%</span>
            </div>
            <Progress value={94} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityAndGoals;
