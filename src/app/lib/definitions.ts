// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  };
  
  export type Customer = {
    id: string;
    name: string;
    email: string;
    image_url: string;
  };
  
  export type Box = {
    id: string;
    box_id: string;
    delivery_date: string;
    cost: number;
    status: 'pending' | 'paid' | 'inprogress' | 'delivery';
  };
  
  export type Revenue = {
    month: string;
    revenue: number;
  };
  
  export type LatestInvoice = {
    id: string;
    name: string;
    image_url: string;
    email: string;
    amount: string;
  };
  
  // The database returns a number for amount, but we later format it to a string with the formatCurrency function
  export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
    amount: number;
  };
  
  export type BoxesTable = {
    id: string;
    box_id: string;
    delivery_date: string;
    cost: number;
    status: 'pending' | 'paid' | 'inprogress' | 'delivery';
  };
  
  export type CustomersTableType = {
    id: string;
    name: string;
    email: string;
    image_url: string;
    total_invoices: number;
    total_pending: number;
    total_paid: number;
  };
  
  export type FormattedCustomersTable = {
    id: string;
    name: string;
    email: string;
    image_url: string;
    total_invoices: number;
    total_pending: string;
    total_paid: string;
  };
  
  export type BoxField = {
    id: string;
    box_id: string;
  };
  
  export type BoxForm = {
    id: string;
    box_id: string;
    cost: number;
    status: 'pending' | 'paid' | 'inprogress' | 'delivery';
  };
  