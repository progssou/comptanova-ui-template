import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  Copy, 
  FileText, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  CheckCircle, 
  XCircle,
  History,
  ArrowLeftRight
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import EditJournalEntryModal from "../modals/EditJournalEntryModal";

interface JournalEntry {
  id: string;
  date: string;
  reference: string;
  description: string;
  debitAccount: string;
  debitAmount: number;
  creditAccount: string;
  creditAmount: number;
  status: "brouillon" | "en_attente" | "validé" | "rejeté";
  createdBy?: string;
  createdAt: string;
  lastModifiedAt?: string;
  comments?: string[];
  journal?: string;
}

const journalEntries: JournalEntry[] = [
  // Écritures validées
  {
    id: "JE001",
    date: "2024-03-25",
    reference: "FAC-2024-001",
    description: "Vente de services de conseil",
    debitAccount: "411000",
    debitAmount: 1200.00,
    creditAccount: "706000",
    creditAmount: 1200.00,
    status: "validé",
    createdBy: "Sophie Martin",
    createdAt: "2024-03-25T10:30:00",
    lastModifiedAt: "2024-03-25T14:15:00",
    comments: ["Facture validée par le responsable"],
    journal: "VE"
  },
  {
    id: "JE004",
    date: "2024-03-23",
    reference: "SAL-2024-003",
    description: "Paiement des salaires - Mars 2024",
    debitAccount: "641000",
    debitAmount: 15000.00,
    creditAccount: "421000",
    creditAmount: 15000.00,
    status: "validé",
    createdBy: "Pierre Dubois",
    createdAt: "2024-03-23T09:00:00",
    lastModifiedAt: "2024-03-23T11:30:00",
    journal: "OD"
  },
  // Écritures en brouillon
  {
    id: "JE002",
    date: "2024-03-25",
    reference: "ACHATS-001",
    description: "Achat matériel informatique",
    debitAccount: "606300",
    debitAmount: 850.00,
    creditAccount: "401000",
    creditAmount: 850.00,
    status: "brouillon",
    createdBy: "Jean Dupont",
    createdAt: "2024-03-25T09:45:00",
    journal: "AC"
  },
  {
    id: "JE005",
    date: "2024-03-24",
    reference: "OD-2024-002",
    description: "Provision pour risques",
    debitAccount: "681500",
    debitAmount: 5000.00,
    creditAccount: "151000",
    creditAmount: 5000.00,
    status: "brouillon",
    createdBy: "Marie Bernard",
    createdAt: "2024-03-24T14:20:00",
    journal: "OD"
  },
  // Écritures en attente
  {
    id: "JE003",
    date: "2024-03-24",
    reference: "BANK-001",
    description: "Virement bancaire",
    debitAccount: "512000",
    debitAmount: 2500.00,
    creditAccount: "411000",
    creditAmount: 2500.00,
    status: "en_attente",
    createdBy: "Marie Bernard",
    createdAt: "2024-03-24T16:20:00",
    comments: ["En attente de validation du trésorier"],
    journal: "BQ"
  },
  {
    id: "JE006",
    date: "2024-03-25",
    reference: "FAC-2024-002",
    description: "Facture fournisseur - Maintenance",
    debitAccount: "615000",
    debitAmount: 750.00,
    creditAccount: "401000",
    creditAmount: 750.00,
    status: "en_attente",
    createdBy: "Lucas Martin",
    createdAt: "2024-03-25T11:15:00",
    comments: ["En attente de validation du responsable achats"],
    journal: "AC"
  }
];

