import { sql } from '@vercel/postgres';
import {
  CategoriesField,
  OrdennoField,
  BoxField,
  BoxForm,
  CategoryForm,
  ShippingForm,
  ClientForm,
  BoxesTable,
  CategoriesTable,
  ProductsTable,
  PurchasesTable,
  SalesTable,
  LatestBoxRaw,
  User,
  Cost,
  PurchaseByCategory,
  DataPurchase,
  ProductsField,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchCost() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching cost data...');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = await sql<Cost>`select *
    from(
    select sum(cost) cost, TO_CHAR(delivery_date, 'Monthyyyy') AS month,  delivery_date
    from boxes
    where  delivery_date >= CURRENT_DATE-360
    group by TO_CHAR(delivery_date, 'Monthyyyy') , delivery_date
    )
    order by delivery_date  asc `;
 
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch cost data.');
  }
}


export async function fetchBoxPurchase() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching cost data...');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = await sql<DataPurchase>`select *
    from(
    select sum(b.cost) cost, 
   TO_CHAR(b.delivery_date, 'mm-yyyy') AS month,  
   delivery_date,
   (select sum(investment_dollar) AS invest from purchases where box_id = b.id) AS invest, 
   (select sum(totalutilitybyp) AS invest from purchases where box_id = b.id) AS utility, 
    id
    from boxes b
    where  b.delivery_date >= CURRENT_DATE-360
    group by  delivery_date, id
    )
    order by delivery_date  asc ;`;
    
    console.log(data.rows)
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch cost data.');
  }
}

export async function fetchCountCategory(){
    // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching count category data...');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = await sql<Cost>`select *
    from(
    select count(*) count, TO_CHAR(create_date, 'Monthyyyy') AS month,  create_date
    from categories
    where  create_date >= CURRENT_DATE-360
    group by TO_CHAR(create_date, 'Monthyyyy') , create_date
    )
    order by create_date  asc `;
 
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch count category  data.');
  }
}

export async function fetchCategoriesbyPurchase(){
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching Categories by Purchase data...');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = await sql<PurchaseByCategory>`select sum(1) count, C.name
    from categories C
    join purchases P
    on C.id = P.category
    group by C.name
`;
 return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Categories by Purchase data.');
  }
}

export async function fetchCategoriesbyUtility(){
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching fetchCategoriesbyPurchase data...');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = await sql<PurchaseByCategory>`select sum(totalutilitybyp) count, C.name
    from categories C
    join purchases P
    on C.id = P.category
    group by C.name
`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch fetchCategoriesbyPurchase data.');
  }
}

export async function fetchLatestBoxes() {
  noStore();
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const data = await sql<LatestBoxRaw>`
    select cost, box_id, status, id
    from boxes
    ORDER BY delivery_date DESC
    LIMIT 5`;



    const latestBoxes = data.rows.map((box) => ({
      ...box,
      amount: formatCurrency(box.amount),
    }));
    return latestBoxes;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest boxes.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const boxCountPromise = sql`SELECT COUNT(*) FROM boxes`;
    const boxDeliveredCountPromise = sql`SELECT COUNT(*) FROM boxes where status = 'delivered'`;
    const BoxStatusPromise = sql`
    SELECT  SUM(CASE WHEN status = 'delivered' THEN cost ELSE 0 END) AS "paid",
             SUM(CASE WHEN status != 'delivered' THEN cost ELSE 0 END) AS "pending"
    FROM boxes`;

    const data = await Promise.all([
      boxCountPromise,
      boxDeliveredCountPromise,
      BoxStatusPromise,
    ]);

    const numberOfBoxes = Number(data[0].rows[0].count ?? '0');
    const numberOfBoxesDelivered = Number(data[1].rows[0].count ?? '0');
    const totalPaidCost = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingCost = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfBoxesDelivered,
      numberOfBoxes,
      totalPaidCost,
      totalPendingCost,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchCardCategory (){
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const categoryCountPromise = sql`SELECT COUNT(*) FROM categories`;
    const categoryRootCountPromise = sql`SELECT COUNT(*) FROM categories where parentid = '0'`;
    const BoxStatusPromise = sql`
    SELECT  SUM(CASE WHEN status = 'delivered' THEN cost ELSE 0 END) AS "paid",
             SUM(CASE WHEN status != 'delivered' THEN cost ELSE 0 END) AS "pending"
    FROM boxes`;

    const data = await Promise.all([
      categoryCountPromise,
      categoryRootCountPromise,
      BoxStatusPromise,
    ]);

    const numberOfCategories = Number(data[0].rows[0].count ?? '0');
    const numberOfRootCategories = Number(data[1].rows[0].count ?? '0');
    const totalPaidCost = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingCost = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfRootCategories,
      numberOfCategories,
      totalPaidCost,
      totalPendingCost,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }

}


  export async function fetchCardPurchase (
    query: string,
  ){
    noStore();
    try {
      var SumInvest = ''
      var SumUtility = ''
      var QtyPurchase = ''
console.log(query.length)
 if(query.length > 0){
  console.log('entro')
      SumInvest = sql`select sum(costotal) from purchases where box_id = (select id from boxes where box_id = ${`${query}`})`
      SumUtility = sql`select sum(totalutilitybyp) from purchases where box_id = (select id from boxes where box_id = ${`${query}`})`
      QtyPurchase = sql`select sum(qty) from purchases where box_id = (select id from boxes where box_id = ${`${query}`})`
      }else{
        console.log('no entro')
         SumInvest = sql`select sum(costotal) from purchases`
         SumUtility = sql`select sum(totalutilitybyp) from purchases`
         QtyPurchase = sql`select sum(qty) from purchases`
      }



      const BoxStatusPromise = sql`
      SELECT  SUM(CASE WHEN status = 'delivered' THEN cost ELSE 0 END) AS "paid",
               SUM(CASE WHEN status != 'delivered' THEN cost ELSE 0 END) AS "pending"
      FROM boxes`;

      const data = await Promise.all([
        SumInvest,
        SumUtility,
        QtyPurchase,
      ]);
   

      const suminvestment = Number(data[0].rows[0].sum ?? '0');
      const sumutility = Number(data[1].rows[0].sum ?? '0');
      const qty = Number(data[2].rows[0].sum ?? '0');
      //const totalPendingCost = Number(data[2].rows[0].pending ?? '0');
  
      return {
        sumutility,
        suminvestment,
        qty,
        
      };
    } catch (error) {
      console.log(error);

    }
  
  }

const ITEMS_PER_PAGE = 10;
export async function fetchFilteredBoxes(
  query: string,
  currentPage: number,
 ) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const boxes = await sql<BoxesTable>`
      SELECT
      boxes.id,
      boxes.box_id,
      boxes.cost,
      boxes.status,
      boxes.delivery_date
      FROM boxes
      WHERE
      boxes.box_id ILIKE ${`%${query}%`} OR
      boxes.cost::text ILIKE ${`%${query}%`} OR
      boxes.status ILIKE ${`%${query}%`} OR
      boxes.delivery_date::text ILIKE ${`%${query}%`} 
      ORDER BY boxes.delivery_date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return boxes.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch boxes.');
  }
}


