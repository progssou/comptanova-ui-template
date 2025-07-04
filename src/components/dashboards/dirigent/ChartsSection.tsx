import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const revenueData = [
  { month: 'Jan', value: 45000 },
  { month: 'Fév', value: 52000 },
  { month: 'Mar', value: 48000 },
  { month: 'Avr', value: 58000 },
  { month: 'Mai', value: 65000 },
  { month: 'Jun', value: 72000 },
];

const cashFlowData = [
  { month: 'Jan', entrées: 45000, sorties: 38000 },
  { month: 'Fév', entrées: 52000, sorties: 42000 },
  { month: 'Mar', entrées: 48000, sorties: 39000 },
  { month: 'Avr', entrées: 58000, sorties: 45000 },
  { month: 'Mai', entrées: 65000, sorties: 48000 },
  { month: 'Jun', entrées: 72000, sorties: 52000 },
];

const expensesData = [
  { name: 'Salaires', value: 45, color: '#4287f5' },  // Bleu
  { name: 'Loyer', value: 20, color: '#34c77b' },     // Vert
  { name: 'Marketing', value: 15, color: '#f5a742' },  // Orange
  { name: 'Fournitures', value: 10, color: '#f54242' }, // Rouge
  { name: 'Autres', value: 10, color: '#8b42f5' }      // Violet
];

const ExpensesChart = () => {
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={expensesData}
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={140}
            paddingAngle={2}
            dataKey="value"
          >
            {expensesData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value}%`]}
            contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '6px' }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute bottom-0 w-full">
        <div className="flex flex-wrap justify-center gap-4 pb-4">
          {expensesData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ChartsSection = () => {
  return (
    <Card className="col-span-full">
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Chiffre d'affaires</TabsTrigger>
          <TabsTrigger value="expenses">Dépenses</TabsTrigger>
          <TabsTrigger value="cashflow">Flux de trésorerie</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue">
          <CardHeader>
            <CardTitle>Évolution du chiffre d'affaires</CardTitle>
            <p className="text-sm text-muted-foreground">Derniers 6 mois</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  formatter={(value) => [`${value.toLocaleString()} €`, "Chiffre d'affaires"]}
                  contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </TabsContent>

        <TabsContent value="expenses">
          <CardHeader>
            <CardTitle>Répartition des dépenses</CardTitle>
            <p className="text-sm text-muted-foreground">Ce mois-ci</p>
          </CardHeader>
          <CardContent>
            <ExpensesChart />
          </CardContent>
        </TabsContent>

        <TabsContent value="cashflow">
          <CardHeader>
            <CardTitle>Flux de trésorerie</CardTitle>
            <p className="text-sm text-muted-foreground">Entrées vs Sorties</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={cashFlowData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  formatter={(value) => [`${value.toLocaleString()} €`]}
                  contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="entrées" stroke="#4ade80" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="sorties" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ChartsSection;
