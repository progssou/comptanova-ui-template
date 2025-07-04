import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
import { CalendarIcon, Plus, Trash2, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useAccounts } from "../../hooks/useAccounts";
import { useCurrency } from "../../hooks/useCurrency";
import { useLanguage } from "../../hooks/useLanguage";
import { AccountDTO } from "../../types/api";

const entryLineSchema = z.object({
  accountId: z.string().min(1, "Le compte est obligatoire"),
  debitAmount: z.number().min(0, "Le montant débit doit être positif").optional(),
  creditAmount: z.number().min(0, "Le montant crédit doit être positif").optional(),
});

const formSchema = z.object({
  entryDate: z.date({
    required_error: "La date d'écriture est obligatoire.",
  }),
  reference: z.string().min(1, "La référence est obligatoire."),
  description: z.string().min(5, "La description doit contenir au moins 5 caractères."),
  entries: z.array(entryLineSchema).min(2, "Au moins 2 lignes d'écriture sont requises"),
}).refine((data) => {
  // Validation de l'équilibre débit/crédit
  const totalDebit = data.entries.reduce((sum, entry) => sum + (entry.debitAmount || 0), 0);
  const totalCredit = data.entries.reduce((sum, entry) => sum + (entry.creditAmount || 0), 0);
  return Math.abs(totalDebit - totalCredit) < 0.01;
}, {
  message: "Le total des débits doit être égal au total des crédits",
  path: ["entries"]
});

interface MultiLineJournalEntryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyId?: number;
  onSave?: (data: any) => void;
}

const MultiLineJournalEntryModal = ({ 
  open, 
  onOpenChange, 
  companyId,
  onSave 
}: MultiLineJournalEntryModalProps) => {
  const [errors, setErrors] = useState<string[]>([]);
  const { t } = useLanguage();
  const { formatAmount } = useCurrency();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entryDate: new Date(),
      reference: "",
      description: "",
      entries: [
        { accountId: "", debitAmount: 0, creditAmount: 0 },
        { accountId: "", debitAmount: 0, creditAmount: 0 }
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "entries"
  });

  const { data: accounts = [], isLoading: accountsLoading } = useAccounts(companyId);

  const watchedEntries = form.watch("entries");
  
  // Calcul des totaux en temps réel
  const totalDebit = watchedEntries.reduce((sum, entry) => sum + (entry.debitAmount || 0), 0);
  const totalCredit = watchedEntries.reduce((sum, entry) => sum + (entry.creditAmount || 0), 0);
  const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Écriture multi-lignes:", values);
    
    if (!isBalanced) {
      setErrors(["L'écriture n'est pas équilibrée"]);
      return;
    }

    try {
      // Traitement de l'écriture multi-lignes
      if (onSave) {
        onSave(values);
      }
      
      form.reset();
      setErrors([]);
      onOpenChange(false);
    } catch (error) {
      console.error("Erreur lors de la création:", error);
      setErrors(["Erreur lors de la création de l'écriture comptable"]);
    }
  };

  const addLine = () => {
    append({ accountId: "", debitAmount: 0, creditAmount: 0 });
  };

  const removeLine = (index: number) => {
    if (fields.length > 2) {
      remove(index);
    }
  };

  const getAccountById = (id: string): AccountDTO | undefined => {
    return accounts.find(acc => acc.id.toString() === id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Écriture comptable multi-lignes</DialogTitle>
          <DialogDescription>
            Saisissez une écriture avec plusieurs comptes débités et/ou crédités.
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
                    <FormLabel>{t('date')}</FormLabel>
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
                    <FormLabel>{t('reference')}</FormLabel>
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
                  <FormLabel>{t('description')}</FormLabel>
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

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Lignes d'écriture</h3>
                <div className="flex items-center gap-4">
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span>Total Débit:</span>
                      <Badge variant={isBalanced ? "default" : "destructive"}>
                        {formatAmount(totalDebit)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Total Crédit:</span>
                      <Badge variant={isBalanced ? "default" : "destructive"}>
                        {formatAmount(totalCredit)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Équilibre:</span>
                      <Badge variant={isBalanced ? "default" : "destructive"}>
                        {isBalanced ? "✓" : "✗"}
                      </Badge>
                    </div>
                  </div>
                  <Button type="button" size="sm" onClick={addLine}>
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter ligne
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name={`entries.${index}.accountId`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Compte</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              disabled={accountsLoading}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner" />
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

                    <div className="w-32">
                      <FormField
                        control={form.control}
                        name={`entries.${index}.debitAmount`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Débit</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.001"
                                min="0"
                                placeholder="0.000"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="w-32">
                      <FormField
                        control={form.control}
                        name={`entries.${index}.creditAmount`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Crédit</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.001"
                                min="0"
                                placeholder="0.000"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="w-10">
                      {fields.length > 2 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeLine(index)}
                          className="mt-6"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                {t('cancel')}
              </Button>
              <Button 
                type="submit" 
                disabled={!isBalanced}
              >
                {t('save')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MultiLineJournalEntryModal;