export async function fetchFilteredCategories(
  query: string,
  currentPage: number,
 ) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const categories = await sql<CategoriesTable>`
      SELECT
      categories.id,
      categories.name,
      categories.description,
      categories.status,
      categories.ordenno,
      categories.parentid,
      categories.picture,
      categories.create_date,
      categories.status,
      categories.updated_date
      FROM categories
      WHERE
      categories.name ILIKE ${`%${query}%`} OR
      categories.status::TEXT ILIKE ${`%${query}%`} OR
      categories.create_date::text ILIKE ${`%${query}%`} 
      ORDER BY categories.ordenno asc
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return categories.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch categories.');
  }
}

export async function fetchFilteredSales(
  query: string,
  currentPage: number,
 ) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const sales = await sql<SalesTable>`
    select 
    S.id, 
    S.id_shipping, 
    S.noitem, 
    S.qty, 
    S.price, 
    S.discount, 
    S.total, 
    S.create_date, 
    SH.status
    from SALES S
    join SHIPPINGS SH
    on SH.id = S.id_shipping
      WHERE
      S.noitem ILIKE ${`%${query}%`} OR
      SH.status ILIKE ${`%${query}%`} OR
      S.create_date::text ILIKE ${`%${query}%`} 
      ORDER BY S.create_date asc
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return sales.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch sales.');
  }
}

