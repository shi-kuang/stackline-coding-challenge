export interface SalesData {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
}

export interface dataState {
  title: string;
  image: string;
  subtitle: string;
  tags: string[];
  salesData: SalesData[];
}
