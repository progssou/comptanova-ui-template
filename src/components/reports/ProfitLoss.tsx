
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Printer, TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProfitLossItem {
  account: string;
  accountName: string;
  currentYear: number;
  previousYear: number;
  category: 'produits' | 'charges';
  subcategory: string;
}

const profitLossData: ProfitLossItem[] = [
  // PRODUITS
  { account: "706000", accountName: "Prestations de services", currentYear: 320000, previousYear: 285000, category: 'produits', subcategory: 'Chiffre d\'affaires' },
  { account: "707000", accountName: "Ventes de marchandises", currentYear: 85000, previousYear: 72000, category: 'produits', subcategory: 'Chiffre d\'affaires' },
  { account: "758000", accountName: "Produits divers de gestion courante", currentYear: 5200, previousYear: 3800, category: 'produits', subcategory: 'Autres produits' },
  
  // CHARGES
  { account: "601000", accountName: "Achats de marchandises", currentYear: 42500, previousYear: 36000, category: 'charges', subcategory: 'Achats' },
  { account: "611000", accountName: "Sous-traitance générale", currentYear: 28000, previousYear: 25000, category: 'charges', subcategory: 'Services extérieurs' },
  { account: "613000", accountName: "Locations", currentYear: 24000, previousYear: 24000, category: 'charges', subcategory: 'Services extérieurs' },
  { account: "625000", accountName: "Déplacements, missions", currentYear: 8500, previousYear: 12000, category: 'charges', subcategory: 'Autres services extérieurs' },
  { account: "626000", accountName: "Frais postaux et télécommunications", currentYear: 3600, previousYear: 4200, category: 'charges', subcategory: 'Autres services extérieurs' },
  { account: "641000", accountName: "Rémunérations du personnel", currentYear: 180000, previousYear: 165000, category: 'charges', subcategory: 'Charges de personnel' },
  { account: "645000", accountName: "Charges de sécurité sociale", currentYear: 72000, previousYear: 66000, category: 'charges', subcategory: 'Charges sociales' },
  { account: "681000", accountName: "Dotations aux amortissements", currentYear: 15000, previousYear: 14500, category: 'charges', subcategory: 'Dotations' },
];

const ProfitLoss = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const produits = profitLossData.filter(item => item.category === 'produits');
  const charges = profitLossData.filter(item => item.category === 'charges');

  const totalProduits = produits.reduce((sum, item) => sum + item.currentYear, 0);
  const totalCharges = charges.reduce((sum, item) => sum + item.currentYear, 0);
  const resultat = totalProduits - totalCharges;

  const evolutionProduits = ((totalProduits - produits.reduce((sum, item) => sum + item.previousYear, 0)) / produits.reduce((sum, item) => sum + item.previousYear, 0)) * 100;
  const evolutionCharges = ((totalCharges - charges.reduce((sum, item) => sum + item.previousYear, 0)) / charges.reduce((sum, item) => sum + item.previousYear, 0)) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Compte de résultat</h2>
          <p className="text-gray-600">Exercice du 1er janvier au 31 décembre 2024</p>
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
        {/* PRODUITS */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-green-600 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              PRODUITS
            </CardTitle>
            <CardDescription>
              Revenus de l'exercice
              <Badge variant="outline" className="ml-2 text-green-600">
                +{evolutionProduits.toFixed(1)}%
              </Badge>
            </CardDescription>
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
                {produits.map((item) => (
                  <TableRow key={item.account}>
                    <TableCell className="font-mono text-sm">{item.account}</TableCell>
                    <TableCell>{item.accountName}</TableCell>
                    <TableCell className="text-right font-mono">
                      {formatCurrency(item.currentYear)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t-2 font-bold">
                  <TableCell colSpan={2}>TOTAL PRODUITS</TableCell>
                  <TableCell className="text-right">{formatCurrency(totalProduits)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* CHARGES */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-red-600 flex items-center gap-2">
              <TrendingDown className="h-5 w-5" />
              CHARGES
            </CardTitle>
            <CardDescription>
              Dépenses de l'exercice
              <Badge variant="outline" className="ml-2 text-red-600">
                +{evolutionCharges.toFixed(1)}%
              </Badge>
            </CardDescription>
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
                {charges.map((item) => (
                  <TableRow key={item.account}>
                    <TableCell className="font-mono text-sm">{item.account}</TableCell>
                    <TableCell>{item.accountName}</TableCell>
                    <TableCell className="text-right font-mono">
                      {formatCurrency(item.currentYear)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t-2 font-bold">
                  <TableCell colSpan={2}>TOTAL CHARGES</TableCell>
                  <TableCell className="text-right">{formatCurrency(totalCharges)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* RÉSULTAT */}
      <Card>
        <CardHeader>
          <CardTitle className={`text-xl ${resultat >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            RÉSULTAT DE L'EXERCICE
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Produits</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalProduits)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Charges</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(totalCharges)}</p>
            </div>
            <div className="text-center border-l border-gray-200 pl-4">
              <p className="text-sm text-gray-600">Résultat Net</p>
              <p className={`text-3xl font-bold ${resultat >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(resultat)}
              </p>
              <Badge variant={resultat >= 0 ? "default" : "destructive"}>
                {resultat >= 0 ? "Bénéfice" : "Perte"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfitLoss;
