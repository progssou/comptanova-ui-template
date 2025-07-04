import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Search, Plus, Filter, Download, TrendingUp, TrendingDown } from "lucide-react";
import NewAccountModal from "@/components/modals/NewAccountModal";
import AccountActions from "@/components/accounts/AccountActions";
import { useLanguage } from "../hooks/useLanguage";
import { useCurrency } from "../hooks/useCurrency";

const accountsData = {
  actif: [
    // Classe 2 - Immobilisations
    {
      code: "201000",
      name: "Frais d'établissement",
      category: "Immobilisations incorporelles",
      type: "Actif",
      balance: 5000.00,
      movements: 2
    },
    {
      code: "213000",
      name: "Constructions",
      category: "Immobilisations corporelles",
      type: "Actif",
      balance: 250000.00,
      movements: 3
    },
    {
      code: "261000",
      name: "Titres de participation",
      category: "Immobilisations financières",
      type: "Actif",
      balance: 75000.00,
      movements: 1
    },
    // Classe 3 - Stocks
    {
      code: "311000",
      name: "Matières premières",
      category: "Stocks",
      type: "Actif",
      balance: 28500.00,
      movements: 12
    },
    // Classe 4 - Tiers
    {
      code: "411000",
      name: "Clients",
      category: "Créances",
      type: "Actif",
      balance: 45420.50,
      movements: 28
    },
    // Classe 5 - Trésorerie
    {
      code: "512000",
      name: "Banque",
      category: "Trésorerie",
      type: "Actif",
      balance: 68750.25,
      movements: 45
    }
  ],
  passif: [
    // Classe 1 - Capitaux
    {
      code: "101000",
      name: "Capital social",
      category: "Capitaux propres",
      type: "Passif",
      balance: 150000.00,
      movements: 2
    },
    {
      code: "164000",
      name: "Emprunts auprès des établissements de crédit",
      category: "Dettes financières",
      type: "Passif",
      balance: 85000.00,
      movements: 12
    },
    // Classe 4 - Tiers
    {
      code: "401000",
      name: "Fournisseurs",
      category: "Dettes",
      type: "Passif",
      balance: 32950.00,
      movements: 25
    },
    {
      code: "421000",
      name: "Personnel - Rémunérations dues",
      category: "Dettes sociales",
      type: "Passif",
      balance: 15800.00,
      movements: 8
    },
    {
      code: "445000",
      name: "État - Taxes sur le chiffre d'affaires",
      category: "Dettes fiscales",
      type: "Passif",
      balance: 8500.00,
      movements: 6
    }
  ],
  charges: [
    // Classe 6 - Charges
    {
      code: "601000",
      name: "Achats de matières premières",
      category: "Charges d'exploitation",
      type: "Charge",
      balance: 45000.00,
      movements: 15
    },
    {
      code: "606300",
      name: "Fournitures d'entretien",
      category: "Charges d'exploitation",
      type: "Charge",
      balance: 3250.00,
      movements: 8
    },
    {
      code: "613000",
      name: "Locations",
      category: "Charges externes",
      type: "Charge",
      balance: 24000.00,
      movements: 12
    },
    {
      code: "641000",
      name: "Rémunérations du personnel",
      category: "Charges de personnel",
      type: "Charge",
      balance: 120000.00,
      movements: 24
    },
    {
      code: "661000",
      name: "Charges d'intérêts",
      category: "Charges financières",
      type: "Charge",
      balance: 4500.00,
      movements: 4
    }
  ],
  produits: [
    // Classe 7 - Produits
    {
      code: "701000",
      name: "Ventes de produits finis",
      category: "Produits d'exploitation",
      type: "Produit",
      balance: 285000.00,
      movements: 45
    },
    {
      code: "706000",
      name: "Prestations de services",
      category: "Produits d'exploitation",
      type: "Produit",
      balance: 165000.00,
      movements: 32
    },
    {
      code: "708000",
      name: "Produits des activités annexes",
      category: "Produits d'exploitation",
      type: "Produit",
      balance: 12500.00,
      movements: 8
    },
    {
      code: "762000",
      name: "Produits des immobilisations financières",
      category: "Produits financiers",
      type: "Produit",
      balance: 3500.00,
      movements: 2
    },
    {
      code: "775000",
      name: "Produits des cessions d'éléments d'actif",
      category: "Produits exceptionnels",
      type: "Produit",
      balance: 25000.00,
      movements: 1
    }
  ]
};