export async function fetchFilteredProducts( 
  query: string,
  currentPage: number,
 ) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const products = await sql<ProductsTable>`
      SELECT
      products.id,
      products.name,
      products.noitem,
      products.status,
      products.count_available,
      products.count_sold,
      products.count_incoming,
      products.investment_dollar,
      products.unit_price_purchase,
      products.sum_price_purchaseq,
      products.cost_shipping_us,
      products.cost_shipping_gt,
      products.cost_shipping_unit_total,
      products.purchase_price,
      products.profit_percentage,
      products.sale_price,
      products.utility,
      products.box,
      products.categories,
      products.updated_date,
      products.picture,
      products.create_date
      FROM products
      WHERE
      products.name ILIKE ${`%${query}%`} OR
      products.status::TEXT ILIKE ${`%${query}%`} OR
      products.create_date::text ILIKE ${`%${query}%`} 
      ORDER BY products.name asc
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return products.rows;
  } catch (error) {
    console.log(error)
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products.');
  }
}

export async function fetchFilteredPurchases ( query: string,
  currentPage: number,
 ) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const purchases = await sql<PurchasesTable>`
      SELECT
      purchases.id,
      purchases.name,
      purchases.noitem,
      purchases.qty,
      purchases.cost,
      purchases.investment_dollar,
      purchases.images,
      (select box_id from boxes where id = purchases.box_id) box_id,
      purchases.costotal,
      purchases.costshipus,
      purchases.costshippinggt,
      purchases.costtotalbypurchase,
      purchases.costsaleuq,
      purchases.mu,
      purchases.pricesaleuq,
      purchases.utility,
      purchases.totalutilitybyp,
      purchases.costtotalshippingu,
      purchases.create_date,
      purchases.updated_date
      FROM purchases
      JOIN boxes
      on purchases.box_id = boxes.id
      WHERE
      boxes.box_id::TEXT ILIKE ${`%${query}%`} OR
      purchases.noitem::TEXT ILIKE ${`%${query}%`} OR
      purchases.create_date::text ILIKE ${`%${query}%`} 
      ORDER BY purchases.name asc
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return purchases.rows;
  } catch (error) {
    console.log(error)
    console.error('Database Error:', error);
    throw new Error('Failed to fetch purchases.');
  }

}
export async function fetchFilteredClient(query: string,
  currentPage: number,
  ) {
   noStore();
   const offset = (currentPage - 1) * ITEMS_PER_PAGE;
   try {
     const clients = await sql<PurchasesTable>`
       SELECT
       id,
       name,
       address,
       depto,
       city,
       zone,
       phone,
       create_date
       FROM clients
       WHERE
       clients.id::TEXT ILIKE ${`%${query}%`} OR
       clients.name::TEXT ILIKE ${`%${query}%`} OR
       clients.address::TEXT ILIKE ${`%${query}%`} OR
       clients.depto::TEXT ILIKE ${`%${query}%`} OR
       clients.city::TEXT ILIKE ${`%${query}%`} OR
       clients.zone::TEXT ILIKE ${`%${query}%`} OR
       clients.phone::text ILIKE ${`%${query}%`} 
       ORDER BY clients.name asc
       LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
     `;
 
     return clients.rows;
   } catch (error) {
     console.log(error)
     console.error('Database Error:', error);
     throw new Error('Failed to fetch clients.');
   }
}
export async function fetchFilteredShippings(query: string,
  currentPage: number,
  ) {
   noStore();
   const offset = (currentPage - 1) * ITEMS_PER_PAGE;
   try {
     const shippings = await sql<PurchasesTable>`
       SELECT
       id,
       client_id,
       shipping_cost,
       status,
       create_date,
       updated_date
       FROM shippings
       WHERE
       shippings.id::TEXT ILIKE ${`%${query}%`} OR
       shippings.client_id::TEXT ILIKE ${`%${query}%`} OR
       shippings.status::TEXT ILIKE ${`%${query}%`} 
       ORDER BY shippings.client_id asc
       LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
     `;
 
     return shippings.rows;
   } catch (error) {
     console.log(error)
     console.error('Database Error:', error);
     throw new Error('Failed to fetch shippings.');
   }
}

