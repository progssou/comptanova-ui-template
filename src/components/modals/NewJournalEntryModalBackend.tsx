
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCreateJournalEntry } from "../../hooks/useJournalEntries";
import { useAccounts } from "../../hooks/useAccounts";
import { AccountDTO, JournalEntryDTO } from "../../types/api";

const formSchema = z.object({
  entryDate: z.date({
    required_error: "La date d'écriture est obligatoire.",
  }),
  reference: z.string().min(1, "La référence est obligatoire."),
  description: z.string().min(5, "La description doit contenir au moins 5 caractères."),
  debitAccountId: z.string().min(1, "Le compte de débit est obligatoire."),
  creditAccountId: z.string().min(1, "Le compte de crédit est obligatoire."),
  amount: z.number({
    required_error: "Le montant est obligatoire.",
  }).positive("Le montant doit être positif."),
});

interface NewJournalEntryModalBackendProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyId?: number;
}

const NewJournalEntryModalBackend = ({ 
  open, 
  onOpenChange, 
  companyId 
}: NewJournalEntryModalBackendProps) => {
  const [errors, setErrors] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entryDate: new Date(),
      reference: "",
      description: "",
      debitAccountId: "",
      creditAccountId: "",
      amount: 0,
    },
  });

  const { data: accounts = [], isLoading: accountsLoading } = useAccounts(companyId);
  const createJournalEntry = useCreateJournalEntry();

  const validateAccountsBalance = () => {
    const newErrors: string[] = [];
    const debitAccountId = form.getValues("debitAccountId");
    const creditAccountId = form.getValues("creditAccountId");

    if (debitAccountId === creditAccountId) {
      newErrors.push("Les comptes de débit et de crédit doivent être différents");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Soumission formulaire:", values);

    if (!validateAccountsBalance()) {
      return;
    }

    try {
      const debitAccount = accounts.find(acc => acc.id.toString() === values.debitAccountId);
      const creditAccount = accounts.find(acc => acc.id.toString() === values.creditAccountId);

      if (!debitAccount || !creditAccount) {
        setErrors(["Comptes non trouvés"]);
        return;
      }

      const journalEntry: JournalEntryDTO = {
        entryDate: format(values.entryDate, 'yyyy-MM-dd'),
        reference: values.reference,
        description: values.description,
        debitAccount: debitAccount,
        creditAccount: creditAccount,
        amount: values.amount,
        status: { id: 1, code: "DRAFT", name: "Brouillon" }, // Statut par défaut
      };

      await createJournalEntry.mutateAsync({
        entry: journalEntry,
        username: "current-user" // À récupérer du contexte d'authentification
      });

      form.reset();
      setErrors([]);
      onOpenChange(false);
    } catch (error) {
      console.error("Erreur lors de la création:", error);
      setErrors(["Erreur lors de la création de l'écriture comptable"]);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nouvelle écriture comptable</DialogTitle>
          <DialogDescription>
            Saisissez les informations de la nouvelle écriture comptable.
          </DialogDescription>
        </DialogHeader>

        {errors.length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <ul className="list-disc list-inside">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="entryDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date d'écriture</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={`w-full pl-3 text-left font-normal ${
                              !field.value && "text-muted-foreground"
                            }`}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy", { locale: fr })
                            ) : (
                              <span>Sélectionner une date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Référence</FormLabel>
                    <FormControl>
                      <Input placeholder="Référence de l'écriture" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Description de l'opération"
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="debitAccountId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compte débit</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={accountsLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un compte" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {accounts.map((account) => (
                          <SelectItem key={account.id} value={account.id.toString()}>
                            {account.accountNumber} - {account.accountName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="creditAccountId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compte crédit</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={accountsLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un compte" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {accounts.map((account) => (
                          <SelectItem key={account.id} value={account.id.toString()}>
                            {account.accountNumber} - {account.accountName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Montant</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  {field.value > 0 && (
                    <p className="text-sm text-muted-foreground">
                      Montant: {formatCurrency(field.value)}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button 
                type="submit" 
                disabled={createJournalEntry.isPending}
              >
                {createJournalEntry.isPending ? "Création..." : "Créer l'écriture"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewJournalEntryModalBackend;
