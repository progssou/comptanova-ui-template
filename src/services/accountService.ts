
import ApiService from './api';
import { AccountDTO, AccountTypeEntity } from '../types/api';

class AccountService {
  private api = ApiService.getInstance();

  async getAllAccounts(): Promise<AccountDTO[]> {
    return this.api.get<AccountDTO[]>('/accounts');
  }

  async getAccountsByCompany(companyId: number): Promise<AccountDTO[]> {
    return this.api.get<AccountDTO[]>(`/accounts/company/${companyId}`);
  }

  async getAccountById(id: number): Promise<AccountDTO> {
    return this.api.get<AccountDTO>(`/accounts/${id}`);
  }

  async createAccount(account: Partial<AccountDTO>): Promise<AccountDTO> {
    return this.api.post<AccountDTO>('/accounts', account);
  }

  async updateAccount(id: number, account: Partial<AccountDTO>): Promise<AccountDTO> {
    return this.api.put<AccountDTO>(`/accounts/${id}`, account);
  }

  async deleteAccount(id: number): Promise<void> {
    return this.api.delete<void>(`/accounts/${id}`);
  }

  async getAccountTypes(): Promise<AccountTypeEntity[]> {
    return this.api.get<AccountTypeEntity[]>('/account-types');
  }

  async getAccountTypesByCountry(countryId: number): Promise<AccountTypeEntity[]> {
    return this.api.get<AccountTypeEntity[]>(`/account-types/country/${countryId}`);
  }
}

export default new AccountService();
