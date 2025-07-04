import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CompanyDTO } from '../types/api';

interface CompanyContextType {
  currentCompany: CompanyDTO | null;
  setCurrentCompany: (company: CompanyDTO | null) => void;
  companies: CompanyDTO[];
  setCompanies: (companies: CompanyDTO[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

interface CompanyProviderProps {
  children: ReactNode;
}

export const CompanyProvider: React.FC<CompanyProviderProps> = ({ children }) => {
  const [currentCompany, setCurrentCompany] = useState<CompanyDTO | null>(null);
  const [companies, setCompanies] = useState<CompanyDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Charger l'entreprise sauvegardée depuis localStorage
    const savedCompanyId = localStorage.getItem('selectedCompanyId');
    if (savedCompanyId) {
      // TODO: Charger l'entreprise depuis l'API
      console.log('Chargement entreprise ID:', savedCompanyId);
    }
    setIsLoading(false);
  }, []);

  const handleSetCurrentCompany = (company: CompanyDTO | null) => {
    setCurrentCompany(company);
    if (company) {
      localStorage.setItem('selectedCompanyId', company.id.toString());
    } else {
      localStorage.removeItem('selectedCompanyId');
    }
  };

  const value: CompanyContextType = {
    currentCompany,
    setCurrentCompany: handleSetCurrentCompany,
    companies,
    setCompanies,
    isLoading,
    setIsLoading,
  };

  return (
    <CompanyContext.Provider value={value}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = (): CompanyContextType => {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
};

export default CompanyContext;