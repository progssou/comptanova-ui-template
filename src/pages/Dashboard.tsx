
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  Users, 
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  AlertCircle
} from "lucide-react";

const kpiCards = [
  {
    title: "Chiffre d'affaires",
    value: "€24,500",
    change: "+12.5%",
    trend: "up",
    period: "Ce mois",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Dépenses",
    value: "€8,200",
    change: "-3.2%",
    trend: "down",
    period: "Ce mois", 
    icon: CreditCard,
    color: "text-red-600",
  },
  {
    title: "Trésorerie",
    value: "€45,800",
    change: "+8.1%",
    trend: "up",
    period: "Actuelle",
    icon: TrendingUp,
    color: "text-blue-600",
  },
  {
    title: "Factures en attente",
    value: "12",
    change: "+2",
    trend: "up",
    period: "Cette semaine",
    icon: FileText,
    color: "text-orange-600",
  },
];

const recentTransactions = [
  {
    id: 1,
    description: "Vente - Commande #1234",
    amount: "+€1,250.00",
    date: "Aujourd'hui",
    type: "income",
    status: "Confirmé",
  },
  {
    id: 2,
    description: "Fournitures bureau",
    amount: "-€85.50",
    date: "Hier",
    type: "expense",
    status: "Payé",
  },
  {
    id: 3,
    description: "Abonnement logiciel",
    amount: "-€29.99",
    date: "2 jours",
    type: "expense",
    status: "Payé",
  },
  {
    id: 4,
    description: "Vente - Commande #1233",
    amount: "+€2,100.00",
    date: "3 jours",
    type: "income",
    status: "En attente",
  },
];

const alerts = [
  {
    id: 1,
    type: "warning",
    title: "Facture en retard",
    description: "La facture #INV-001 est en retard de 5 jours",
    action: "Relancer",
  },
  {
    id: 2,
    type: "info",
    title: "Déclaration TVA",
    description: "Déclaration TVA due dans 7 jours",
    action: "Préparer",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600">Vue d'ensemble de votre activité</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Ce mois
          </Button>
          <Button size="sm">
            Nouvelle facture
          </Button>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <Card key={alert.id} className="border-l-4 border-l-orange-400 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    <div>
                      <h3 className="font-medium text-orange-900">{alert.title}</h3>
                      <p className="text-sm text-orange-700">{alert.description}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-orange-700 border-orange-300">
                    {alert.action}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {kpi.title}
                </CardTitle>
                <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {kpi.value}
                  </div>
                  <p className="text-xs text-gray-500">{kpi.period}</p>
                </div>
                <div className="flex items-center gap-1">
                  {kpi.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${
                    kpi.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}>
                    {kpi.change}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Transactions récentes</CardTitle>
                <CardDescription>Vos dernières opérations financières</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                Voir tout
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500">{transaction.date}</span>
                      <Badge 
                        variant={transaction.status === "Confirmé" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`font-bold ${
                      transaction.type === "income" ? "text-green-600" : "text-red-600"
                    }`}>
                      {transaction.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
            <CardDescription>Tâches fréquentes à portée de main</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-20 flex flex-col gap-2" variant="outline">
                <FileText className="h-6 w-6" />
                <span className="text-sm">Nouvelle facture</span>
              </Button>
              <Button className="h-20 flex flex-col gap-2" variant="outline">
                <CreditCard className="h-6 w-6" />
                <span className="text-sm">Saisie dépense</span>
              </Button>
              <Button className="h-20 flex flex-col gap-2" variant="outline">
                <Users className="h-6 w-6" />
                <span className="text-sm">Ajouter client</span>
              </Button>
              <Button className="h-20 flex flex-col gap-2" variant="outline">
                <TrendingUp className="h-6 w-6" />
                <span className="text-sm">Voir rapports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Cards */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Objectifs du mois</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Chiffre d'affaires</span>
                  <span>82% (€24,500 / €30,000)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "82%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Nouvelles factures</span>
                  <span>60% (12 / 20)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "60%" }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Prochaines échéances</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Déclaration TVA</span>
                <Badge variant="outline">7 jours</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Facture #INV-002</span>
                <Badge variant="outline">12 jours</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Charges sociales</span>
                <Badge variant="outline">15 jours</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Assistant IA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Votre assistant peut vous aider avec :
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Catégorisation automatique
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Prévisions de trésorerie  
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Conseils fiscaux
                </li>
              </ul>
              <Button size="sm" className="w-full mt-3">
                Poser une question
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
