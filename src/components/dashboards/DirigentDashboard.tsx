
import KPICards from "./dirigent/KPICards";
import ChartsSection from "./dirigent/ChartsSection";
import ActivityAndGoals from "./dirigent/ActivityAndGoals";

const DirigentDashboard = () => {
  return (
    <div className="space-y-6">
      <KPICards />
      <ChartsSection />
      <ActivityAndGoals />
    </div>
  );
};

export default DirigentDashboard;