const JournalEntryTable = () => {
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [entryToEdit, setEntryToEdit] = useState<JournalEntry | null>(null);

  const getStatusBadge = (status: JournalEntry["status"]) => {
    const variants = {
      "validé": { variant: "default" as const, label: "Validé", icon: <CheckCircle className="h-3 w-3" /> },
      "brouillon": { variant: "secondary" as const, label: "Brouillon", icon: <FileText className="h-3 w-3" /> },
      "en_attente": { variant: "outline" as const, label: "En attente", icon: <History className="h-3 w-3" /> },
      "rejeté": { variant: "destructive" as const, label: "Rejeté", icon: <XCircle className="h-3 w-3" /> }
    };
    
    return (
      <Badge variant={variants[status].variant} className="flex items-center gap-1">
        {variants[status].icon}
        {variants[status].label}
      </Badge>
    );
  };

  const getJournalBadge = (journal: string) => {
    const variants = {
      "AC": { bg: "bg-blue-100 text-blue-800", label: "Achats" },
      "VE": { bg: "bg-green-100 text-green-800", label: "Ventes" },
      "BQ": { bg: "bg-purple-100 text-purple-800", label: "Banque" },
      "OD": { bg: "bg-orange-100 text-orange-800", label: "Opérations diverses" },
      "AN": { bg: "bg-gray-100 text-gray-800", label: "A nouveau" }
    };
    
    return (
      <Badge variant="secondary" className={`${variants[journal]?.bg || "bg-gray-100 text-gray-800"}`}>
        {variants[journal]?.label || journal}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handleAction = (action: string, entry: JournalEntry) => {
    setSelectedEntry(entry.id);
    
    switch (action) {
      case 'edit':
        setEntryToEdit(entry);
        setEditModalOpen(true);
        break;
      
      case 'validate':
        toast({
          title: "Écriture validée",
          description: `L'écriture ${entry.reference} a été validée avec succès.`,
        });
        break;
      
      case 'reject':
        setRejectDialogOpen(true);
        break;
      
      case 'delete':
        setDeleteDialogOpen(true);
        break;
      
      case 'duplicate':
        toast({
          title: "Écriture dupliquée",
          description: `Une copie de l'écriture ${entry.reference} a été créée.`,
        });
        break;
      
      case 'export':
        toast({
          title: "Export en cours",
          description: `Export de l'écriture ${entry.reference} au format PDF.`,
        });
        break;
      
      default:
        break;
    }
  };

  const handleDelete = () => {
    if (selectedEntry) {
      toast({
        title: "Écriture supprimée",
        description: "L'écriture a été supprimée avec succès.",
      });
      setDeleteDialogOpen(false);
      setSelectedEntry(null);
    }
  };

  const handleReject = () => {
    if (selectedEntry) {
      toast({
        title: "Écriture rejetée",
        description: "L'écriture a été rejetée et renvoyée à l'émetteur.",
      });
      setRejectDialogOpen(false);
      setSelectedEntry(null);
    }
  };

  const handleSaveEdit = (updatedEntry: JournalEntry) => {
    // Ici, vous implémenteriez la logique pour sauvegarder les modifications
    // dans votre backend ou state management
    console.log('Écriture mise à jour:', updatedEntry);
    
    toast({
      title: "Écriture modifiée",
      description: `L'écriture ${updatedEntry.reference} a été modifiée avec succès.`,
    });
  };

  const renderTable = (entries: JournalEntry[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Journal</TableHead>
          <TableHead>Référence</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Compte débit</TableHead>
          <TableHead>Montant débit</TableHead>
          <TableHead>Compte crédit</TableHead>
          <TableHead>Montant crédit</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry) => (
          <TableRow key={entry.id} className="hover:bg-gray-50">
            <TableCell>{entry.date}</TableCell>
            <TableCell>{entry.journal && getJournalBadge(entry.journal)}</TableCell>
            <TableCell className="font-medium">{entry.reference}</TableCell>
            <TableCell>{entry.description}</TableCell>
            <TableCell className="font-mono">{entry.debitAccount}</TableCell>
            <TableCell className="font-mono">{formatCurrency(entry.debitAmount)}</TableCell>
            <TableCell className="font-mono">{entry.creditAccount}</TableCell>
            <TableCell className="font-mono">{formatCurrency(entry.creditAmount)}</TableCell>
            <TableCell>{getStatusBadge(entry.status)}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {entry.status === "brouillon" && (
                    <>
                      <DropdownMenuItem onClick={() => handleAction('edit', entry)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction('validate', entry)}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Valider
                      </DropdownMenuItem>
                    </>
                  )}
                  {entry.status === "en_attente" && (
                    <>
                      <DropdownMenuItem onClick={() => handleAction('validate', entry)}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Valider
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction('reject', entry)}>
                        <XCircle className="mr-2 h-4 w-4" />
                        Rejeter
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem onClick={() => handleAction('duplicate', entry)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Dupliquer
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction('export', entry)}>
                    <FileText className="mr-2 h-4 w-4" />
                    Exporter
                  </DropdownMenuItem>
                  {entry.status !== "validé" && (
                    <DropdownMenuItem
                      onClick={() => handleAction('delete', entry)}
                      className="text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Supprimer
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="draft">Brouillons</TabsTrigger>
          <TabsTrigger value="pending">En attente</TabsTrigger>
          <TabsTrigger value="validated">Validées</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          {renderTable(journalEntries)}
        </TabsContent>

        <TabsContent value="draft" className="mt-4">
          {renderTable(journalEntries.filter(entry => entry.status === "brouillon"))}
        </TabsContent>

        <TabsContent value="pending" className="mt-4">
          {renderTable(journalEntries.filter(entry => entry.status === "en_attente"))}
        </TabsContent>

        <TabsContent value="validated" className="mt-4">
          {renderTable(journalEntries.filter(entry => entry.status === "validé"))}
        </TabsContent>
      </Tabs>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer l'écriture</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cette écriture ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rejeter l'écriture</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir rejeter cette écriture ? Elle sera renvoyée à l'émetteur pour correction.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleReject}>
              Rejeter
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {entryToEdit && (
        <EditJournalEntryModal
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          entry={entryToEdit}
          onSave={handleSaveEdit}
        />
      )}
    </>
  );
};

export default JournalEntryTable;