const Accounts = () => {
  const [showNewAccountModal, setShowNewAccountModal] = useState(false);
  const [activeTab, setActiveTab] = useState("tous");
  const { t } = useLanguage();
  const { formatAmount } = useCurrency();

  // Calcul des totaux
  const totalActif = Object.values(accountsData.actif).reduce((sum, account) => sum + account.balance, 0);
  const totalPassif = Object.values(accountsData.passif).reduce((sum, account) => sum + account.balance, 0);
  const totalComptes = Object.values(accountsData).reduce((sum, accounts) => sum + accounts.length, 0);
  const equilibre = totalActif - totalPassif;

  const formatCurrency = (amount: number) => {
    return formatAmount(amount);
  };

  const getBalanceColor = (balance: number) => {
    if (balance > 0) return "text-green-600";
    if (balance < 0) return "text-red-600";
    return "text-gray-600";
  };

  const getBalanceIcon = (balance: number) => {
    if (balance > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (balance < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return null;
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      "Immobilisations incorporelles": "bg-purple-100 text-purple-700",
      "Immobilisations corporelles": "bg-indigo-100 text-indigo-700",
      "Immobilisations financières": "bg-blue-100 text-blue-700",
      "Stocks": "bg-cyan-100 text-cyan-700",
      "Créances": "bg-green-100 text-green-700",
      "Trésorerie": "bg-emerald-100 text-emerald-700",
      "Capitaux propres": "bg-yellow-100 text-yellow-700",
      "Dettes financières": "bg-orange-100 text-orange-700",
      "Dettes": "bg-red-100 text-red-700",
      "Dettes sociales": "bg-pink-100 text-pink-700",
      "Dettes fiscales": "bg-rose-100 text-rose-700",
      "Charges d'exploitation": "bg-slate-100 text-slate-700",
      "Charges externes": "bg-zinc-100 text-zinc-700",
      "Charges de personnel": "bg-neutral-100 text-neutral-700",
      "Charges financières": "bg-stone-100 text-stone-700",
      "Produits d'exploitation": "bg-lime-100 text-lime-700",
      "Produits financiers": "bg-amber-100 text-amber-700",
      "Produits exceptionnels": "bg-teal-100 text-teal-700"
    } as const;
    
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  const handleAccountAction = (action: string, accountCode: string) => {
    console.log(`Action ${action} pour le compte ${accountCode}`);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('chartOfAccounts')}</h1>
            <p className="text-gray-600">{t('accountManagement')}</p>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => setShowNewAccountModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t('newAccount')}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="space-y-1">
                <p className="text-lg font-semibold">{t('totalAccounts')}</p>
                <p className="text-sm text-gray-500">{t('activeInPlan')}</p>
                <p className="text-2xl font-bold text-blue-500">{totalComptes}</p>
                <p className="text-sm text-gray-500">Plan comptable français</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="space-y-1">
                <p className="text-lg font-semibold">Actif total</p>
                <p className="text-sm text-gray-500">Somme des actifs</p>
                <p className="text-2xl font-bold text-green-500">{formatCurrency(totalActif)}</p>
                <p className="text-sm text-green-500">+5.2% ce mois</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="space-y-1">
                <p className="text-lg font-semibold">Passif total</p>
                <p className="text-sm text-gray-500">Somme des passifs</p>
                <p className="text-2xl font-bold text-red-500">{formatCurrency(totalPassif)}</p>
                <p className="text-sm text-red-500">-2.1% ce mois</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="space-y-1">
                <p className="text-lg font-semibold">Équilibre</p>
                <p className="text-sm text-gray-500">Actif - Passif</p>
                <p className="text-2xl font-bold text-blue-500">{formatCurrency(equilibre)}</p>
                <p className="text-sm text-gray-500">Situation nette</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Comptes comptables</h2>
                  <p className="text-sm text-gray-500">Vue d'ensemble du plan comptable</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Rechercher un compte..."
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Exporter
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="tous" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="w-full bg-gray-50/50 p-1">
                    <TabsTrigger
                      value="tous"
                      className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      {t('all')}
                    </TabsTrigger>
                    <TabsTrigger
                      value="actif"
                      className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      {t('assets')}
                    </TabsTrigger>
                    <TabsTrigger
                      value="passif"
                      className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      {t('liabilities')}
                    </TabsTrigger>
                    <TabsTrigger
                      value="produits"
                      className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      {t('revenue')}
                    </TabsTrigger>
                    <TabsTrigger
                      value="charges"
                      className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      {t('expenses')}
                    </TabsTrigger>
                </TabsList>

                <Table className="mt-4">
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[100px]">{t('accountCode')}</TableHead>
                      <TableHead>{t('accountName')}</TableHead>
                      <TableHead>{t('category')}</TableHead>
                      <TableHead>{t('type')}</TableHead>
                      <TableHead>{t('balance')}</TableHead>
                      <TableHead>{t('movements')}</TableHead>
                      <TableHead className="text-right">{t('actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(accountsData).flatMap(([type, accounts]) => {
                      if (activeTab === "tous" || activeTab === type) {
                        return accounts.map((account) => (
                          <TableRow key={account.code} className="hover:bg-gray-50">
                            <TableCell className="font-mono">{account.code}</TableCell>
                            <TableCell>{account.name}</TableCell>
                            <TableCell>
                              <Badge variant="secondary" className={getCategoryBadge(account.category)}>
                                {account.category}
                              </Badge>
                            </TableCell>
                            <TableCell>{account.type}</TableCell>
                            <TableCell className="font-mono">
                              <div className="flex items-center gap-2">
                                {getBalanceIcon(account.balance)}
                                <span className={getBalanceColor(account.balance)}>
                                  {formatCurrency(account.balance)}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>{account.movements}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm">Détails</Button>
                                <Button variant="ghost" size="sm">Modifier</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ));
                      }
                      return [];
                    })}
                  </TableBody>
                </Table>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>

      <NewAccountModal
        open={showNewAccountModal}
        onOpenChange={setShowNewAccountModal}
      />
    </DashboardLayout>
  );
};

export default Accounts;
