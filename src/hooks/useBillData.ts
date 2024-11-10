import { useState, useEffect } from "react";
import { Bill } from "../types/Bill";

const useBillData = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Added loading state

  useEffect(() => {
    // Fetch initial data (mocked or replace with API call)
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        // Example API fetch or mocked data
        const response = await fetch("/api/bills");
        const data = await response.json();
        setBills(data);
      } catch (error) {
        console.error("Error fetching bill data:", error);
      } finally {
        setLoading(false); // Stop loading
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
    loading, // Return the loading state
    addBill,
    updateBill,
    deleteBill,
  };
};

export default useBillData;
