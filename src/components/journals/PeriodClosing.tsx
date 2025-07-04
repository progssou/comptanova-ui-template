import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendar";
import { Lock, Unlock, AlertTriangle } from "lucide-react";

interface Period {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: "open" | "closed" | "locked";
  closingDate?: Date;
}

const PeriodClosing = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [periods, setPeriods] = useState<Period[]>([
    {
      id: "2024-01",
      name: "Janvier 2024",
      startDate: new Date(2024, 0, 1),
      endDate: new Date(2024, 0, 31),
      status: "locked",
      closingDate: new Date(2024, 1, 15)
    },
    {
      id: "2024-02",
      name: "Février 2024",
      startDate: new Date(2024, 1, 1),
      endDate: new Date(2024, 1, 29),
      status: "closed",
      closingDate: new Date(2024, 2, 15)
    },
    {
      id: "2024-03",
      name: "Mars 2024",
      startDate: new Date(2024, 2, 1),
      endDate: new Date(2024, 2, 31),
      status: "open"
    }
  ]);

  const getStatusBadge = (status: Period["status"]) => {
    const variants = {
      "locked": { variant: "destructive" as const, icon: Lock },
      "closed": { variant: "default" as const, icon: Lock },
      "open": { variant: "outline" as const, icon: Unlock }
    };
    
    const StatusIcon = variants[status].icon;
    
    return (
      <Badge variant={variants[status].variant} className="flex items-center gap-1">
        <StatusIcon className="h-3 w-3" />
        {status === "locked" ? "Verrouillé" : status === "closed" ? "Clôturé" : "Ouvert"}
      </Badge>
    );
  };

  const handleClosePeriod = (periodId: string) => {
    setPeriods(periods.map(period => 
      period.id === periodId 
        ? { ...period, status: "closed", closingDate: new Date() }
        : period
    ));
  };

  const handleLockPeriod = (periodId: string) => {
    setPeriods(periods.map(period => 
      period.id === periodId 
        ? { ...period, status: "locked" }
        : period
    ));
  };

  const handleReopenPeriod = (periodId: string) => {
    setPeriods(periods.map(period => 
      period.id === periodId 
        ? { ...period, status: "open", closingDate: undefined }
        : period
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Clôture des périodes</h2>
          <p className="text-gray-600">Gestion des périodes comptables</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Calendrier des périodes</CardTitle>
            <CardDescription>Sélectionnez une période pour la gérer</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>État des périodes</CardTitle>
            <CardDescription>Périodes comptables et leurs statuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {periods.map((period) => (
                <div key={period.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{period.name}</h3>
                    <p className="text-sm text-gray-500">
                      Du {period.startDate.toLocaleDateString()} au {period.endDate.toLocaleDateString()}
                    </p>
                    {period.closingDate && (
                      <p className="text-sm text-gray-500">
                        Clôturé le {period.closingDate.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    {getStatusBadge(period.status)}
                    <div className="flex gap-2">
                      {period.status === "open" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleClosePeriod(period.id)}
                        >
                          Clôturer
                        </Button>
                      )}
                      {period.status === "closed" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReopenPeriod(period.id)}
                          >
                            Rouvrir
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleLockPeriod(period.id)}
                          >
                            Verrouiller
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Le verrouillage d'une période est définitif et empêche toute modification ultérieure des écritures.
          Assurez-vous d'avoir effectué toutes les vérifications nécessaires avant de verrouiller une période.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default PeriodClosing; 