import { formatInvoiceSummary, type Invoice } from "@repo/shared-types";

const upcomingInvoice: Invoice = {
  id: "2024-0003",
  customerName: "Padaria Santa Rita",
  dueDate: "2025-03-02",
  totalAmount: 512.75,
  status: "pending",
};

export const renderInvoicePreview = (): string =>
  formatInvoiceSummary(upcomingInvoice);

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(renderInvoicePreview());
}
