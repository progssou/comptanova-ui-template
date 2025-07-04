import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import journalService from '../services/journalService';
import securityService from '../services/securityService';
import { JournalEntryDTO } from '../types/api';
import { toast } from '@/components/ui/use-toast';

export const useJournalEntries = (companyId?: number) => {
  return useQuery({
    queryKey: ['journalEntries', companyId],
    queryFn: async () => {
      // Valider l'accès à l'entreprise avant de charger les données
      if (companyId && !(await securityService.validateCompanyAccess(companyId))) {
        throw new Error('Accès non autorisé à cette entreprise');
      }
      
      return companyId 
        ? journalService.getJournalEntriesByCompany(companyId)
        : journalService.getAllJournalEntries();
    },
  });
};

export const useJournalEntry = (id: number) => {
  return useQuery({
    queryKey: ['journalEntry', id],
    queryFn: async () => {
      // Valider l'accès à l'écriture
      if (!(await securityService.validateJournalEntryAccess(id))) {
        throw new Error('Accès non autorisé à cette écriture');
      }
      return journalService.getJournalEntryById(id);
    },
    enabled: !!id,
  });
};

export const useCreateJournalEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ entry, username }: { entry: JournalEntryDTO; username: string }) => {
      // Logger l'action de création - utiliser le companyId passé en paramètre
      await securityService.logSecurityEvent('CREATE_JOURNAL_ENTRY', undefined, {
        amount: entry.amount
      });
      
      return journalService.createJournalEntry(entry, username);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journalEntries'] });
      toast({
        title: "Succès",
        description: "Écriture comptable créée avec succès",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur lors de la création de l'écriture comptable",
        variant: "destructive",
      });
      console.error('Erreur création écriture:', error);
    },
  });
};

export const useUpdateJournalEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, entry }: { id: number; entry: JournalEntryDTO }) => {
      // Valider l'accès avant modification
      if (!(await securityService.validateJournalEntryAccess(id))) {
        throw new Error('Accès non autorisé pour modifier cette écriture');
      }
      
      // Logger l'action de modification
      await securityService.logSecurityEvent('UPDATE_JOURNAL_ENTRY', id, {
        newAmount: entry.amount,
        reference: entry.reference
      });
      
      return journalService.updateJournalEntry(id, entry);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journalEntries'] });
      toast({
        title: "Succès",
        description: "Écriture comptable modifiée avec succès",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur lors de la modification de l'écriture comptable",
        variant: "destructive",
      });
      console.error('Erreur modification écriture:', error);
    },
  });
};

export const useDeleteJournalEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      // Valider l'accès avant suppression
      if (!(await securityService.validateJournalEntryAccess(id))) {
        throw new Error('Accès non autorisé pour supprimer cette écriture');
      }
      
      // Logger l'action de suppression
      await securityService.logSecurityEvent('DELETE_JOURNAL_ENTRY', id);
      
      return journalService.deleteJournalEntry(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journalEntries'] });
      toast({
        title: "Succès",
        description: "Écriture comptable supprimée avec succès",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur lors de la suppression de l'écriture comptable",
        variant: "destructive",
      });
      console.error('Erreur suppression écriture:', error);
    },
  });
};

export const useValidateJournalEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      // Valider l'accès avant validation
      if (!(await securityService.validateJournalEntryAccess(id))) {
        throw new Error('Accès non autorisé pour valider cette écriture');
      }
      
      // Logger l'action de validation
      await securityService.logSecurityEvent('VALIDATE_JOURNAL_ENTRY', id);
      
      return journalService.validateJournalEntry(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journalEntries'] });
      toast({
        title: "Succès",
        description: "Écriture comptable validée avec succès",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur lors de la validation de l'écriture comptable",
        variant: "destructive",
      });
      console.error('Erreur validation écriture:', error);
    },
  });
};

export const usePostJournalEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      // Valider l'accès avant comptabilisation
      if (!(await securityService.validateJournalEntryAccess(id))) {
        throw new Error('Accès non autorisé pour comptabiliser cette écriture');
      }
      
      // Logger l'action de comptabilisation
      await securityService.logSecurityEvent('POST_JOURNAL_ENTRY', id);
      
      return journalService.postJournalEntry(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journalEntries'] });
      toast({
        title: "Succès",
        description: "Écriture comptable comptabilisée avec succès",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur lors de la comptabilisation de l'écriture comptable",
        variant: "destructive",
      });
      console.error('Erreur comptabilisation écriture:', error);
    },
  });
};
