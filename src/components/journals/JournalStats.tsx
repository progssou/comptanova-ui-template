
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const JournalStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Écritures du mois</CardTitle>
          <CardDescription>Juin 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">127</div>
          <p className="text-sm text-green-600">+12% vs mois précédent</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Montant total</CardTitle>
          <CardDescription>Débits/Crédits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">€45,230</div>
          <p className="text-sm text-gray-600">Équilibré</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">En attente</CardTitle>
          <CardDescription>Validation requise</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">8</div>
          <p className="text-sm text-gray-600">Écritures en brouillon</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default JournalStats;
