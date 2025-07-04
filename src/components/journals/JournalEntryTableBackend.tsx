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
  History
} from "lucide-react";
import { 
  useJournalEntries, 
  useDeleteJournalEntry, 
  useValidateJournalEntry, 
  usePostJournalEntry 
} from "../../hooks/useJournalEntries";
import { JournalEntryDTO } from "../../types/api";
import EditJournalEntryModalBackend from "../modals/EditJournalEntryModalBackend";
import { useCurrency } from "../../hooks/useCurrency";
import { useLanguage } from "../../hooks/useLanguage";

interface JournalEntryTableBackendProps {
  companyId?: number;
}

const JournalEntryTableBackend = ({ companyId }: JournalEntryTableBackendProps) => {
  const [selectedEntry, setSelectedEntry] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [entryToEdit, setEntryToEdit] = useState<JournalEntryDTO | null>(null);

  const { data: journalEntries = [], isLoading, error } = useJournalEntries(companyId);
  const deleteJournalEntry = useDeleteJournalEntry();
  const validateJournalEntry = useValidateJournalEntry();
  const postJournalEntry = usePostJournalEntry();
  const { t } = useLanguage();

  const getStatusBadge = (status: JournalEntryDTO["status"]) => {
    const statusCode = status.code.toLowerCase();
    const variants = {
      "validated": { variant: "default" as const, label: status.name, icon: <CheckCircle className="h-3 w-3" /> },
      "draft": { variant: "secondary" as const, label: status.name, icon: <FileText className="h-3 w-3" /> },
      "posted": { variant: "outline" as const, label: status.name, icon: <History className="h-3 w-3" /> },
    };
    
    return (
      <Badge variant={variants[statusCode]?.variant || "secondary"} className="flex items-center gap-1">
        {variants[statusCode]?.icon}
        {status.name}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    const { formatAmount } = useCurrency();
    return formatAmount(amount);
  };

  const handleAction = (action: string, entry: JournalEntryDTO) => {
    if (!entry.id) return;
    
    setSelectedEntry(entry.id);
    
    switch (action) {
      case 'edit':
        setEntryToEdit(entry);
        setEditModalOpen(true);
        break;
      
      case 'validate':
        validateJournalEntry.mutate(entry.id);
        break;
      
      case 'post':
        postJournalEntry.mutate(entry.id);
        break;
      
      case 'delete':
        setDeleteDialogOpen(true);
        break;
      
      default:
        break;
    }
  };

  const handleDelete = () => {
    if (selectedEntry) {
      deleteJournalEntry.mutate(selectedEntry);
      setDeleteDialogOpen(false);
      setSelectedEntry(null);
    }
  };

  const handleSaveEdit = (updatedEntry: JournalEntryDTO) => {
    setEditModalOpen(false);
    setEntryToEdit(null);
  };

  const renderTable = (entries: JournalEntryDTO[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('date')}</TableHead>
          <TableHead>{t('reference')}</TableHead>
          <TableHead>{t('description')}</TableHead>
          <TableHead>{t('debitAccount')}</TableHead>
          <TableHead>Montant débit</TableHead>
          <TableHead>{t('creditAccount')}</TableHead>
          <TableHead>Montant crédit</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead className="text-right">{t('actions')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry) => (
          <TableRow key={entry.id} className="hover:bg-gray-50">
            <TableCell>{entry.entryDate}</TableCell>
            <TableCell className="font-medium">{entry.reference}</TableCell>
            <TableCell>{entry.description}</TableCell>
            <TableCell className="font-mono">{entry.debitAccount.accountNumber}</TableCell>
            <TableCell className="font-mono">{formatCurrency(entry.amount)}</TableCell>
            <TableCell className="font-mono">{entry.creditAccount.accountNumber}</TableCell>
            <TableCell className="font-mono">{formatCurrency(entry.amount)}</TableCell>
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
                  {entry.status.code === "DRAFT" && (
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
                  {entry.status.code === "VALIDATED" && (
                    <DropdownMenuItem onClick={() => handleAction('post', entry)}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Comptabiliser
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => handleAction('duplicate', entry)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Dupliquer
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction('export', entry)}>
                    <FileText className="mr-2 h-4 w-4" />
                    Exporter
                  </DropdownMenuItem>
                  {entry.status.code !== "POSTED" && (
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

  if (isLoading) {
    return <div className="flex justify-center p-4">Chargement...</div>;
  }

  if (error) {
    return <div className="text-red-600 p-4">Erreur lors du chargement des écritures comptables</div>;
  }

  return (
    <>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="draft">Brouillons</TabsTrigger>
          <TabsTrigger value="validated">Validées</TabsTrigger>
          <TabsTrigger value="posted">Comptabilisées</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          {renderTable(journalEntries)}
        </TabsContent>

        <TabsContent value="draft" className="mt-4">
          {renderTable(journalEntries.filter(entry => entry.status.code === "DRAFT"))}
        </TabsContent>

        <TabsContent value="validated" className="mt-4">
          {renderTable(journalEntries.filter(entry => entry.status.code === "VALIDATED"))}
        </TabsContent>

        <TabsContent value="posted" className="mt-4">
          {renderTable(journalEntries.filter(entry => entry.status.code === "POSTED"))}
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

      {entryToEdit && (
        <EditJournalEntryModalBackend
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          entry={entryToEdit}
          onSave={handleSaveEdit}
          companyId={companyId}
        />
      )}
    </>
  );
};

export default JournalEntryTableBackend;
