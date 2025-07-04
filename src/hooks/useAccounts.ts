
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import accountService from '../services/accountService';
import { AccountDTO, AccountTypeEntity } from '../types/api';
import { toast } from '@/components/ui/use-toast';

export const useAccounts = (companyId?: number) => {
  return useQuery({
    queryKey: ['accounts', companyId],
    queryFn: () => companyId 
      ? accountService.getAccountsByCompany(companyId)
      : accountService.getAllAccounts(),
  });
};

export const useAccount = (id: number) => {
  return useQuery({
    queryKey: ['account', id],
    queryFn: () => accountService.getAccountById(id),
    enabled: !!id,
  });
};

export const useAccountTypes = () => {
  return useQuery({
    queryKey: ['accountTypes'],
    queryFn: () => accountService.getAccountTypes(),
  });
};

export const useAccountTypesByCountry = (countryId: number) => {
  return useQuery({
    queryKey: ['accountTypes', 'country', countryId],
    queryFn: () => accountService.getAccountTypesByCountry(countryId),
    enabled: !!countryId,
  });
};

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (account: Partial<AccountDTO>) => accountService.createAccount(account),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      toast({
        title: "Succès",
        description: "Compte créé avec succès",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Erreur lors de la création du compte",
        variant: "destructive",
      });
      console.error('Erreur création compte:', error);
    },
  });
};

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, account }: { id: number; account: Partial<AccountDTO> }) =>
      accountService.updateAccount(id, account),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      toast({
        title: "Succès",
        description: "Compte modifié avec succès",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Erreur lors de la modification du compte",
        variant: "destructive",
      });
      console.error('Erreur modification compte:', error);
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => accountService.deleteAccount(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      toast({
        title: "Succès",
        description: "Compte supprimé avec succès",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression du compte",
        variant: "destructive",
      });
      console.error('Erreur suppression compte:', error);
    },
  });
};
