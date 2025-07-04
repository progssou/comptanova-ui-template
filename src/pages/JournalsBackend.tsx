
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import NewJournalEntryModalBackend from "@/components/modals/NewJournalEntryModalBackend";
import JournalStats from "@/components/journals/JournalStats";
import JournalFilters from "@/components/journals/JournalFilters";
import JournalEntryTableBackend from "@/components/journals/JournalEntryTableBackend";

const JournalsBackend = () => {
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);
  // TODO: Récupérer l'ID de l'entreprise du contexte d'authentification
  const companyId = 1; // Temporaire

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Journaux (Backend)</h1>
            <p className="text-gray-600">Saisie et gestion des écritures comptables connectées au backend</p>
          </div>
          <Button 
            className="flex items-center space-x-2"
            onClick={() => setShowNewEntryModal(true)}
          >
            <Plus className="h-4 w-4" />
            <span>Nouvelle écriture</span>
          </Button>
        </div>

        <JournalStats />

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Écritures comptables</CardTitle>
                <CardDescription>Données en temps réel depuis le backend Spring Boot</CardDescription>
              </div>
              <JournalFilters />
            </div>
          </CardHeader>
          <CardContent>
            <JournalEntryTableBackend companyId={companyId} />
          </CardContent>
        </Card>
      </div>

      <NewJournalEntryModalBackend 
        open={showNewEntryModal} 
        onOpenChange={setShowNewEntryModal}
        companyId={companyId}
      />
    </DashboardLayout>
  );
};

export default JournalsBackend;
