import { useState, useEffect } from "react";
import { Bill } from "../types/Bill";

const LOCAL_STORAGE_KEY = "pendingBills";

const useBillData = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load initial data from localStorage and API
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        // Load bills from localStorage
        const storedBills = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedBills) {
          const parsedBills = JSON.parse(storedBills) as Bill[];
          setBills(parsedBills);
        }

        // Fetch bills from the backend API
        const response = await fetch("/api/bills");
        if (response.ok) {
          const apiBills = await response.json();
          setBills((prevBills) => [...apiBills, ...prevBills]);
        } else {
          console.error("Failed to fetch data from the backend.");
        }
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Add bill to state and save it to localStorage
  const addBill = (newBill: Bill) => {
    setBills((prevBills) => {
      const updatedBills = [...prevBills, newBill];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedBills));
      return updatedBills;
    });
  };

  // Sync bills with the backend and clear them from localStorage if successful
  const syncWithBackend = async () => {
    try {
      const storedBills = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedBills) {
        const pendingBills: Bill[] = JSON.parse(storedBills);
        for (const bill of pendingBills) {
          const response = await fetch("/api/bills", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bill),
          });

          if (response.ok) {
            console.log(`Bill with ID ${bill.id} successfully saved.`);
            setBills((prevBills) => {
              const updatedBills = prevBills.filter((b) => b.id !== bill.id);
              localStorage.setItem(
                LOCAL_STORAGE_KEY,
                JSON.stringify(updatedBills)
              );
              return updatedBills;
            });
          } else {
            console.error(`Failed to save bill with ID ${bill.id}`);
          }
        }
      }
    } catch (error) {
      console.error("Error syncing bills with backend:", error);
    }
  };

  const updateBill = (updatedBill: Bill) => {
    setBills((prevBills) => {
      const updatedBills = prevBills.map((bill) =>
        bill.id === updatedBill.id ? updatedBill : bill
      );
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedBills));
      return updatedBills;
    });
  };

  const deleteBill = (id: string) => {
    setBills((prevBills) => {
      const updatedBills = prevBills.filter((bill) => bill.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedBills));
      return updatedBills;
    });
  };

  return {
    bills,
    loading,
    addBill,
    updateBill,
    deleteBill,
    syncWithBackend,
  };
};

export default useBillData;
