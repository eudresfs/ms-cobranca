export type PaymentStatus = "pending" | "paid" | "overdue";

export interface Invoice {
  id: string;
  customerName: string;
  dueDate: string;
  totalAmount: number;
  status: PaymentStatus;
}

export const formatInvoiceSummary = (invoice: Invoice): string => {
  const amount = invoice.totalAmount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return `${invoice.customerName} - ${amount} - vence em ${invoice.dueDate}`;
};
