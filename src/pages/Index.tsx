
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";

const Index = () => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Gratuit",
      price: isAnnual ? "0" : "0",
      period: "mois",
      description: "Pour découvrir ComptaNova",
      features: [
        "1 utilisateur",
        "Comptabilité de base",
        "Rapports mensuels",
        "Support par email",
        "Stockage 1 GB"
      ],
      popular: false,
      buttonText: "Commencer gratuitement",
      buttonVariant: "outline" as const
    },
    {
      name: "Pro",
      price: isAnnual ? "29" : "35",
      period: "mois",
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
      popular: true,
      buttonText: "Choisir Pro",
      buttonVariant: "default" as const
    },
    {
      name: "Premium",
      price: isAnnual ? "79" : "95",
      period: "mois",
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
      popular: false,
      buttonText: "Choisir Premium",
      buttonVariant: "outline" as const
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-indigo-50 dark:from-gray-900 dark:via-background dark:to-gray-800">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
            🚀 Nouvelle plateforme IA
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ComptaNova
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            La comptabilité intelligente alimentée par l'IA.<br />
            Automatisez votre gestion financière et prenez de meilleures décisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/signup')}
              className="text-lg px-8 py-3"
            >
              Essayer gratuitement
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-3"
              onClick={() => navigate('/dashboard')}
            >
              Voir la démo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Pourquoi choisir ComptaNova ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  🤖
                </div>
                <CardTitle>IA Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Automatisation intelligente de la saisie comptable et conseils personnalisés.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  💰
                </div>
                <CardTitle>Multi-devises</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Gérez facilement vos opérations internationales avec conversion automatique.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  📊
                </div>
                <CardTitle>Rapports en temps réel</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Tableaux de bord interactifs et rapports personnalisés pour piloter votre activité.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Plans et tarifs</h2>
            <p className="text-muted-foreground mb-8">
              Choisissez le plan qui correspond à vos besoins
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={!isAnnual ? "font-semibold text-foreground" : "text-muted-foreground"}>
                Mensuel
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  isAnnual ? "bg-primary" : "bg-muted"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-background rounded-full transition-transform ${
                    isAnnual ? "transform translate-x-7" : ""
                  }`}
                />
              </button>
              <span className={isAnnual ? "font-semibold text-foreground" : "text-muted-foreground"}>
                Annuel
                <Badge className="ml-2 bg-green-500/10 text-green-600 dark:text-green-400">
                  -20%
                </Badge>
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${
                  plan.popular
                    ? "border-primary shadow-xl scale-105"
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Le plus populaire
                  </Badge>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">€{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    className="w-full mt-6"
                    variant={plan.buttonVariant}
                    onClick={() => navigate('/signup', { state: { plan: plan.name } })}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-card border-t border-border py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4 text-foreground">ComptaNova</h3>
              <p className="text-muted-foreground">
                La solution comptable intelligente pour les PME.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Produit</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-primary transition-colors">Fonctionnalités</button></li>
                <li><button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-primary transition-colors">Tarifs</button></li>
                <li><button onClick={() => navigate('/dashboard')} className="hover:text-primary transition-colors">Sécurité</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><button onClick={() => navigate('/dashboard')} className="hover:text-primary transition-colors">Documentation</button></li>
                <li><button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-primary transition-colors">Contact</button></li>
                <li><button onClick={() => navigate('/dashboard')} className="hover:text-primary transition-colors">Formation</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Légal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><button onClick={() => navigate('/dashboard')} className="hover:text-primary transition-colors">Conditions d'utilisation</button></li>
                <li><button onClick={() => navigate('/dashboard')} className="hover:text-primary transition-colors">Confidentialité</button></li>
                <li><button onClick={() => navigate('/dashboard')} className="hover:text-primary transition-colors">Cookies</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 ComptaNova. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
