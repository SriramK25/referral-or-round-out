import Table from "./Components/Table";
import PieChart from "./Components/PieChart";
import { PersonProvider } from "./Contexts/PersonProvider";
import { ChartProvider } from "./Contexts/ChartProvider";

function App() {
  return (
    <PersonProvider>
      <ChartProvider>
        <Table />
        <PieChart />
      </ChartProvider>
    </PersonProvider>
  );
}

export default App;
