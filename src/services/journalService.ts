
import ApiService from './api';
import { JournalEntryDTO } from '../types/api';

class JournalService {
  private api = ApiService.getInstance();

  async getAllJournalEntries(): Promise<JournalEntryDTO[]> {
    return this.api.get<JournalEntryDTO[]>('/journals');
  }

  async getJournalEntriesByCompany(companyId: number): Promise<JournalEntryDTO[]> {
    return this.api.get<JournalEntryDTO[]>(`/journals/company/${companyId}`);
  }

  async getJournalEntryById(id: number): Promise<JournalEntryDTO> {
    return this.api.get<JournalEntryDTO>(`/journals/${id}`);
  }

  async createJournalEntry(entry: JournalEntryDTO, username: string): Promise<JournalEntryDTO> {
    return this.api.post<JournalEntryDTO>(`/journals?username=${username}`, entry);
  }

  async updateJournalEntry(id: number, entry: JournalEntryDTO): Promise<JournalEntryDTO> {
    return this.api.put<JournalEntryDTO>(`/journals/${id}`, entry);
  }

  async deleteJournalEntry(id: number): Promise<void> {
    return this.api.delete<void>(`/journals/${id}`);
  }

  async validateJournalEntry(id: number): Promise<JournalEntryDTO> {
    return this.api.put<JournalEntryDTO>(`/journals/${id}/validate`);
  }

  async postJournalEntry(id: number): Promise<JournalEntryDTO> {
    return this.api.put<JournalEntryDTO>(`/journals/${id}/post`);
  }

  async getJournalEntriesByDateRange(startDate: string, endDate: string): Promise<JournalEntryDTO[]> {
    return this.api.get<JournalEntryDTO[]>(`/journals/date-range?startDate=${startDate}&endDate=${endDate}`);
  }
}

export default new JournalService();
