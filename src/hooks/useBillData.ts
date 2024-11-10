import { useState, useEffect, useCallback } from "react";
import { Bill } from "../types/Bill";
import BillService from "../features/bill/services/BillService";
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
        setBills(localBills.map((bill) => ({ ...bill, isLocal: true }))); // Mark local bills as unsynced

        // Fetch bills from the API
        const apiBills = await BillService.fetchBills();
        console.info("Fetched bills from the API successfully.");
        setBills((prevBills) => [
          ...apiBills.map((bill) => ({ ...bill, isLocal: false })), // Mark API bills as synced
          ...prevBills,
        ]);
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const addBill = useCallback((newBill: Bill) => {
    const newBillWithLocalFlag = { ...newBill, isLocal: true };
    setBills((prevBills) => {
      const updatedBills = [...prevBills, newBillWithLocalFlag];
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
            const updatedBills = prevBills.map((b) =>
              b.id === bill.id ? { ...b, isLocal: false } : b
            );
            saveToLocalStorage(
              LOCAL_STORAGE_KEY,
              updatedBills.filter((b) => b.isLocal)
            ); // Only save unsynced bills
            return updatedBills;
          });
        } catch (error) {
          console.error(`Failed to sync bill with ID ${bill.id}:`, error);
          failedBills.push(bill);
        }
      }

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
        bill.id === updatedBill.id
          ? { ...updatedBill, isLocal: bill.isLocal }
          : bill
      );
      saveToLocalStorage(
        LOCAL_STORAGE_KEY,
        updatedBills.filter((b) => b.isLocal)
      );
      return updatedBills;
    });
  }, []);

  const deleteBill = useCallback((id: string) => {
    setBills((prevBills) => {
      const updatedBills = prevBills.filter((bill) => bill.id !== id);
      saveToLocalStorage(
        LOCAL_STORAGE_KEY,
        updatedBills.filter((b) => b.isLocal)
      );
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
