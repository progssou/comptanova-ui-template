
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface NewAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accountingSystem?: "PCG_FRANCE" | "SYSCOA_TUNISIA";
}

const NewAccountModal = ({ open, onOpenChange, accountingSystem = "PCG_FRANCE" }: NewAccountModalProps) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    category: '',
    type: '',
    isVatAccount: false,
    vatRate: '',
    isAnalytic: false,
    parentAccount: '',
    description: ''
  });

  const getAccountCategories = () => {
    if (accountingSystem === "SYSCOA_TUNISIA") {
      return [
        { value: "immobilisations", label: "Classe 2 - Immobilisations" },
        { value: "stocks", label: "Classe 3 - Stocks" },
        { value: "tiers", label: "Classe 4 - Comptes de tiers" },
        { value: "tresorerie", label: "Classe 5 - Comptes financiers" },
        { value: "charges", label: "Classe 6 - Charges" },
        { value: "produits", label: "Classe 7 - Produits" },
        { value: "resultats", label: "Classe 8 - Comptes de résultats" },
        { value: "hors_bilan", label: "Classe 9 - Comptes hors bilan" }
      ];
    } else {
      return [
        { value: "immobilisations", label: "Classe 2 - Immobilisations" },
        { value: "stocks", label: "Classe 3 - Stocks et en-cours" },
        { value: "clients", label: "Classe 4 - Clients et comptes rattachés" },
        { value: "fournisseurs", label: "Classe 4 - Fournisseurs" },
        { value: "tresorerie", label: "Classe 5 - Comptes financiers" },
        { value: "charges", label: "Classe 6 - Charges" },
        { value: "produits", label: "Classe 7 - Produits" },
        { value: "capitaux", label: "Classe 1 - Capitaux propres" },
        { value: "provisions", label: "Classe 1 - Provisions" },
        { value: "tva", label: "TVA" }
      ];
    }
  };

  const getVatRates = () => {
    if (accountingSystem === "SYSCOA_TUNISIA") {
      return [
        { value: "19", label: "19%" },
        { value: "13", label: "13%" },
        { value: "7", label: "7%" },
        { value: "0", label: "0%" }
      ];
    } else {
      return [
        { value: "20", label: "20%" },
        { value: "10", label: "10%" },
        { value: "5.5", label: "5.5%" },
        { value: "2.1", label: "2.1%" }
      ];
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nouveau compte:', { ...formData, accountingSystem });
    onOpenChange(false);
    setFormData({
      code: '',
      name: '',
      category: '',
      type: '',
      isVatAccount: false,
      vatRate: '',
      isAnalytic: false,
      parentAccount: '',
      description: ''
    });
  };

  const accountCategories = getAccountCategories();
  const vatRates = getVatRates();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nouveau compte</DialogTitle>
          <DialogDescription>
            Créez un nouveau compte dans le plan comptable {accountingSystem === "SYSCOA_TUNISIA" ? "tunisien (SCE)" : "français (PCG)"}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="code">Code</Label>
              <Input
                id="code"
                placeholder={accountingSystem === "SYSCOA_TUNISIA" ? "ex: 4011000" : "ex: 445660"}
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="name">Libellé</Label>
              <Input
                id="name"
                placeholder="Nom du compte"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Catégorie</Label>
              <Select onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  {accountCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Type</Label>
              <Select onValueChange={(value) => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="actif">Actif</SelectItem>
                  <SelectItem value="passif">Passif</SelectItem>
                  <SelectItem value="charge">Charge</SelectItem>
                  <SelectItem value="produit">Produit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Compte de TVA</Label>
                <p className="text-sm text-gray-500">Ce compte est-il lié à la TVA?</p>
              </div>
              <Switch
                checked={formData.isVatAccount}
                onCheckedChange={(checked) => setFormData({...formData, isVatAccount: checked})}
              />
            </div>

            {formData.isVatAccount && (
              <div>
                <Label>Taux de TVA</Label>
                <Select onValueChange={(value) => setFormData({...formData, vatRate: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le taux" />
                  </SelectTrigger>
                  <SelectContent>
                    {vatRates.map((rate) => (
                      <SelectItem key={rate.value} value={rate.value}>
                        {rate.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Compte analytique</Label>
                <p className="text-sm text-gray-500">Activer le suivi analytique</p>
              </div>
              <Switch
                checked={formData.isAnalytic}
                onCheckedChange={(checked) => setFormData({...formData, isAnalytic: checked})}
              />
            </div>

            <div>
              <Label>Compte parent</Label>
              <Input
                placeholder="Code du compte parent (optionnel)"
                value={formData.parentAccount}
                onChange={(e) => setFormData({...formData, parentAccount: e.target.value})}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                placeholder="Description du compte (optionnel)"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              Créer le compte
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewAccountModal;
