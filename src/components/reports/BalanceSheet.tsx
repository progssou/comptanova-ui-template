
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, FileText, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BalanceSheetItem {
  account: string;
  accountName: string;
  currentYear: number;
  previousYear: number;
  category: 'actif' | 'passif';
  subcategory: string;
}

const balanceSheetData: BalanceSheetItem[] = [
  // ACTIF
  { account: "211000", accountName: "Terrains", currentYear: 150000, previousYear: 150000, category: 'actif', subcategory: 'Immobilisations corporelles' },
  { account: "213000", accountName: "Constructions", currentYear: 250000, previousYear: 260000, category: 'actif', subcategory: 'Immobilisations corporelles' },
  { account: "218000", accountName: "Matériel informatique", currentYear: 45000, previousYear: 35000, category: 'actif', subcategory: 'Immobilisations corporelles' },
  { account: "411000", accountName: "Clients", currentYear: 85000, previousYear: 78000, category: 'actif', subcategory: 'Créances clients' },
  { account: "512000", accountName: "Banque", currentYear: 28750, previousYear: 22500, category: 'actif', subcategory: 'Disponibilités' },
  { account: "530000", accountName: "Caisse", currentYear: 2500, previousYear: 1800, category: 'actif', subcategory: 'Disponibilités' },
  
  // PASSIF
  { account: "101000", accountName: "Capital social", currentYear: 200000, previousYear: 200000, category: 'passif', subcategory: 'Capitaux propres' },
  { account: "120000", accountName: "Résultat de l\'exercice", currentYear: 45230, previousYear: 38500, category: 'passif', subcategory: 'Capitaux propres' },
  { account: "164000", accountName: "Emprunts auprès des établissements de crédit", currentYear: 125000, previousYear: 145000, category: 'passif', subcategory: 'Dettes financières' },
  { account: "401000", accountName: "Fournisseurs", currentYear: 32500, previousYear: 28900, category: 'passif', subcategory: 'Dettes d\'exploitation' },
  { account: "421000", accountName: "Personnel - rémunérations dues", currentYear: 15000, previousYear: 14200, category: 'passif', subcategory: 'Dettes sociales' },
];

const BalanceSheet = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const actifItems = balanceSheetData.filter(item => item.category === 'actif');
  const passifItems = balanceSheetData.filter(item => item.category === 'passif');

  const totalActif = actifItems.reduce((sum, item) => sum + item.currentYear, 0);
  const totalPassif = passifItems.reduce((sum, item) => sum + item.currentYear, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Bilan comptable</h2>
          <p className="text-gray-600">Exercice clos le 31 décembre 2024</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Imprimer
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ACTIF */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-blue-600">ACTIF</CardTitle>
            <CardDescription>Emplois de l'entreprise</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Compte</TableHead>
                  <TableHead>Libellé</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {actifItems.map((item) => (
                  <TableRow key={item.account}>
                    <TableCell className="font-mono text-sm">{item.account}</TableCell>
                    <TableCell>{item.accountName}</TableCell>
                    <TableCell className="text-right font-mono">
                      {formatCurrency(item.currentYear)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t-2 font-bold">
                  <TableCell colSpan={2}>TOTAL ACTIF</TableCell>
                  <TableCell className="text-right">{formatCurrency(totalActif)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* PASSIF */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-green-600">PASSIF</CardTitle>
            <CardDescription>Ressources de l'entreprise</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Compte</TableHead>
                  <TableHead>Libellé</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {passifItems.map((item) => (
                  <TableRow key={item.account}>
                    <TableCell className="font-mono text-sm">{item.account}</TableCell>
                    <TableCell>{item.accountName}</TableCell>
                    <TableCell className="text-right font-mono">
                      {formatCurrency(item.currentYear)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t-2 font-bold">
                  <TableCell colSpan={2}>TOTAL PASSIF</TableCell>
                  <TableCell className="text-right">{formatCurrency(totalPassif)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-4">
            <Badge variant={totalActif === totalPassif ? "default" : "destructive"}>
              Équilibre: {totalActif === totalPassif ? "Conforme" : "Non conforme"}
            </Badge>
            <span className="text-sm text-gray-600">
              Différence: {formatCurrency(Math.abs(totalActif - totalPassif))}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BalanceSheet;
