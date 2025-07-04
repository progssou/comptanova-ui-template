
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Filter, Printer, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface TrialBalanceItem {
  account: string;
  accountName: string;
  debitTotal: number;
  creditTotal: number;
  debitBalance: number;
  creditBalance: number;
  category: 'actif' | 'passif' | 'charges' | 'produits';
}

const trialBalanceData: TrialBalanceItem[] = [
  // Classe 1 - Comptes de capitaux
  { account: "101000", accountName: "Capital social", debitTotal: 0, creditTotal: 200000, debitBalance: 0, creditBalance: 200000, category: 'passif' },
  { account: "120000", accountName: "Résultat de l'exercice", debitTotal: 0, creditTotal: 45230, debitBalance: 0, creditBalance: 45230, category: 'passif' },
  { account: "164000", accountName: "Emprunts", debitTotal: 20000, creditTotal: 145000, debitBalance: 0, creditBalance: 125000, category: 'passif' },
  
  // Classe 2 - Comptes d'immobilisations
  { account: "211000", accountName: "Terrains", debitTotal: 150000, creditTotal: 0, debitBalance: 150000, creditBalance: 0, category: 'actif' },
  { account: "213000", accountName: "Constructions", debitTotal: 300000, creditTotal: 50000, debitBalance: 250000, creditBalance: 0, category: 'actif' },
  { account: "218000", accountName: "Matériel informatique", debitTotal: 65000, creditTotal: 20000, debitBalance: 45000, creditBalance: 0, category: 'actif' },
  
  // Classe 4 - Comptes de tiers
  { account: "401000", accountName: "Fournisseurs", debitTotal: 185000, creditTotal: 217500, debitBalance: 0, creditBalance: 32500, category: 'passif' },
  { account: "411000", accountName: "Clients", debitTotal: 245000, creditTotal: 160000, debitBalance: 85000, creditBalance: 0, category: 'actif' },
  { account: "421000", accountName: "Personnel", debitTotal: 195000, creditTotal: 210000, debitBalance: 0, creditBalance: 15000, category: 'passif' },
  
  // Classe 5 - Comptes financiers
  { account: "512000", accountName: "Banque", debitTotal: 425000, creditTotal: 396250, debitBalance: 28750, creditBalance: 0, category: 'actif' },
  { account: "530000", accountName: "Caisse", debitTotal: 12500, creditTotal: 10000, debitBalance: 2500, creditBalance: 0, category: 'actif' },
  
  // Classe 6 - Comptes de charges
  { account: "601000", accountName: "Achats marchandises", debitTotal: 42500, creditTotal: 0, debitBalance: 42500, creditBalance: 0, category: 'charges' },
  { account: "613000", accountName: "Locations", debitTotal: 24000, creditTotal: 0, debitBalance: 24000, creditBalance: 0, category: 'charges' },
  { account: "641000", accountName: "Rémunérations", debitTotal: 180000, creditTotal: 0, debitBalance: 180000, creditBalance: 0, category: 'charges' },
  { account: "645000", accountName: "Charges sociales", debitTotal: 72000, creditTotal: 0, debitBalance: 72000, creditBalance: 0, category: 'charges' },
  
  // Classe 7 - Comptes de produits
  { account: "706000", accountName: "Prestations de services", debitTotal: 0, creditTotal: 320000, debitBalance: 0, creditBalance: 320000, category: 'produits' },
  { account: "707000", accountName: "Ventes marchandises", debitTotal: 0, creditTotal: 85000, debitBalance: 0, creditBalance: 85000, category: 'produits' },
];

const TrialBalance = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const filteredData = trialBalanceData.filter(item => 
    item.account.includes(searchTerm) || 
    item.accountName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalDebits = filteredData.reduce((sum, item) => sum + item.debitTotal, 0);
  const totalCredits = filteredData.reduce((sum, item) => sum + item.creditTotal, 0);
  const totalDebitBalances = filteredData.reduce((sum, item) => sum + item.debitBalance, 0);
  const totalCreditBalances = filteredData.reduce((sum, item) => sum + item.creditBalance, 0);

  const getCategoryBadge = (category: string) => {
    const variants = {
      'actif': { variant: 'default' as const, label: 'Actif', color: 'bg-blue-100 text-blue-800' },
      'passif': { variant: 'secondary' as const, label: 'Passif', color: 'bg-green-100 text-green-800' },
      'charges': { variant: 'destructive' as const, label: 'Charges', color: 'bg-red-100 text-red-800' },
      'produits': { variant: 'outline' as const, label: 'Produits', color: 'bg-emerald-100 text-emerald-800' }
    };
    
    return (
      <Badge variant={variants[category]?.variant} className={variants[category]?.color}>
        {variants[category]?.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Balance générale</h2>
          <p className="text-gray-600">Situation au 31 décembre 2024</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Imprimer
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter Excel
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Balance des comptes</CardTitle>
              <CardDescription>Mouvements et soldes par compte</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un compte..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtrer
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Compte</TableHead>
                <TableHead>Libellé</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Total Débit</TableHead>
                <TableHead className="text-right">Total Crédit</TableHead>
                <TableHead className="text-right">Solde Débiteur</TableHead>
                <TableHead className="text-right">Solde Créditeur</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.account} className="hover:bg-gray-50">
                  <TableCell className="font-mono font-medium">{item.account}</TableCell>
                  <TableCell>{item.accountName}</TableCell>
                  <TableCell>{getCategoryBadge(item.category)}</TableCell>
                  <TableCell className="text-right font-mono">
                    {item.debitTotal > 0 ? formatCurrency(item.debitTotal) : '-'}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {item.creditTotal > 0 ? formatCurrency(item.creditTotal) : '-'}
                  </TableCell>
                  <TableCell className="text-right font-mono text-blue-600">
                    {item.debitBalance > 0 ? formatCurrency(item.debitBalance) : '-'}
                  </TableCell>
                  <TableCell className="text-right font-mono text-green-600">
                    {item.creditBalance > 0 ? formatCurrency(item.creditBalance) : '-'}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2 font-bold bg-gray-50">
                <TableCell colSpan={3}>TOTAUX</TableCell>
                <TableCell className="text-right">{formatCurrency(totalDebits)}</TableCell>
                <TableCell className="text-right">{formatCurrency(totalCredits)}</TableCell>
                <TableCell className="text-right text-blue-600">{formatCurrency(totalDebitBalances)}</TableCell>
                <TableCell className="text-right text-green-600">{formatCurrency(totalCreditBalances)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contrôle d'équilibre</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total débits:</span>
                <span className="font-mono">{formatCurrency(totalDebits)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total crédits:</span>
                <span className="font-mono">{formatCurrency(totalCredits)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold">
                <span>Différence:</span>
                <Badge variant={totalDebits === totalCredits ? "default" : "destructive"}>
                  {formatCurrency(Math.abs(totalDebits - totalCredits))}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Répartition par nature</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Comptes d'actif:</span>
                <Badge variant="default">{filteredData.filter(item => item.category === 'actif').length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Comptes de passif:</span>
                <Badge variant="secondary">{filteredData.filter(item => item.category === 'passif').length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Comptes de charges:</span>
                <Badge variant="destructive">{filteredData.filter(item => item.category === 'charges').length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Comptes de produits:</span>
                <Badge variant="outline">{filteredData.filter(item => item.category === 'produits').length}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrialBalance;
