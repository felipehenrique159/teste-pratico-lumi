import CustomerInvoice from "./InvoiceCustomer";

export default interface Invoice {
  id: number,
  customerInvoice: CustomerInvoice,
  filename: string,
  month_reference: string,
  path: string
}
