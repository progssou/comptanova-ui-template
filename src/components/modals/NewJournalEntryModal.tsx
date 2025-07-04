
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewJournalEntryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewJournalEntryModal = ({ open, onOpenChange }: NewJournalEntryModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    reference: '',
    description: '',
    debitAccount: '',
    debitAmount: '',
    creditAccount: '',
    creditAmount: ''
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Validation des règles comptables
  const validateForm = (): string[] => {
    const validationErrors: string[] = [];

    // Vérification des montants
    const debitAmount = parseFloat(formData.debitAmount || '0');
    const creditAmount = parseFloat(formData.creditAmount || '0');

    if (debitAmount <= 0 || creditAmount <= 0) {
      validationErrors.push("Les montants débit et crédit doivent être supérieurs à 0");
    }

    if (Math.abs(debitAmount - creditAmount) > 0.01) {
      validationErrors.push("L'équilibre comptable n'est pas respecté : Débit ≠ Crédit");
    }

    if (formData.debitAccount === formData.creditAccount) {
      validationErrors.push("Le compte débit et crédit ne peuvent pas être identiques");
    }

    if (!formData.reference.trim()) {
      validationErrors.push("La référence est obligatoire");
    }

    if (!formData.description.trim()) {
      validationErrors.push("La description est obligatoire");
    }

    // Validation date (pas dans le futur)
    const entryDate = new Date(formData.date);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    if (entryDate > today) {
      validationErrors.push("La date d'écriture ne peut pas être dans le futur");
    }

    return validationErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (validationErrors.length > 0) {
      setIsLoading(false);
      return;
    }

    try {
      // Simulation API call - remplacer par vraie API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Écriture créée avec succès",
        description: `Référence: ${formData.reference}`,
      });

      onOpenChange(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer l'écriture comptable",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      reference: '',
      description: '',
      debitAccount: '',
      debitAmount: '',
      creditAccount: '',
      creditAmount: ''
    });
    setErrors([]);
  };

  // Calcul automatique de l'équilibre
  const debitAmount = parseFloat(formData.debitAmount || '0');
  const creditAmount = parseFloat(formData.creditAmount || '0');
  const isBalanced = Math.abs(debitAmount - creditAmount) < 0.01 && debitAmount > 0;

  const handleDebitAmountChange = (value: string) => {
    setFormData({...formData, debitAmount: value, creditAmount: value});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nouvelle écriture comptable</DialogTitle>
          <DialogDescription>
            Saisissez les informations pour créer une nouvelle écriture
          </DialogDescription>
        </DialogHeader>
        
        {/* Alertes de validation */}
        {errors.length > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <ul className="list-disc list-inside space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Indicateur d'équilibre */}
        {debitAmount > 0 && creditAmount > 0 && (
          <Alert variant={isBalanced ? "default" : "destructive"}>
            {isBalanced ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
            <AlertDescription>
              {isBalanced 
                ? `✓ Équilibre respecté: ${debitAmount.toFixed(2)} €` 
                : `⚠ Déséquilibre: Débit ${debitAmount.toFixed(2)} € ≠ Crédit ${creditAmount.toFixed(2)} €`
              }
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date*</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                max={new Date().toISOString().split('T')[0]}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="reference">Référence*</Label>
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
            <Label htmlFor="description">Description*</Label>
            <Textarea
              id="description"
              placeholder="Description de l'écriture comptable"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Compte débit*</Label>
              <Select 
                value={formData.debitAccount}
                onValueChange={(value) => setFormData({...formData, debitAccount: value})}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un compte" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectItem value="411000">411000 - Clients</SelectItem>
                  <SelectItem value="401000">401000 - Fournisseurs</SelectItem>
                  <SelectItem value="512000">512000 - Banque</SelectItem>
                  <SelectItem value="606300">606300 - Fournitures</SelectItem>
                  <SelectItem value="706000">706000 - Prestations</SelectItem>
                  <SelectItem value="627000">627000 - Services bancaires</SelectItem>
                  <SelectItem value="445710">445710 - TVA collectée</SelectItem>
                  <SelectItem value="445660">445660 - TVA déductible</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Montant débit*"
                type="number"
                step="0.01"
                min="0.01"
                value={formData.debitAmount}
                onChange={(e) => handleDebitAmountChange(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Compte crédit*</Label>
              <Select 
                value={formData.creditAccount}
                onValueChange={(value) => setFormData({...formData, creditAccount: value})}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un compte" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectItem value="411000">411000 - Clients</SelectItem>
                  <SelectItem value="401000">401000 - Fournisseurs</SelectItem>
                  <SelectItem value="512000">512000 - Banque</SelectItem>
                  <SelectItem value="606300">606300 - Fournitures</SelectItem>
                  <SelectItem value="706000">706000 - Prestations</SelectItem>
                  <SelectItem value="627000">627000 - Services bancaires</SelectItem>
                  <SelectItem value="445710">445710 - TVA collectée</SelectItem>
                  <SelectItem value="445660">445660 - TVA déductible</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Montant crédit*"
                type="number"
                step="0.01"
                min="0.01"
                value={formData.creditAmount}
                onChange={(e) => setFormData({...formData, creditAmount: e.target.value})}
                required
                disabled
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={!isBalanced || isLoading || errors.length > 0}
            >
              {isLoading ? "Création..." : "Créer l'écriture"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewJournalEntryModal;
