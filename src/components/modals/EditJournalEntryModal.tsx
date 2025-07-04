import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

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
}

interface EditJournalEntryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entry: JournalEntry | null;
  onSave: (entry: JournalEntry) => void;
}

const EditJournalEntryModal = ({ open, onOpenChange, entry, onSave }: EditJournalEntryModalProps) => {
  const [formData, setFormData] = useState<Partial<JournalEntry>>({
    date: '',
    reference: '',
    description: '',
    debitAccount: '',
    debitAmount: 0,
    creditAccount: '',
    creditAmount: 0
  });

  useEffect(() => {
    if (entry) {
      setFormData({
        date: entry.date,
        reference: entry.reference,
        description: entry.description,
        debitAccount: entry.debitAccount,
        debitAmount: entry.debitAmount,
        creditAccount: entry.creditAccount,
        creditAmount: entry.creditAmount
      });
    }
  }, [entry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entry) return;

    const updatedEntry: JournalEntry = {
      ...entry,
      ...formData,
      lastModifiedAt: new Date().toISOString(),
    };

    onSave(updatedEntry);
    toast({
      title: "Écriture modifiée",
      description: "Les modifications ont été enregistrées avec succès.",
    });
    onOpenChange(false);
  };

  if (!entry) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Modifier l'écriture comptable</DialogTitle>
          <DialogDescription>
            Modifiez les informations de l'écriture {entry.reference}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="reference">Référence</Label>
              <Input
                id="reference"
                placeholder="ex: FAC-2024-001"
                value={formData.reference}
                onChange={(e) => setFormData({...formData, reference: e.target.value})}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Description de l'écriture"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Compte débit</Label>
              <Select 
                value={formData.debitAccount} 
                onValueChange={(value) => setFormData({...formData, debitAccount: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un compte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="411000">411000 - Clients</SelectItem>
                  <SelectItem value="401000">401000 - Fournisseurs</SelectItem>
                  <SelectItem value="512000">512000 - Banque</SelectItem>
                  <SelectItem value="606300">606300 - Fournitures</SelectItem>
                  <SelectItem value="706000">706000 - Prestations</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Montant débit"
                type="number"
                step="0.01"
                value={formData.debitAmount}
                onChange={(e) => setFormData({...formData, debitAmount: Number(e.target.value)})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Compte crédit</Label>
              <Select 
                value={formData.creditAccount}
                onValueChange={(value) => setFormData({...formData, creditAccount: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un compte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="411000">411000 - Clients</SelectItem>
                  <SelectItem value="401000">401000 - Fournisseurs</SelectItem>
                  <SelectItem value="512000">512000 - Banque</SelectItem>
                  <SelectItem value="606300">606300 - Fournitures</SelectItem>
                  <SelectItem value="706000">706000 - Prestations</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Montant crédit"
                type="number"
                step="0.01"
                value={formData.creditAmount}
                onChange={(e) => setFormData({...formData, creditAmount: Number(e.target.value)})}
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              Enregistrer les modifications
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditJournalEntryModal; 