
import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import securityService from '../../services/securityService';

interface SecurityValidatorProps {
  companyId?: number;
  journalEntryId?: number;
  children: React.ReactNode;
  onValidationResult?: (isValid: boolean) => void;
}

const SecurityValidator = ({ 
  companyId, 
  journalEntryId, 
  children, 
  onValidationResult 
}: SecurityValidatorProps) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const validateAccess = async () => {
      try {
        let hasAccess = true;

        if (companyId) {
          hasAccess = await securityService.validateCompanyAccess(companyId);
        }

        if (hasAccess && journalEntryId) {
          hasAccess = await securityService.validateJournalEntryAccess(journalEntryId);
        }

        setIsValid(hasAccess);
        setError(hasAccess ? '' : 'Accès non autorisé à cette ressource');
        onValidationResult?.(hasAccess);
      } catch (error) {
        setIsValid(false);
        setError('Erreur lors de la validation des accès');
        onValidationResult?.(false);
      }
    };

    if (companyId || journalEntryId) {
      validateAccess();
    } else {
      setIsValid(true);
      onValidationResult?.(true);
    }
  }, [companyId, journalEntryId, onValidationResult]);

  if (isValid === null) {
    return <div className="flex justify-center p-4">Validation des accès...</div>;
  }

  if (!isValid) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
};

export default SecurityValidator;
