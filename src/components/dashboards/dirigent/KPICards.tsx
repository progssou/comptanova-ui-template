
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const KPICards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
          <div className="h-4 w-4 text-green-600">📈</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€72,450</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">+12.5%</span> vs mois dernier
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Dépenses</CardTitle>
          <div className="h-4 w-4 text-red-600">📉</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€55,200</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-red-600">+3.2%</span> vs mois dernier
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Trésorerie</CardTitle>
          <div className="h-4 w-4 text-blue-600">💰</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€17,250</div>
          <p className="text-xs text-muted-foreground">
            Solde disponible
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Factures en attente</CardTitle>
          <div className="h-4 w-4 text-orange-600">⏳</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8</div>
          <p className="text-xs text-muted-foreground">
            Total: €12,340
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default KPICards;
