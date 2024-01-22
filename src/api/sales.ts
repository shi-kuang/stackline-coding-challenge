import salesData from "../constants/data.json";

/**
 * Method to call api and return sales data
 * Currently uses static, json file as source. Mocks API call
 */
export const fetchSalesData = async () => {
  return Promise.resolve(salesData);
};
