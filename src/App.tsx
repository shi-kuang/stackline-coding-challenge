/// <reference types="vite-plugin-svgr/client" />
import Logo from "./assets/stackline_logo.svg?react";
import "./css/App.css";
import SalesChart from "./components/SalesChart";
import SalesTable from "./components/SalesTable";
import ItemDetails from "./components/ItemDetails";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { displayData } from "./reducer/dataSlice";
import { fetchSalesData } from "./api/sales";

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
      <div style={{ backgroundColor: "#00008B", padding: "10px" }}>
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
