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
  
  export type Cost = {
    month: string;
    cost: number;
  };


  export type DataPurchase = {
    month: string;
    cost: number;
    invest: number;
    utility: number;
  }
  export type = PurchaseByCategory{
    count: number;
    name: string;
  }
  
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
 
  export type ProductsTable = {
    id: string;
    name: string;
    noitem: string;
    status: string;
    count_available: number;
    count_sold: number;
    count_incoming: number;
    investment_dollar: number;
    unit_price_purchase: number;
    sum_price_purchaseq: number;
    cost_shipping_us: number;
    cost_shipping_gt: number;
    cost_shipping_unit_total: number;
    purchase_price: number;
    profit_percentage: number;
    sale_price: number;
    utility: number;
    box: string;
    categories : string;
    updated_date: string;
    picture: string;
    create_date: string;
  }

  export type PurchasesTable={
    id: string;
    name: string;
    noitem: string;
    qty: number;
    price: number;
    investment_dollar: number;
    images: string;
    box_id: string;
    create_date: string;
    updated_date: string;
  }

  export type SalesTable={
    id: string;
    id_shipping: string;
    noitem: string;
    qty: number;
    price: number;
    discount: number;
    total: number;
    status: string;
    create_date: string;

  }

  export type BoxField = {
    id: string;
    box_id: string;
    status: string;
  };
  
  export type ProductsField = {
  noitem: string;
  name: string;
  images: string;
  category: string;
  price: string;
  };

  export type CategoryField = {
    id: string;
    name: string;
  };

  export type OrdennoField = {
    ordenno: number;
  }


  export type DepartamentField = {
     departamento: string;
     municipio: string;
     zonas: string
  }

  
  export type BoxForm = {
    id: string;
    box_id: string;
    delivery_date: string; 
    cost: number;
    status: 'filling' | 'paid' | 'intransit' | 'delivered';
  };

  export type ShippingForm = {
    id: string;
    client_id: string;
    shipping_cost: number;
    status: 'backordered' | 'paid' | 'intransit' | 'delivered';
    updated_date: string; 

  }
  
  export type CategoryForm = {
    id: string;
    name: string;
    description: string;
    status: bool;
    ordenno: number;
    parentid: string;
    picture: string;
    create_date: string;

  };

  export type PurchasesForm={
    id: string;
    name: string;
    noitem: string;
    qty: number;
    price: number;
    investment_dollar: number;
    images: string;
    box_id: string;
    create_date: string;
    updated_date: string;
  }


  export type SaleForm={
    id: string;
    id_shipping: string;
    noitem: string;
    qty: number;
    price: number;
    discount: number;
    total: number;
    create_date: string;
    updated_date: string;

  }

