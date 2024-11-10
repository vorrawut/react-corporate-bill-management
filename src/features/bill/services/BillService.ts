// src/services/BillService.ts
import axios from "axios";
import { Bill } from "../../../types/Bill";

const axiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

class BillService {
  static async fetchBills(): Promise<Bill[]> {
    const response = await axiosInstance.get<Bill[]>("/bills");
    return response.data;
  }

  static async addBill(bill: Bill): Promise<void> {
    await axiosInstance.post("/bills", bill);
  }
}

export default BillService;
