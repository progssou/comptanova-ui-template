import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, ArrowLeftRight, Download, Upload } from "lucide-react";

interface BankTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  reference?: string;
  isMatched: boolean;
  matchedEntry?: string;
}

interface AccountEntry {
  id: string;
  date: string;
  description: string;
  amount: number;
  reference: string;
  isMatched: boolean;
  matchedTransaction?: string;
}

const BankReconciliation = () => {
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);

  const bankTransactions: BankTransaction[] = [
    {
      id: "BT001",
      date: "2024-03-15",
      description: "Paiement client ABC",
      amount: 1200.00,
      reference: "VIR-2024-001",
      isMatched: false
    },
    {
      id: "BT002",
      date: "2024-03-14",
      description: "Virement fournisseur XYZ",
      amount: -850.00,
      reference: "VIR-2024-002",
      isMatched: true,
      matchedEntry: "JE002"
    }
  ];

  const accountEntries: AccountEntry[] = [
    {
      id: "JE001",
      date: "2024-03-15",
      description: "Facture client ABC",
      amount: 1200.00,
      reference: "FAC-2024-001",
      isMatched: false
    },
    {
      id: "JE002",
      date: "2024-03-14",
      description: "Facture fournisseur XYZ",
      amount: -850.00,
      reference: "FCF-2024-001",
      isMatched: true,
      matchedTransaction: "BT002"
    }
  ];

  const handleTransactionSelect = (transactionId: string) => {
    setSelectedTransactions(prev => {
      if (prev.includes(transactionId)) {
        return prev.filter(id => id !== transactionId);
      }
      return [...prev, transactionId];
    });
  };

  const handleEntrySelect = (entryId: string) => {
    setSelectedEntries(prev => {
      if (prev.includes(entryId)) {
        return prev.filter(id => id !== entryId);
      }
      return [...prev, entryId];
    });
  };

  const handleMatch = () => {
    // Implement matching logic here
    console.log("Matching:", { selectedTransactions, selectedEntries });
  };

  const handleUnmatch = () => {
    // Implement unmatching logic here
    console.log("Unmatching:", { selectedTransactions, selectedEntries });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Rapprochement bancaire</h2>
          <p className="text-gray-600">Lettrage des opérations bancaires</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Importer relevé
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Select value={selectedAccount} onValueChange={setSelectedAccount}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un compte bancaire" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="512001">512001 - Banque principale</SelectItem>
              <SelectItem value="512002">512002 - Compte secondaire</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-03">Mars 2024</SelectItem>
              <SelectItem value="2024-02">Février 2024</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Input placeholder="Rechercher..." />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Relevé bancaire</CardTitle>
            <CardDescription>Opérations du relevé bancaire</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bankTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedTransactions.includes(transaction.id)}
                        onCheckedChange={() => handleTransactionSelect(transaction.id)}
                        disabled={transaction.isMatched}
                      />
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className={transaction.amount >= 0 ? "text-green-600" : "text-red-600"}>
                      €{Math.abs(transaction.amount).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={transaction.isMatched ? "default" : "outline"}>
                        {transaction.isMatched ? "Lettré" : "Non lettré"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Écritures comptables</CardTitle>
            <CardDescription>Écritures à lettrer</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accountEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedEntries.includes(entry.id)}
                        onCheckedChange={() => handleEntrySelect(entry.id)}
                        disabled={entry.isMatched}
                      />
                    </TableCell>
                    <TableCell>{entry.date}</TableCell>
                    <TableCell>{entry.description}</TableCell>
                    <TableCell className={entry.amount >= 0 ? "text-green-600" : "text-red-600"}>
                      €{Math.abs(entry.amount).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={entry.isMatched ? "default" : "outline"}>
                        {entry.isMatched ? "Lettré" : "Non lettré"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <Alert className="flex-1 mr-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Sélectionnez les opérations correspondantes dans chaque colonne pour effectuer le lettrage.
          </AlertDescription>
        </Alert>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleUnmatch}
            disabled={selectedTransactions.length === 0 && selectedEntries.length === 0}
          >
            Délettrer
          </Button>
          <Button
            onClick={handleMatch}
            className="flex items-center gap-2"
            disabled={selectedTransactions.length === 0 || selectedEntries.length === 0}
          >
            <ArrowLeftRight className="h-4 w-4" />
            Lettrer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BankReconciliation; 