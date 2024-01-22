import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { RootState } from "../store";
import { useSelector } from "react-redux";
import type { SalesData } from "../types/sales";
import "../css/SalesChart.css";

// Configure ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GroupData {
  [key: string]: number;
}

function SalesChart() {
  //get chart sales data from store
  const sales = useSelector((state: RootState) => state.data.salesData);
  //create a function to aggregate total sales by month
  const groupSalesByMonthAndKey = (
    data: SalesData[],
    key: keyof SalesData
  ): GroupData => {
    return data.reduce((result: GroupData, sale: SalesData) => {
      //convert string to date
      const date = new Date(sale.weekEnding);
      //grab month name from date
      const month = date.toLocaleString("en-US", { month: "long" });
      //assign month to sum of sales
      result[month]
        ? (result[month] += sale[key] as number)
        : (result[month] = sale[key] as number);
      return result;
    }, {});
  };
  const roundSaleToMillions = (sale: number) =>
    Math.round((sale / 1000000) * 10) / 10;
  //monthly sales information based on specific key and sales is in millions
  const retailSales = Object.entries(
    groupSalesByMonthAndKey(sales, "retailSales")
  ).map((saleEntry) => roundSaleToMillions(saleEntry[1]));
  const wholesaleSales = Object.entries(
    groupSalesByMonthAndKey(sales, "wholesaleSales")
  ).map((saleEntry) => roundSaleToMillions(saleEntry[1]));

  // ChartJS config options
  const options = {
    responsive: true,
    scales: {
      x: { grid: { display: false } },
      y: {
        min: 0,
        max: 10,
        stepSize: 0.5,
        grid: { display: false },
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  const monthLabels = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEPT",
    "OCT",
    "NOV",
    "DEC",
  ];

  const salesData = {
    labels: monthLabels,
    datasets: [
      {
        label: "retail",
        data: retailSales,
        backgroundColor: "rgb(65, 105, 225)",
        borderColor: "rgb(65, 105, 225)",
      },
      {
        label: "wholesale",
        data: wholesaleSales,
        backgroundColor: "rgb(88,88,88)",
        bordercolor: "rgb(88,88,88)",
      },
    ],
  };

  return (
    <>
      <div className="chart-container">
        <div style={{ margin: "10px", textAlign: "left", fontSize: "20px" }}>
          {"Retail Sales ($M)"}
        </div>

        <Line options={options} data={salesData} />
      </div>
    </>
  );
}

export default SalesChart;
