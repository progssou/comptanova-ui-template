import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPlan = location.state?.plan || "Gratuit";
  
  const [formData, setFormData] = useState({
    // Informations personnelles
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    // Informations entreprise
    companyName: "",
    companyAddress: "",
    companyCity: "",
    companyPostalCode: "",
    companyCountry: "France",
    siret: "",
    industry: "",
    // Système comptable
    accountingSystem: "",
    // Acceptation
    acceptTerms: false,
    acceptMarketing: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Inscription:", formData);
    // Simulate successful registration
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Button>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">CN</span>
              </div>
              <h1 className="text-2xl font-bold">ComptaNova</h1>
            </div>
            <p className="text-gray-600">
              Créez votre compte dirigeant et votre entreprise
            </p>
          </div>
        </div>

        {/* Plan sélectionné */}
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-blue-900">Plan sélectionné: {selectedPlan}</p>
                <p className="text-sm text-blue-700">Vous pourrez modifier votre plan après inscription</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/')}
              >
                Changer
              </Button>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations personnelles */}
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
              <CardDescription>
                En tant que dirigeant, vous aurez accès à tous les modules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Prénom *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Nom *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email professionnel *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">Mot de passe *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations entreprise */}
          <Card>
            <CardHeader>
              <CardTitle>Informations entreprise</CardTitle>
              <CardDescription>
                Ces informations seront utilisées pour configurer votre comptabilité
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="companyName">Nom de l'entreprise *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="siret">SIRET / Matricule fiscal</Label>
                <Input
                  id="siret"
                  value={formData.siret}
                  onChange={(e) => handleInputChange('siret', e.target.value)}
                  placeholder={formData.companyCountry === "France" ? "12345678901234" : "1234567/A/M/000"}
                />
              </div>
              
              <div>
                <Label htmlFor="industry">Secteur d'activité</Label>
                <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre secteur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="commerce">Commerce</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="industrie">Industrie</SelectItem>
                    <SelectItem value="batiment">Bâtiment</SelectItem>
                    <SelectItem value="agriculture">Agriculture</SelectItem>
                    <SelectItem value="tech">Technologie</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="companyAddress">Adresse *</Label>
                <Input
                  id="companyAddress"
                  value={formData.companyAddress}
                  onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyCity">Ville *</Label>
                  <Input
                    id="companyCity"
                    value={formData.companyCity}
                    onChange={(e) => handleInputChange('companyCity', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="companyPostalCode">Code postal *</Label>
                  <Input
                    id="companyPostalCode"
                    value={formData.companyPostalCode}
                    onChange={(e) => handleInputChange('companyPostalCode', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="companyCountry">Pays *</Label>
                <Select value={formData.companyCountry} onValueChange={(value) => handleInputChange('companyCountry', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="France">France</SelectItem>
                    <SelectItem value="Tunisia">Tunisie</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Configuration comptable */}
          <Card>
            <CardHeader>
              <CardTitle>Configuration comptable</CardTitle>
              <CardDescription>
                Choisissez le système comptable selon votre localisation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="accountingSystem">Système comptable *</Label>
                <Select value={formData.accountingSystem} onValueChange={(value) => handleInputChange('accountingSystem', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le système comptable" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PCG_FRANCE">Plan Comptable Général Français (PCG)</SelectItem>
                    <SelectItem value="SYSCOA_TUNISIA">Système Comptable des Entreprises Tunisiennes (SCE)</SelectItem>
                  </SelectContent>
                </Select>
                {formData.accountingSystem && (
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      {formData.accountingSystem === "PCG_FRANCE" 
                        ? "Le Plan Comptable Général français sera configuré avec les comptes standards français."
                        : "Le Système Comptable des Entreprises tunisiennes sera configuré selon les normes tunisiennes."
                      }
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Acceptation */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => handleInputChange('acceptTerms', checked as boolean)}
                  required
                />
                <Label htmlFor="acceptTerms" className="text-sm">
                  J'accepte les{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    conditions d'utilisation
                  </a>{" "}
                  et la{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    politique de confidentialité
                  </a>{" "}
                  *
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptMarketing"
                  checked={formData.acceptMarketing}
                  onCheckedChange={(checked) => handleInputChange('acceptMarketing', checked as boolean)}
                />
                <Label htmlFor="acceptMarketing" className="text-sm">
                  J'accepte de recevoir des communications marketing de ComptaNova
                </Label>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" size="lg">
            Créer mon compte et mon entreprise
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Vous avez déjà un compte?{" "}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:underline"
            >
              Se connecter
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
