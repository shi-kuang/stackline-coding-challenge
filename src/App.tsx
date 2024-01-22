/// <reference types="vite-plugin-svgr/client" />
import Logo from "./assets/stackline_logo.svg?react";
import "./css/App.css";
import SalesChart from "./components/SalesChart.tsx";
import SalesTable from "./components/SalesTable.tsx";
import ItemDetails from "./components/ItemDetails.tsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { displayData } from "./reducer/dataSlice";
import { fetchSalesData } from "./api/sales.ts";

const App: React.FC = () => {
  const dispatch = useDispatch();

  //fetches data from api on page load and stores result in store
  useEffect(() => {
    fetchSalesData()
      .then((res) => dispatch(displayData(res)))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "#ADD8E6", padding: "10px" }}>
        <Logo />
      </div>
      <div className="mainDashboard">
        <div className="component">
          <ItemDetails />
        </div>
        <div className="component">
          <SalesChart />
          <SalesTable />
        </div>
      </div>
    </>
  );
};

export default App;
