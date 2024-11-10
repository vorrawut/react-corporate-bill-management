export interface Bill {
  id: string;
  vendorName: string;
  description: string;
  invoiceNumber: string;
  billDate: string; // or Date if working with Date objects
  dueDate: string; // or Date
  amount: number;
  currency: string;
  status: "Pending" | "Paid" | "Overdue";
  paymentDate?: string; // or Date, optional for flexibility
  notes?: string; // optional field for additional notes
  type: string;
  isLocal: boolean;
}
