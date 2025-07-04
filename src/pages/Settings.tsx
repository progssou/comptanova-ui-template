
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  CreditCard, 
  Bell, 
  Shield, 
  Bot, 
  Globe, 
  Moon, 
  Sun,
  Save,
  Upload,
  AlertCircle
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Settings() {
  const [companyData, setCompanyData] = useState({
    name: "Mon Entreprise SARL",
    type: "SARL",
    address: "123 Rue de la Paix",
    city: "Paris",
    postalCode: "75001",
    country: "France",
    siret: "12345678901234",
    vatNumber: "FR12345678901",
    currency: "EUR",
    fiscalYear: "Janvier - Décembre",
  });

  const [billingData, setBillingData] = useState({
    plan: "Pro",
    nextBilling: "15 Août 2024",
    amount: "29.00",
    paymentMethod: "**** 1234",
  });

  const [preferences, setPreferences] = useState({
    aiAssistant: true,
    emailNotifications: true,
    marketingEmails: false,
    darkMode: false,
    language: "fr",
    autoBackup: true,
    twoFactor: false,
  });

  const handleSave = (section: string) => {
    console.log(`Saving ${section}...`);
    // Here you would normally save to your backend
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600">Gérez les paramètres de votre compte et entreprise</p>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="company">Entreprise</TabsTrigger>
          <TabsTrigger value="billing">Facturation</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>

        {/* Company Settings */}
        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                <CardTitle>Informations entreprise</CardTitle>
              </div>
              <CardDescription>
                Gérez les informations de base de votre entreprise
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Nom de l'entreprise</Label>
                  <Input
                    id="companyName"
                    value={companyData.name}
                    onChange={(e) => setCompanyData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="companyType">Forme juridique</Label>
                  <Select value={companyData.type} onValueChange={(value) => setCompanyData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SARL">SARL</SelectItem>
                      <SelectItem value="SAS">SAS</SelectItem>
                      <SelectItem value="EURL">EURL</SelectItem>
                      <SelectItem value="SASU">SASU</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  value={companyData.address}
                  onChange={(e) => setCompanyData(prev => ({ ...prev, address: e.target.value }))}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">Ville</Label>
                  <Input
                    id="city"
                    value={companyData.city}
                    onChange={(e) => setCompanyData(prev => ({ ...prev, city: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Code postal</Label>
                  <Input
                    id="postalCode"
                    value={companyData.postalCode}
                    onChange={(e) => setCompanyData(prev => ({ ...prev, postalCode: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="country">Pays</Label>
                  <Select value={companyData.country} onValueChange={(value) => setCompanyData(prev => ({ ...prev, country: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Tunisie">Tunisie</SelectItem>
                      <SelectItem value="Maroc">Maroc</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siret">SIRET</Label>
                  <Input
                    id="siret"
                    value={companyData.siret}
                    onChange={(e) => setCompanyData(prev => ({ ...prev, siret: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="vatNumber">Numéro TVA</Label>
                  <Input
                    id="vatNumber"
                    value={companyData.vatNumber}
                    onChange={(e) => setCompanyData(prev => ({ ...prev, vatNumber: e.target.value }))}
                  />
                </div>
              </div>

              <Separator />

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currency">Devise principale</Label>
                  <Select value={companyData.currency} onValueChange={(value) => setCompanyData(prev => ({ ...prev, currency: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="TND">TND (د.ت)</SelectItem>
                      <SelectItem value="MAD">MAD (DH)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="fiscalYear">Exercice fiscal</Label>
                  <Select value={companyData.fiscalYear} onValueChange={(value) => setCompanyData(prev => ({ ...prev, fiscalYear: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Janvier - Décembre">Janvier - Décembre</SelectItem>
                      <SelectItem value="Avril - Mars">Avril - Mars</SelectItem>
                      <SelectItem value="Juillet - Juin">Juillet - Juin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={() => handleSave('company')} className="w-full md:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder les modifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Settings */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <CardTitle>Plan et facturation</CardTitle>
              </div>
              <CardDescription>
                Gérez votre abonnement et méthodes de paiement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Plan actuel</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-primary text-primary-foreground">
                      {billingData.plan}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      €{billingData.amount}/mois
                    </span>
                  </div>
                </div>
                <Button variant="outline">
                  Modifier le plan
                </Button>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Prochaine facturation</h4>
                <div className="flex items-center justify-between">
                  <span>Le {billingData.nextBilling}</span>
                  <span className="font-medium">€{billingData.amount}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Méthode de paiement</h4>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                    <span>Carte se terminant par {billingData.paymentMethod}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Modifier
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Historique des factures</h4>
                <div className="space-y-2">
                  {[
                    { date: "15 Juillet 2024", amount: "€29.00", status: "Payée" },
                    { date: "15 Juin 2024", amount: "€29.00", status: "Payée" },
                    { date: "15 Mai 2024", amount: "€29.00", status: "Payée" },
                  ].map((invoice, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
                      <div>
                        <span>{invoice.date}</span>
                        <Badge variant="outline" className="ml-2 text-green-600">
                          {invoice.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{invoice.amount}</span>
                        <Button variant="ghost" size="sm">
                          Télécharger
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>
                Configurez vos préférences de notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notifications par email</h4>
                    <p className="text-sm text-gray-600">
                      Recevez des notifications importantes par email
                    </p>
                  </div>
                  <Switch
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Assistant IA</h4>
                    <p className="text-sm text-gray-600">
                      Activer l'assistant IA pour l'aide contextuelle
                    </p>
                  </div>
                  <Switch
                    checked={preferences.aiAssistant}
                    onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, aiAssistant: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Emails marketing</h4>
                    <p className="text-sm text-gray-600">
                      Recevez des informations sur les nouvelles fonctionnalités
                    </p>
                  </div>
                  <Switch
                    checked={preferences.marketingEmails}
                    onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, marketingEmails: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Sauvegarde automatique</h4>
                    <p className="text-sm text-gray-600">
                      Sauvegarde automatique de vos données
                    </p>
                  </div>
                  <Switch
                    checked={preferences.autoBackup}
                    onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, autoBackup: checked }))}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Préférences d'affichage</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">Mode sombre</h5>
                    <p className="text-sm text-gray-600">
                      Basculer vers le thème sombre
                    </p>
                  </div>
                  <Switch
                    checked={preferences.darkMode}
                    onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, darkMode: checked }))}
                  />
                </div>

                <div>
                  <Label htmlFor="language">Langue</Label>
                  <Select value={preferences.language} onValueChange={(value) => setPreferences(prev => ({ ...prev, language: value }))}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={() => handleSave('notifications')} className="w-full md:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder les préférences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Sécurité</CardTitle>
              </div>
              <CardDescription>
                Gérez la sécurité de votre compte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Changer le mot de passe</h4>
                  <div className="space-y-3">
                    <Input type="password" placeholder="Mot de passe actuel" />
                    <Input type="password" placeholder="Nouveau mot de passe" />
                    <Input type="password" placeholder="Confirmer le nouveau mot de passe" />
                    <Button>Mettre à jour le mot de passe</Button>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Authentification à deux facteurs</h4>
                    <p className="text-sm text-gray-600">
                      Ajoutez une couche de sécurité supplémentaire
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {preferences.twoFactor ? (
                      <Badge className="bg-green-100 text-green-800">Activé</Badge>
                    ) : (
                      <Badge variant="outline">Désactivé</Badge>
                    )}
                    <Switch
                      checked={preferences.twoFactor}
                      onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, twoFactor: checked }))}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium">Sessions actives</h4>
                  <div className="space-y-2">
                    {[
                      { device: "MacBook Pro - Chrome", location: "Paris, France", current: true },
                      { device: "iPhone - Safari", location: "Paris, France", current: false },
                    ].map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{session.device}</p>
                          <p className="text-sm text-gray-600">
                            {session.location} {session.current && "(Session actuelle)"}
                          </p>
                        </div>
                        {!session.current && (
                          <Button variant="outline" size="sm">
                            Déconnecter
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-red-900">Zone de danger</h4>
                      <p className="text-sm text-red-700 mt-1">
                        Actions irréversibles qui affecteront définitivement votre compte
                      </p>
                      <div className="mt-3 space-y-2">
                        <Button variant="outline" size="sm" className="text-red-600 border-red-300">
                          Supprimer toutes les données
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-300">
                          Supprimer le compte
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
