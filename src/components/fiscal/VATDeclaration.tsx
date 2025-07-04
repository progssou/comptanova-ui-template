import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText, AlertTriangle } from "lucide-react";

interface VATEntry {
  id: string;
  period: string;
  baseHT: number;
  vatRate: number;
  vatAmount: number;
  type: "collected" | "deductible";
  account: string;
  description: string;
}

const VATDeclaration = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("2024-T1");
  
  const vatEntries: VATEntry[] = [
    {
      id: "VAT001",
      period: "2024-T1",
      baseHT: 10000.00,
      vatRate: 20,
      vatAmount: 2000.00,
      type: "collected",
      account: "445711",
      description: "TVA collectée sur ventes"
    },
    {
      id: "VAT002",
      period: "2024-T1",
      baseHT: 5000.00,
      vatRate: 20,
      vatAmount: 1000.00,
      type: "deductible",
      account: "445662",
      description: "TVA déductible sur achats"
    },
    {
      id: "VAT003",
      period: "2024-T1",
      baseHT: 2500.00,
      vatRate: 10,
      vatAmount: 250.00,
      type: "collected",
      account: "445712",
      description: "TVA collectée taux réduit"
    }
  ];

  const calculateTotals = () => {
    const collected = vatEntries
      .filter(entry => entry.type === "collected")
      .reduce((sum, entry) => sum + entry.vatAmount, 0);
    
    const deductible = vatEntries
      .filter(entry => entry.type === "deductible")
      .reduce((sum, entry) => sum + entry.vatAmount, 0);
    
    return {
      collected,
      deductible,
      toPay: collected - deductible
    };
  };

  const totals = calculateTotals();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Déclaration de TVA</h2>
          <p className="text-gray-600">Préparation et suivi des déclarations de TVA</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sélectionner la période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-T1">2024 - Trimestre 1</SelectItem>
              <SelectItem value="2024-T2">2024 - Trimestre 2</SelectItem>
              <SelectItem value="2024-T3">2024 - Trimestre 3</SelectItem>
              <SelectItem value="2024-T4">2024 - Trimestre 4</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>TVA Collectée</CardTitle>
            <CardDescription>Total de la TVA sur les ventes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              €{totals.collected.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>TVA Déductible</CardTitle>
            <CardDescription>Total de la TVA sur les achats</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              €{totals.deductible.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>TVA à Payer</CardTitle>
            <CardDescription>Montant dû pour la période</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              €{totals.toPay.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Détail des opérations</CardTitle>
          <CardDescription>Liste des opérations soumises à TVA</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="collected">TVA Collectée</TabsTrigger>
              <TabsTrigger value="deductible">TVA Déductible</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Compte</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Base HT</TableHead>
                    <TableHead>Taux</TableHead>
                    <TableHead>Montant TVA</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vatEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-mono">{entry.account}</TableCell>
                      <TableCell>{entry.description}</TableCell>
                      <TableCell>€{entry.baseHT.toFixed(2)}</TableCell>
                      <TableCell>{entry.vatRate}%</TableCell>
                      <TableCell>€{entry.vatAmount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={entry.type === "collected" ? "default" : "secondary"}>
                          {entry.type === "collected" ? "Collectée" : "Déductible"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Alert className="flex-1 mr-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Vérifiez que toutes les opérations de la période sont correctement enregistrées avant de valider la déclaration.
          </AlertDescription>
        </Alert>
        <Button className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Générer la déclaration
        </Button>
      </div>
    </div>
  );
};

export default VATDeclaration; 