import { formatInvoiceSummary, type Invoice } from "@repo/shared-types";

const seedInvoices: Invoice[] = [
  {
    id: "2024-0001",
    customerName: "Cooperativa Aurora",
    dueDate: "2025-02-15",
    totalAmount: 13450.9,
    status: "pending",
  },
  {
    id: "2024-0002",
    customerName: "Mercado Central",
    dueDate: "2025-01-21",
    totalAmount: 2290.4,
    status: "overdue",
  },
];

export const listInvoiceSummaries = (): string[] =>
  seedInvoices.map(formatInvoiceSummary);

if (import.meta.url === `file://${process.argv[1]}`) {
  for (const summary of listInvoiceSummaries()) {
    console.log(summary);
  }
}
