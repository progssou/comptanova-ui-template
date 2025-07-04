
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const BillingSettings = () => {
  const [billingData, setBillingData] = useState({
    plan: "Pro",
    nextBilling: "15 février 2024",
    amount: "€35/mois",
    paymentMethod: "**** **** **** 1234"
  });

  const planFeatures = {
    Gratuit: ["1 utilisateur", "Comptabilité de base", "Support email"],
    Pro: ["5 utilisateurs", "IA assistant", "Multi-devises", "Support prioritaire"],
    Premium: ["Utilisateurs illimités", "IA avancée", "API", "Support 24/7"]
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Plan actuel: {billingData.plan}
            <Badge className="bg-blue-100 text-blue-700">Actif</Badge>
          </CardTitle>
          <CardDescription>
            Gérez votre abonnement et vos moyens de paiement
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">Plan {billingData.plan}</h3>
                <p className="text-2xl font-bold text-blue-600">{billingData.amount}</p>
              </div>
              <Button variant="outline">Changer de plan</Button>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Prochaine facturation: {billingData.nextBilling}</p>
              <p className="text-sm text-gray-600">Méthode de paiement: {billingData.paymentMethod}</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Fonctionnalités incluses</h4>
            <ul className="space-y-1">
              {planFeatures[billingData.plan as keyof typeof planFeatures].map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div className="flex gap-2">
            <Button variant="outline">Modifier le paiement</Button>
            <Button variant="outline">Télécharger les factures</Button>
            <Button variant="outline" className="text-red-600">Annuler l'abonnement</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingSettings;
