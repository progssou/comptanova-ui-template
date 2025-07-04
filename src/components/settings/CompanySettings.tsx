
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CompanySettings = () => {
  const [companyData, setCompanyData] = useState({
    name: "MonEntreprise SARL",
    address: "123 Rue de la Paix",
    city: "Paris",
    postalCode: "75001",
    siret: "12345678901234",
    vatNumber: "FR12345678901",
    phone: "+33 1 23 45 67 89",
    email: "contact@monentreprise.fr",
    website: "www.monentreprise.fr"
  });

  const handleCompanyUpdate = (field: string, value: string) => {
    setCompanyData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Informations de l'entreprise</CardTitle>
          <CardDescription>
            Ces informations apparaîtront sur vos documents comptables
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Nom de l'entreprise</Label>
              <Input
                id="companyName"
                value={companyData.name}
                onChange={(e) => handleCompanyUpdate('name', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="siret">SIRET</Label>
              <Input
                id="siret"
                value={companyData.siret}
                onChange={(e) => handleCompanyUpdate('siret', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Adresse</Label>
            <Input
              id="address"
              value={companyData.address}
              onChange={(e) => handleCompanyUpdate('address', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">Ville</Label>
              <Input
                id="city"
                value={companyData.city}
                onChange={(e) => handleCompanyUpdate('city', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="postalCode">Code postal</Label>
              <Input
                id="postalCode"
                value={companyData.postalCode}
                onChange={(e) => handleCompanyUpdate('postalCode', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                value={companyData.phone}
                onChange={(e) => handleCompanyUpdate('phone', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={companyData.email}
                onChange={(e) => handleCompanyUpdate('email', e.target.value)}
              />
            </div>
          </div>

          <Button>Sauvegarder les modifications</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Préférences comptables</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fiscalYear">Exercice fiscal</Label>
              <Select defaultValue="calendar">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="calendar">Année civile (Jan - Déc)</SelectItem>
                  <SelectItem value="april">Avril - Mars</SelectItem>
                  <SelectItem value="july">Juillet - Juin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="currency">Devise principale</Label>
              <Select defaultValue="eur">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eur">Euro (EUR)</SelectItem>
                  <SelectItem value="usd">Dollar US (USD)</SelectItem>
                  <SelectItem value="gbp">Livre Sterling (GBP)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanySettings;
