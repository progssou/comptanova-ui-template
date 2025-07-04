
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import NewJournalEntryModal from "@/components/modals/NewJournalEntryModal";
import JournalStats from "@/components/journals/JournalStats";
import JournalFilters from "@/components/journals/JournalFilters";
import JournalEntryTable from "@/components/journals/JournalEntryTable";

const Journals = () => {
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Journaux</h1>
            <p className="text-gray-600">Saisie et gestion des écritures comptables</p>
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
                <CardDescription>Historique des saisies récentes</CardDescription>
              </div>
              <JournalFilters />
            </div>
          </CardHeader>
          <CardContent>
            <JournalEntryTable />
          </CardContent>
        </Card>
      </div>

      <NewJournalEntryModal 
        open={showNewEntryModal} 
        onOpenChange={setShowNewEntryModal} 
      />
    </DashboardLayout>
  );
};

export default Journals;
