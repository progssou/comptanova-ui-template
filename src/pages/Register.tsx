
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Building2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal info
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // Company info
    companyName: "",
    companyType: "",
    industry: "",
    country: "",
    currency: "",
    // Agreement
    acceptTerms: false,
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally handle the registration
    console.log("Registration data:", formData);
    navigate("/dashboard");
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-600 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Link>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">CN</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">ComptaNova</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Créer votre compte</h1>
          <p className="text-gray-600">Commencez votre essai gratuit aujourd'hui</p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= i ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {i}
              </div>
              {i < 3 && (
                <div className={`w-12 h-1 ${step > i ? 'bg-primary' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>
                    Créez votre compte dirigeant
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => updateFormData("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => updateFormData("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email professionnel</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => updateFormData("password", e.target.value)}
                      required
                    />
                  </div>
                  <Button type="button" onClick={handleNext} className="w-full">
                    Continuer
                  </Button>
                </CardContent>
              </>
            )}

            {step === 2 && (
              <>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Informations entreprise
                  </CardTitle>
                  <CardDescription>
                    Configurez votre entreprise
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Nom de l'entreprise</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => updateFormData("companyName", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyType">Type d'entreprise</Label>
                    <Select onValueChange={(value) => updateFormData("companyType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sarl">SARL</SelectItem>
                        <SelectItem value="sas">SAS</SelectItem>
                        <SelectItem value="eurl">EURL</SelectItem>
                        <SelectItem value="sasu">SASU</SelectItem>
                        <SelectItem value="auto-entrepreneur">Auto-entrepreneur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="industry">Secteur d'activité</Label>
                    <Select onValueChange={(value) => updateFormData("industry", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="commerce">Commerce</SelectItem>
                        <SelectItem value="services">Services</SelectItem>
                        <SelectItem value="industrie">Industrie</SelectItem>
                        <SelectItem value="batiment">Bâtiment</SelectItem>
                        <SelectItem value="restauration">Restauration</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="country">Pays</Label>
                      <Select onValueChange={(value) => updateFormData("country", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pays..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="france">France</SelectItem>
                          <SelectItem value="tunisie">Tunisie</SelectItem>
                          <SelectItem value="maroc">Maroc</SelectItem>
                          <SelectItem value="algerie">Algérie</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="currency">Devise</Label>
                      <Select onValueChange={(value) => updateFormData("currency", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Devise..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="eur">EUR (€)</SelectItem>
                          <SelectItem value="tnd">TND (د.ت)</SelectItem>
                          <SelectItem value="mad">MAD (DH)</SelectItem>
                          <SelectItem value="dzd">DZD (DA)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Retour
                    </Button>
                    <Button type="button" onClick={handleNext} className="flex-1">
                      Continuer
                    </Button>
                  </div>
                </CardContent>
              </>
            )}

            {step === 3 && (
              <>
                <CardHeader>
                  <CardTitle>Finalisation</CardTitle>
                  <CardDescription>
                    Acceptez les conditions pour terminer
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Récapitulatif</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Dirigeant:</strong> {formData.firstName} {formData.lastName}</p>
                      <p><strong>Entreprise:</strong> {formData.companyName}</p>
                      <p><strong>Type:</strong> {formData.companyType}</p>
                      <p><strong>Plan:</strong> Gratuit (0€/mois)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => updateFormData("acceptTerms", checked as boolean)}
                    />
                    <Label htmlFor="acceptTerms" className="text-sm leading-relaxed">
                      J'accepte les{" "}
                      <a href="#" className="text-primary hover:underline">conditions d'utilisation</a>
                      {" "}et la{" "}
                      <a href="#" className="text-primary hover:underline">politique de confidentialité</a>
                    </Label>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                      Retour
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1"
                      disabled={!formData.acceptTerms}
                    >
                      Créer mon compte
                    </Button>
                  </div>
                </CardContent>
              </>
            )}
          </form>
        </Card>

        <p className="text-center text-sm text-gray-600 mt-4">
          Déjà un compte ?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
