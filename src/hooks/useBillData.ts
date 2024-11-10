import { useState, useEffect } from "react";
import { Bill } from "../types/Bill";

const useBillData = () => {
  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    // Fetch initial data (mocked or replace with API call)
    const fetchData = async () => {
      try {
        // Example API fetch or mocked data
        const response = await fetch("/api/bills");
        const data = await response.json();
        setBills(data);
      } catch (error) {
        console.error("Error fetching bill data:", error);
      }
    };

    fetchData();
  }, []);

  const addBill = (newBill: Bill) => {
    setBills((prevBills) => [...prevBills, newBill]);
  };

  const updateBill = (updatedBill: Bill) => {
    setBills((prevBills) =>
      prevBills.map((bill) => (bill.id === updatedBill.id ? updatedBill : bill))
    );
  };

  const deleteBill = (id: string) => {
    setBills((prevBills) => prevBills.filter((bill) => bill.id !== id));
  };

  return {
    bills,
    addBill,
    updateBill,
    deleteBill,
  };
};

export default useBillData;
