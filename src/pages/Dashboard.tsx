
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, ArrowUpRight, FileText, RefreshCw, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PeriodClosing from "@/components/journals/PeriodClosing";
import VATDeclaration from "@/components/fiscal/VATDeclaration";
import ChartsSection from "@/components/dashboards/dirigent/ChartsSection";
import { useLanguage } from "../hooks/useLanguage";
import { useCurrency } from "../hooks/useCurrency";

interface BankTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "matched" | "unmatched" | "pending";
  reference?: string;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { formatAmount } = useCurrency();

  const bankTransactions: BankTransaction[] = [
    {
      id: "BT001",
      date: "2024-03-15",
      description: "Paiement client ABC",
      amount: 1200.00,
      status: "matched",
      reference: "FAC-2024-001"
    },
    {
      id: "BT002",
      date: "2024-03-14",
      description: "Virement fournisseur XYZ",
      amount: -850.00,
      status: "unmatched"
    },
    {
      id: "BT003",
      date: "2024-03-14",
      description: "Frais bancaires",
      amount: -25.00,
      status: "pending"
    }
  ];

  const getStatusBadge = (status: BankTransaction["status"]) => {
    const variants = {
      "matched": "default",
      "unmatched": "destructive",
      "pending": "outline"
    } as const;
    
    const labels = {
      "matched": "Lettré",
      "unmatched": "Non lettré", 
      "pending": "En attente"
    };
    
    return (
      <Badge variant={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{t('dashboard')}</h1>
            <p className="text-gray-600">Vue d'ensemble de la comptabilité</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Actualiser
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => navigate('/reports')}
            >
              <BarChart3 className="h-4 w-4" />
              États financiers
            </Button>
            <Button className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Rapports
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t('revenue')}</CardTitle>
              <CardDescription>Mars 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatAmount(45230)}</div>
              <p className="text-sm text-green-600 flex items-center gap-1">
                <ArrowUpRight className="h-4 w-4" />
                +12% vs mois précédent
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t('treasury')}</CardTitle>
              <CardDescription>Solde actuel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{formatAmount(28750)}</div>
              <p className="text-sm text-gray-600">3 comptes bancaires</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t('receivables')}</CardTitle>
              <CardDescription>En cours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{formatAmount(15420)}</div>
              <p className="text-sm text-gray-600">8 factures en attente</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t('payables')}</CardTitle>
              <CardDescription>À payer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{formatAmount(8950)}</div>
              <p className="text-sm text-gray-600">5 factures à payer</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue générale</TabsTrigger>
            <TabsTrigger value="bank">Rapprochement</TabsTrigger>
            <TabsTrigger value="vat">TVA</TabsTrigger>
            <TabsTrigger value="closing">Clôture</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                8 écritures en attente de validation. 3 documents non traités.
              </AlertDescription>
            </Alert>

            <ChartsSection />

            <Card>
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
                <CardDescription>Dernières opérations comptables</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Contenu de l'activité récente */}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bank" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Rapprochement bancaire</CardTitle>
                <CardDescription>État du lettrage des opérations</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Référence</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bankTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell className={transaction.amount >= 0 ? "text-green-600" : "text-red-600"}>
                          €{Math.abs(transaction.amount).toFixed(2)}
                        </TableCell>
                        <TableCell>{transaction.reference || "-"}</TableCell>
                        <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vat">
            <VATDeclaration />
          </TabsContent>

          <TabsContent value="closing">
            <PeriodClosing />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
