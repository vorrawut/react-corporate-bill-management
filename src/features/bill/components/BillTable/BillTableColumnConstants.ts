const BILL_TABLE_COLUMN_PREFIX = "bill_table_column.";

export const BillTableColumnConstants = {
  billId: `${BILL_TABLE_COLUMN_PREFIX}billId`,
  vendorName: `${BILL_TABLE_COLUMN_PREFIX}vendorName`,
  typeOfBill: `${BILL_TABLE_COLUMN_PREFIX}typeOfBill`,
  description: `${BILL_TABLE_COLUMN_PREFIX}description`,
  invoiceNumber: `${BILL_TABLE_COLUMN_PREFIX}invoiceNumber`,
  billDate: `${BILL_TABLE_COLUMN_PREFIX}billDate`,
  dueDate: `${BILL_TABLE_COLUMN_PREFIX}dueDate`,
  amount: `${BILL_TABLE_COLUMN_PREFIX}amount`,
  currency: `${BILL_TABLE_COLUMN_PREFIX}currency`,
  status: `${BILL_TABLE_COLUMN_PREFIX}status`,
  pending: `${BILL_TABLE_COLUMN_PREFIX}pending`,
  paid: `${BILL_TABLE_COLUMN_PREFIX}paid`,
  overdue: `${BILL_TABLE_COLUMN_PREFIX}overdue`,
  actions: `${BILL_TABLE_COLUMN_PREFIX}actions`,
  editBill: `${BILL_TABLE_COLUMN_PREFIX}editBill`,
  deleteBill: `${BILL_TABLE_COLUMN_PREFIX}deleteBill`,
  deleteConfirmation: `${BILL_TABLE_COLUMN_PREFIX}deleteConfirmation`,
  yes: `${BILL_TABLE_COLUMN_PREFIX}yes`,
  no: `${BILL_TABLE_COLUMN_PREFIX}no`,
  na: `${BILL_TABLE_COLUMN_PREFIX}na`,
};

// Map the status strings to corresponding translation keys
export const STATUS_TRANSLATION_MAP = {
  pending: BillTableColumnConstants.pending,
  paid: BillTableColumnConstants.paid,
  overdue: BillTableColumnConstants.overdue,
};
