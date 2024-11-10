const BILL_ANALYTICS_PREFIX = "bill_analytics.";

export const BillAnalyticsConstants = {
  pending: `${BILL_ANALYTICS_PREFIX}pending`,
  paid: `${BILL_ANALYTICS_PREFIX}paid`,
  overdue: `${BILL_ANALYTICS_PREFIX}overdue`,
  numberOfBills: `${BILL_ANALYTICS_PREFIX}numberOfBills`,
  billStatusAnalytics: `${BILL_ANALYTICS_PREFIX}billStatusAnalytics`,
  billStatusDistribution: `${BILL_ANALYTICS_PREFIX}billStatusDistribution`,
};

// Mapping status keys to translation keys for maintainability
export const BILL_STATUS_TRANSLATION_MAP = {
  Pending: BillAnalyticsConstants.pending,
  Paid: BillAnalyticsConstants.paid,
  Overdue: BillAnalyticsConstants.overdue,
};
