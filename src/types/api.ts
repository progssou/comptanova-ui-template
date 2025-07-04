
// Types API basés sur le backend Spring Boot
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface JournalEntryDTO {
  id?: number;
  entryDate: string;
  description: string;
  reference: string;
  debitAccount: AccountDTO;
  creditAccount: AccountDTO;
  amount: number;
  status: EntryStatusEntity;
  createdAt?: string;
  createdByUsername?: string;
}

export interface AccountDTO {
  id: number;
  accountNumber: string;
  accountName: string;
  accountType: AccountTypeEntity;
  balance: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  movements?: number;
}

export interface AccountTypeEntity {
  id: number;
  code: string;
  name: string;
  category: string;
  nature: string;
  country?: CountryEntity;
  createdAt?: string;
  updatedAt?: string;
}

export interface EntryStatusEntity {
  id: number;
  code: string;
  name: string;
  description?: string;
}

export interface RoleEntity {
  id: number;
  code: string;
  name: string;
  description?: string;
}

export interface CountryEntity {
  id: number;
  code: string;
  name: string;
  currency?: string;
  accountingSystem?: string;
}

export interface UserDTO {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: RoleEntity;
  active: boolean;
  companyId: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CompanyDTO {
  id: number;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: CountryEntity;
  siret?: string;
  matriculeFiscal?: string;
  accountingType: AccountingTypeEntity;
  industry: string;
  createdAt?: string;
}

export interface AccountingTypeEntity {
  id: number;
  code: string;
  displayName: string;
  currency: string;
  chartOfAccounts: string;
}
