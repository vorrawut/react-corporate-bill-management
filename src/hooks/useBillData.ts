import { useState, useEffect, useCallback } from "react";
import { Bill } from "../types/Bill";
import BillService from "../services/BillService";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  removeFromLocalStorage,
} from "../utils/localStorageHelper";

const LOCAL_STORAGE_KEY = "pendingBills";

const useBillData = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        // Load bills from local storage
        const localBills =
          loadFromLocalStorage<Bill[]>(LOCAL_STORAGE_KEY) || [];
        if (localBills.length > 0) {
          console.info("Loaded bills from local storage.");
        }
        setBills(localBills);

        // Fetch bills from the API
        const apiBills = await BillService.fetchBills();
        console.info("Fetched bills from the API successfully.");
        setBills((prevBills) => [...apiBills, ...prevBills]);
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const addBill = useCallback((newBill: Bill) => {
    setBills((prevBills) => {
      const updatedBills = [...prevBills, newBill];
      saveToLocalStorage(LOCAL_STORAGE_KEY, updatedBills);
      return updatedBills;
    });
  }, []);

  const syncWithBackend = useCallback(async () => {
    const pendingBills = loadFromLocalStorage<Bill[]>(LOCAL_STORAGE_KEY) || [];
    if (pendingBills.length > 0) {
      console.info("Syncing pending bills with the backend...");
      const failedBills: Bill[] = [];

      for (const bill of pendingBills) {
        try {
          await BillService.addBill(bill);
          console.info(`Bill with ID ${bill.id} successfully synced.`);
          setBills((prevBills) => {
            const updatedBills = prevBills.filter((b) => b.id !== bill.id);
            saveToLocalStorage(LOCAL_STORAGE_KEY, updatedBills);
            return updatedBills;
          });
        } catch (error) {
          console.error(`Failed to sync bill with ID ${bill.id}:`, error);
          failedBills.push(bill);
        }
      }

      // Update local storage with any remaining failed bills
      if (failedBills.length > 0) {
        saveToLocalStorage(LOCAL_STORAGE_KEY, failedBills);
        console.warn("Some bills failed to sync and remain in local storage.");
      } else {
        removeFromLocalStorage(LOCAL_STORAGE_KEY);
        console.info("All pending bills have been successfully synced.");
      }
    }
  }, []);

  const updateBill = useCallback((updatedBill: Bill) => {
    setBills((prevBills) => {
      const updatedBills = prevBills.map((bill) =>
        bill.id === updatedBill.id ? updatedBill : bill
      );
      saveToLocalStorage(LOCAL_STORAGE_KEY, updatedBills);
      return updatedBills;
    });
  }, []);

  const deleteBill = useCallback((id: string) => {
    setBills((prevBills) => {
      const updatedBills = prevBills.filter((bill) => bill.id !== id);
      saveToLocalStorage(LOCAL_STORAGE_KEY, updatedBills);
      return updatedBills;
    });
  }, []);

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