export async function fetchBoxesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM boxes
    WHERE
      boxes.box_id ILIKE ${`%${query}%`} OR
      boxes.cost::text ILIKE ${`%${query}%`} OR
      boxes.status ILIKE ${`%${query}%`} OR
      boxes.delivery_date::text ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of boxes.');
  }
}

export async function fetchBoxById(id: string) {
  noStore();
  try {
    const data = await sql<BoxForm>`
      SELECT
        boxes.id,
        boxes.box_id,
        boxes.cost,     
        boxes.status,
        boxes.delivery_date
      FROM boxes
      WHERE boxes.id = ${id};
    `;

    const box = data.rows.map((box) => ({
      ...box,
      // Convert amount from cents to dollars
      cost: box.cost / 100,
    }));
    
    return box[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch box.');
  }
}

export async function fetchCategoryById(id: string) {
  noStore();
  try {
    const data = await sql<CategoryForm>`
      SELECT
      categories.id,
        categories.name,
        categories.description,     
        categories.status,
        categories.ordenno,
        categories.parentid,
        categories.picture,
        categories.create_date
      FROM categories
      WHERE categories.id = ${id};
    `;

    const category = data.rows.map((category) => ({
      ...category,
    }));
    return category[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch category.');
  }
}

export async function fetchPurchaseById(id: string) {
  noStore();
  try {
    const data = await sql<CategoryForm>`
      SELECT
      purchases.id,
      purchases.name,
        purchases.noitem,
        purchases.category,     
        purchases.qty,
        purchases.cost,
        purchases.investment_dollar,
        purchases.costshipus,
        purchases.costshippinggt,
        purchases.costtotalbypurchase,
        purchases.mu,
        purchases.pricesaleuq,
        purchases.images,
        purchases.box_id,
        purchases.create_date,
        purchases.updated_date
      FROM purchases
      WHERE purchases.id = ${id};
    `;
    

    const purchase = data.rows.map((purchase) => ({
      ...purchase,
    }));
    return purchase[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch purchase.');
  }
}

export async function fetchSaleById(id: string){
  noStore();
  try {
    const data = await sql<CategoryForm>`
      SELECT
      sales.id,
      sales.id_shipping,
      sales.noitem,
      sales.qty,
      sales.price,
      sales.discount,
      sales.total,
      sales.create_date,
      sales.updated_date
      FROM sales
      WHERE sales.id = ${id};
    `;
    

    const sale = data.rows.map((sale) => ({
      ...sale,
    }));
    return sale[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch sales.');
  }
}

export async function fetchShippingById(id: string) {
  noStore();
  try {
    const data = await sql<ShippingForm>`
      SELECT
      shippings.id,
      shippings.client_id,
      shippings.shipping_cost,     
      shippings.status,
      shippings.updated_date
      FROM shippings
      WHERE shippings.id = ${id};
    `;

    const shipping = data.rows.map((shipping) => ({
      ...shipping,
    }));
    
    return shipping[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch shipping.');
  }
}

export async function fetchClientById(id: string){
  noStore();
  try {
    const data = await sql<ClientForm>`
      SELECT
      clients.id,
      clients.name,
      clients.address,     
      clients.depto,
      clients.city,
      clients.zone,
      clients.phone
      FROM clients
      WHERE clients.id = ${id};
    `;

    const client = data.rows.map((client) => ({
      ...client,
    }));
    
    return client[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch client.');
  }
}

export async function fetchBoxes() {
  noStore();
  try {
    const data = await sql<BoxField>`
      SELECT
        id,
        box_id,
        status
      FROM boxes
      ORDER BY boxes.delivery_date desc
    `;

    const status = data.rows;

    return status;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all status.');
  }
}

export async function fetchProducts(){
  noStore();
  try {
    const data = await sql<ProductsField>`
    select 
    purchases.noitem, 
    purchases.name, 
    purchases.images, 
    (select  name from categories where id = purchases.category) category,
    purchases.pricesaleuq price
    from purchases 
    ORDER BY category asc
    `;

    const status = data.rows;

    return status;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch products.');
  } 
}

export async function fetchDepartaments(){
  noStore();
  try {
    const data = await sql<BoxField>`
    select *
    from departaments
      ORDER BY departaments.departamento desc
    `;

    const deptos = data.rows;
    
    return deptos;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all departaments.');
  }
}

export async function fetchOrdeno() {
  try {
    const data = await sql<OrdennoField>`
      SELECT
        max(ordenno)+1 ordenno
      FROM categories
    `;
    var ordenno = data.rows[0];
    return ordenno;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all OrdennoField.');
  }
}

export async function fetchCategories() {
  noStore();
  try {
    const data = await sql<CategoriesField>`
    SELECT  null as id, 'New' AS name
    UNION
    SELECT
      id, name
    FROM categories
    order by name 
    `;

    
    var status = data.rows;

    return status;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all status.');
  }
}


export async function fetchCategoriesPages(query: string){
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM categories
    WHERE
    categories.name ILIKE ${`%${query}%`} OR
    categories.description ILIKE ${`%${query}%`} OR
    categories.status::text ILIKE ${`%${query}%`} OR
    categories.create_date::text ILIKE ${`%${query}%`}
  `;


    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of categories.');
  }
}

export async function fetchProductsPages(query: string){
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM products
    WHERE
    products.name ILIKE ${`%${query}%`} OR
    products.noitem ILIKE ${`%${query}%`} OR
    products.box ILIKE ${`%${query}%`} OR
    products.status::text ILIKE ${`%${query}%`} OR
    products.create_date::text ILIKE ${`%${query}%`}
  `;


    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of products.');
  }
}

export async function fetchPurchasesPages(query: string){
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM purchases 
    WHERE
    purchases.box_id = (select id from boxes where box_id = ${`${query}`} )  OR
    purchases.name ILIKE ${`%${query}%`} OR
    purchases.noitem ILIKE ${`%${query}%`} OR
    purchases.create_date::text ILIKE ${`%${query}%`}
  `;
 console.log(count)

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of purchases.');
  }
}


export async function fetchSalesPages(query: string){
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM SALES S
    join SHIPPINGS SH
    on SH.id = S.id_shipping
    WHERE
    S.id::text  ILIKE ${`%${query}%`} OR
    SH.status ILIKE ${`%${query}%`} OR
    S.noitem ILIKE ${`%${query}%`} OR
    S.create_date::text ILIKE ${`%${query}%`}
  `;
 console.log(count)

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of sales.');
  }
}

export async function fetchClientPages(query: string){
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM CLIENTS
    WHERE
    CLIENTS.id::text  ILIKE ${`%${query}%`} OR
    CLIENTS.name::text ILIKE ${`%${query}%`} 
  `;


    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of clients.');
  }
}