// src/hooks/useExport.ts
import * as XLSX from "xlsx";
import { Bill } from "../types/Bill";

export const useExport = () => {
  const exportToExcel = (bills: Bill[]) => {
    if (bills.length === 0) {
      console.warn("No data to export");
      return;
    }

    const formattedData = bills.map((bill) => ({
      ID: bill.id,
      "Vendor Name": bill.vendorName,
      Description: bill.description,
      "Invoice Number": bill.invoiceNumber,
      "Bill Date": bill.billDate,
      "Due Date": bill.dueDate,
      Amount: bill.amount,
      Currency: bill.currency,
      Status: bill.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bills");

    XLSX.writeFile(workbook, "Bill_Tracking.xlsx");
  };

  return {
    exportToExcel,
  };
};
