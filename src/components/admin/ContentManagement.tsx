
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Save, Edit, Plus, Trash } from "lucide-react";

interface PricingPlan {
  name: string;
  monthlyPrice: string;
  annualPrice: string;
  description: string;
  features: string[];
  popular: boolean;
}

interface HomePageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  ctaButtonText: string;
  ctaSecondaryText: string;
}

const ContentManagement = () => {
  const [homeContent, setHomeContent] = useState<HomePageContent>({
    heroTitle: "ComptaNova",
    heroSubtitle: "🚀 Nouvelle plateforme IA",
    heroDescription: "La comptabilité intelligente alimentée par l'IA.\nAutomatisez votre gestion financière et prenez de meilleures décisions.",
    ctaButtonText: "Essayer gratuitement",
    ctaSecondaryText: "Voir la démo"
  });

  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([
    {
      name: "Gratuit",
      monthlyPrice: "0",
      annualPrice: "0",
      description: "Pour découvrir ComptaNova",
      features: [
        "1 utilisateur",
        "Comptabilité de base",
        "Rapports mensuels",
        "Support par email",
        "Stockage 1 GB"
      ],
      popular: false
    },
    {
      name: "Pro",
      monthlyPrice: "35",
      annualPrice: "29",
      description: "Pour les PME en croissance",
      features: [
        "Jusqu'à 5 utilisateurs",
        "IA assistant comptable",
        "Multi-devises",
        "Rapports personnalisés",
        "Intégrations bancaires",
        "Support prioritaire",
        "Stockage 50 GB"
      ],
      popular: true
    },
    {
      name: "Premium",
      monthlyPrice: "95",
      annualPrice: "79",
      description: "Pour les entreprises établies",
      features: [
        "Utilisateurs illimités",
        "IA avancée + automation",
        "Multi-sociétés",
        "API personnalisée",
        "Audit trail complet",
        "Support dédié 24/7",
        "Stockage illimité"
      ],
      popular: false
    }
  ]);

  const [editingPlan, setEditingPlan] = useState<number | null>(null);
  const [newFeature, setNewFeature] = useState("");

  const updateHomeContent = (field: keyof HomePageContent, value: string) => {
    setHomeContent(prev => ({ ...prev, [field]: value }));
  };

  const updatePlan = (index: number, field: keyof PricingPlan, value: any) => {
    setPricingPlans(prev => prev.map((plan, i) => 
      i === index ? { ...plan, [field]: value } : plan
    ));
  };

  const addFeature = (planIndex: number) => {
    if (!newFeature.trim()) return;
    
    setPricingPlans(prev => prev.map((plan, i) => 
      i === planIndex 
        ? { ...plan, features: [...plan.features, newFeature.trim()] }
        : plan
    ));
    setNewFeature("");
  };

  const removeFeature = (planIndex: number, featureIndex: number) => {
    setPricingPlans(prev => prev.map((plan, i) => 
      i === planIndex 
        ? { ...plan, features: plan.features.filter((_, fi) => fi !== featureIndex) }
        : plan
    ));
  };

  const saveChanges = () => {
    // Ici vous pourriez sauvegarder les changements vers une API
    console.log("Sauvegarde des modifications:", { homeContent, pricingPlans });
    alert("Modifications sauvegardées avec succès !");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gestion du contenu</h2>
          <p className="text-muted-foreground">Modifiez le contenu de la page d'accueil et les plans tarifaires</p>
        </div>
        <Button onClick={saveChanges} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Sauvegarder les modifications
        </Button>
      </div>

      <Tabs defaultValue="homepage" className="space-y-4">
        <TabsList>
          <TabsTrigger value="homepage">Page d'accueil</TabsTrigger>
          <TabsTrigger value="pricing">Plans tarifaires</TabsTrigger>
        </TabsList>

        <TabsContent value="homepage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Section Hero</CardTitle>
              <CardDescription>Modifiez le contenu principal de la page d'accueil</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hero-subtitle">Badge/Sous-titre</Label>
                  <Input
                    id="hero-subtitle"
                    value={homeContent.heroSubtitle}
                    onChange={(e) => updateHomeContent('heroSubtitle', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hero-title">Titre principal</Label>
                  <Input
                    id="hero-title"
                    value={homeContent.heroTitle}
                    onChange={(e) => updateHomeContent('heroTitle', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hero-description">Description</Label>
                <Textarea
                  id="hero-description"
                  value={homeContent.heroDescription}
                  onChange={(e) => updateHomeContent('heroDescription', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cta-primary">Bouton principal</Label>
                  <Input
                    id="cta-primary"
                    value={homeContent.ctaButtonText}
                    onChange={(e) => updateHomeContent('ctaButtonText', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cta-secondary">Bouton secondaire</Label>
                  <Input
                    id="cta-secondary"
                    value={homeContent.ctaSecondaryText}
                    onChange={(e) => updateHomeContent('ctaSecondaryText', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          {pricingPlans.map((plan, planIndex) => (
            <Card key={planIndex}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    Plan {plan.name}
                    {plan.popular && <Badge>Populaire</Badge>}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingPlan(editingPlan === planIndex ? null : planIndex)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {editingPlan === planIndex ? (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nom du plan</Label>
                        <Input
                          value={plan.name}
                          onChange={(e) => updatePlan(planIndex, 'name', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Input
                          value={plan.description}
                          onChange={(e) => updatePlan(planIndex, 'description', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Prix mensuel (€)</Label>
                        <Input
                          value={plan.monthlyPrice}
                          onChange={(e) => updatePlan(planIndex, 'monthlyPrice', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Prix annuel (€)</Label>
                        <Input
                          value={plan.annualPrice}
                          onChange={(e) => updatePlan(planIndex, 'annualPrice', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Plan populaire</Label>
                        <div className="flex items-center space-x-2 mt-2">
                          <input
                            type="checkbox"
                            checked={plan.popular}
                            onChange={(e) => updatePlan(planIndex, 'popular', e.target.checked)}
                          />
                          <span className="text-sm">Marquer comme populaire</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Fonctionnalités</Label>
                      <div className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2">
                            <Input
                              value={feature}
                              onChange={(e) => {
                                const newFeatures = [...plan.features];
                                newFeatures[featureIndex] = e.target.value;
                                updatePlan(planIndex, 'features', newFeatures);
                              }}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeFeature(planIndex, featureIndex)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        
                        <div className="flex items-center gap-2">
                          <Input
                            placeholder="Nouvelle fonctionnalité"
                            value={newFeature}
                            onChange={(e) => setNewFeature(e.target.value)}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addFeature(planIndex)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Prix mensuel</p>
                      <p className="text-2xl font-bold">€{plan.monthlyPrice}/mois</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Prix annuel</p>
                      <p className="text-2xl font-bold">€{plan.annualPrice}/mois</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground mb-2">Fonctionnalités</p>
                      <ul className="text-sm space-y-1">
                        {plan.features.map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagement;
