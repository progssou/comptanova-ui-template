import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  History,
  FileText,
  ArrowLeftRight,
  Ban,
  CheckCircle
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface AccountActionsProps {
  accountCode: string;
  accountName: string;
  isActive?: boolean;
  onEdit?: (accountCode: string) => void;
  onDelete?: (accountCode: string) => void;
  onToggleStatus?: (accountCode: string) => void;
}

const AccountActions = ({ 
  accountCode, 
  accountName,
  isActive = true,
  onEdit,
  onDelete,
  onToggleStatus
}: AccountActionsProps) => {
  const handleAction = (action: string) => {
    switch (action) {
      case 'edit':
        onEdit?.(accountCode);
        toast({
          title: "Modification du compte",
          description: `Modification du compte ${accountCode} - ${accountName}`,
        });
        break;

      case 'delete':
        onDelete?.(accountCode);
        toast({
          title: "Suppression du compte",
          description: `Suppression du compte ${accountCode} - ${accountName}`,
        });
        break;

      case 'toggleStatus':
        onToggleStatus?.(accountCode);
        toast({
          title: isActive ? "Désactivation du compte" : "Activation du compte",
          description: `Le compte ${accountCode} a été ${isActive ? 'désactivé' : 'activé'}.`,
        });
        break;

      case 'export':
        toast({
          title: "Export des mouvements",
          description: `Export des mouvements du compte ${accountCode} en cours...`,
        });
        break;

      case 'history':
        toast({
          title: "Historique du compte",
          description: `Consultation de l'historique du compte ${accountCode}`,
        });
        break;

      case 'balance':
        toast({
          title: "Balance du compte",
          description: `Consultation de la balance du compte ${accountCode}`,
        });
        break;

      default:
        break;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        
        <DropdownMenuItem onClick={() => handleAction('edit')}>
          <Pencil className="mr-2 h-4 w-4" />
          Modifier
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleAction('history')}>
          <History className="mr-2 h-4 w-4" />
          Historique
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleAction('balance')}>
          <ArrowLeftRight className="mr-2 h-4 w-4" />
          Balance
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleAction('export')}>
          <FileText className="mr-2 h-4 w-4" />
          Exporter
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => handleAction('toggleStatus')}>
          {isActive ? (
            <>
              <Ban className="mr-2 h-4 w-4" />
              Désactiver
            </>
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Activer
            </>
          )}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleAction('delete')}
          className="text-red-600"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountActions; 