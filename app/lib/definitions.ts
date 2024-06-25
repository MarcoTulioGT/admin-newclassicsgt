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
  

  
  export type Box = {
    id: string;
    box_id: string;
    delivery_date: string;
    cost: number;
    status: 'filling' | 'paid' | 'intransit' | 'delivered';
  };
  
  export type Revenue = {
    month: string;
    cost: number;
  };
  
  export type LatestBox = {
    id: string;
    box_id: string;
    status: string;
    cost: string;
  };
  
  // The database returns a number for amount, but we later format it to a string with the formatCurrency function
  export type LatestBoxRaw = Omit<LatestBox, 'cost'> & {
    cost: number;
  };
  
  export type BoxesTable = {
    id: string;
    box_id: string;
    delivery_date: string;
    cost: number;
    status: 'filling' | 'paid' | 'intransit' | 'delivered';
  };
  
  export type CategoriesTable = {
    id: string;
    name: string;
    description: string;
    status: string;
    ordenno: number;
    parentid: :string;
    picture: string;
    create_date: string;
  }

  export type BoxField = {
    id: string;
    box_id: string;
  };
  

  export type CategoriesField = {
    id: string;
    name: string;
  }
  
  export type BoxForm = {
    id: string;
    box_id: string;
    delivery_date: string; 
    cost: number;
    status: 'filling' | 'paid' | 'intransit' | 'delivered';
  };
  