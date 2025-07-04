
import ApiService from './api';

class SecurityService {
  private api = ApiService.getInstance();

  // Valider que l'utilisateur a accès à l'entreprise
  async validateCompanyAccess(companyId: number): Promise<boolean> {
    try {
      const response = await this.api.get<{hasAccess: boolean}>(`/companies/${companyId}/validate-access`);
      return response.hasAccess;
    } catch (error) {
      console.error('Erreur validation accès entreprise:', error);
      return false;
    }
  }

  // Valider que l'utilisateur peut modifier l'écriture
  async validateJournalEntryAccess(entryId: number): Promise<boolean> {
    try {
      const response = await this.api.get<{canModify: boolean}>(`/journals/${entryId}/validate-access`);
      return response.canModify;
    } catch (error) {
      console.error('Erreur validation accès écriture:', error);
      return false;
    }
  }

  // Logger les actions sensibles
  async logSecurityEvent(action: string, resourceId?: number, details?: any): Promise<void> {
    try {
      await this.api.post('/security/audit-log', {
        action,
        resourceId,
        details,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Erreur logging sécurité:', error);
    }
  }
}

export default new SecurityService();
