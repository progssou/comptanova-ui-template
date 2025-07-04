
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Bot } from "lucide-react";

const AISettings = () => {
  const [aiSettings, setAiSettings] = useState({
    enabled: true,
    autoBooking: true,
    smartSuggestions: true,
    chatAssistant: true,
    documentAnalysis: true
  });

  const handleAiToggle = (feature: string, value: boolean) => {
    setAiSettings(prev => ({ ...prev, [feature]: value }));
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Assistant IA ComptaNova
          </CardTitle>
          <CardDescription>
            Configurez l'intelligence artificielle pour optimiser votre comptabilité
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="ai-enabled" className="font-medium">Activer l'assistant IA</Label>
              <p className="text-sm text-gray-600">Active toutes les fonctionnalités d'intelligence artificielle</p>
            </div>
            <Switch
              id="ai-enabled"
              checked={aiSettings.enabled}
              onCheckedChange={(value) => handleAiToggle('enabled', value)}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Fonctionnalités IA</h4>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-booking">Saisie automatique</Label>
                <p className="text-sm text-gray-600">Automatise la saisie des écritures comptables</p>
              </div>
              <Switch
                id="auto-booking"
                checked={aiSettings.autoBooking}
                onCheckedChange={(value) => handleAiToggle('autoBooking', value)}
                disabled={!aiSettings.enabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="smart-suggestions">Suggestions intelligentes</Label>
                <p className="text-sm text-gray-600">Propose des comptes et imputations automatiquement</p>
              </div>
              <Switch
                id="smart-suggestions"
                checked={aiSettings.smartSuggestions}
                onCheckedChange={(value) => handleAiToggle('smartSuggestions', value)}
                disabled={!aiSettings.enabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="chat-assistant">Chat assistant</Label>
                <p className="text-sm text-gray-600">Répondez à vos questions comptables en temps réel</p>
              </div>
              <Switch
                id="chat-assistant"
                checked={aiSettings.chatAssistant}
                onCheckedChange={(value) => handleAiToggle('chatAssistant', value)}
                disabled={!aiSettings.enabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="document-analysis">Analyse de documents</Label>
                <p className="text-sm text-gray-600">Extrait automatiquement les données des factures PDF</p>
              </div>
              <Switch
                id="document-analysis"
                checked={aiSettings.documentAnalysis}
                onCheckedChange={(value) => handleAiToggle('documentAnalysis', value)}
                disabled={!aiSettings.enabled}
              />
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">💡 Conseil IA</h4>
            <p className="text-sm text-green-700">
              L'IA a détecté que vous pourriez optimiser vos charges en regroupant certaines dépenses. 
              Souhaitez-vous voir les suggestions ?
            </p>
            <Button size="sm" className="mt-2" variant="outline">
              Voir les suggestions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AISettings;
