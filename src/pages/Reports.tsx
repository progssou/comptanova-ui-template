
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, BarChart3, Scale } from "lucide-react";
import BalanceSheet from "@/components/reports/BalanceSheet";
import ProfitLoss from "@/components/reports/ProfitLoss";
import TrialBalance from "@/components/reports/TrialBalance";

const Reports = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="h-8 w-8" />
            États financiers
          </h1>
          <p className="text-gray-600">
            Bilan, compte de résultat et balance générale
          </p>
        </div>

        <Tabs defaultValue="balance-sheet" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="balance-sheet" className="flex items-center gap-2">
              <Scale className="h-4 w-4" />
              Bilan
            </TabsTrigger>
            <TabsTrigger value="profit-loss" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Résultat
            </TabsTrigger>
            <TabsTrigger value="trial-balance" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Balance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="balance-sheet">
            <BalanceSheet />
          </TabsContent>

          <TabsContent value="profit-loss">
            <ProfitLoss />
          </TabsContent>

          <TabsContent value="trial-balance">
            <TrialBalance />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
