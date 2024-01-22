import type { RootState } from "../store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { HiArrowUp, HiArrowDown, HiMiniArrowsUpDown } from "react-icons/hi2";
import { SalesData } from "../types/sales";

import "../css/SalesTable.css";

const columnConfig: Array<{ columnName: string; columnKey: keyof SalesData }> =
  [
    { columnName: "WEEK ENDING", columnKey: "weekEnding" },
    {
      columnName: "RETAIL SALES",
      columnKey: "retailSales",
    },
    {
      columnName: "WHOLESALE SALES",
      columnKey: "wholesaleSales",
    },
    {
      columnName: "UNITS SOLD",
      columnKey: "unitsSold",
    },
    {
      columnName: "RETAILER MARGIN",
      columnKey: "retailerMargin",
    },
  ];

const SalesTable = () => {
  const sales = useSelector((state: RootState) => state.data.salesData);

  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [sortColumn, setSortColumn] = useState<keyof SalesData>("weekEnding");

  const sortedSales = [...sales];
  sortedSales.sort((a, b) => {
    const sortVar = sortOrder === "desc" ? 1 : -1;
    if (sortColumn === "weekEnding") {
      const aDateTime = new Date(a[sortColumn]).getTime();
      const bDateTime = new Date(b[sortColumn]).getTime();
      return sortVar * (aDateTime - bDateTime);
    } else {
      return sortVar * (a[sortColumn] - b[sortColumn]);
    }
  });

  const handleClick = (index: number) => {
    //grab column name based on index number
    const column: keyof SalesData = Object.entries(sales[0])[
      index
    ][0] as keyof SalesData;
    //set sort direction and column
    sortOrder === "desc" ? setSortOrder("asc") : setSortOrder("desc");
    setSortColumn(column);
  };

  return (
    <>
      <table className="retail-sales-table">
        <thead>
          <tr>
            {/* {each col is assigned to an onclick function} */}
            {columnConfig.map((col, index) => {
              const isColumnSelected = col.columnKey === sortColumn;
              //set sort icon depending on whether current column is selected and asc/desc
              let icon = <HiMiniArrowsUpDown />;
              if (isColumnSelected && sortOrder === "desc") {
                icon = <HiArrowDown />;
              } else if (isColumnSelected && sortOrder === "asc") {
                icon = <HiArrowUp />;
              }
              return (
                <th
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleClick(index)}
                >
                  {col.columnName} {icon}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {/* {each sale row is based on the most updated sorted sales} */}
          {sortedSales &&
            sortedSales.map((sale, index) => {
              return (
                <tr key={index}>
                  <td>{sale.weekEnding}</td>
                  <td>${sale.retailSales.toLocaleString()}</td>
                  <td>${sale.wholesaleSales.toLocaleString()}</td>
                  <td>{sale.unitsSold}</td>
                  <td>${sale.retailerMargin.toLocaleString()}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default SalesTable;
