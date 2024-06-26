import { sql } from '@vercel/postgres';
import {
  CategoriesField,
  OrdennoField,
  BoxField,
  BoxForm,
  CategoryForm,
  BoxesTable,
  CategoriesTable,
  ProductsTable,
  PurchasesTable,
  LatestBoxRaw,
  User,
  Cost,
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
      purchases.price,
      purchases.investment_dollar,
      purchases.images,
      purchases.box_id,
      purchases.create_date,
      purchases.updated_date
      FROM purchases
      WHERE
      purchases.name ILIKE ${`%${query}%`} OR
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
        purchases.qty,
        purchases.price,
        purchases.investment_dollar,
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

export async function fetchBoxes() {
  try {
    const data = await sql<BoxField>`
      SELECT
        id,
        box_id
      FROM boxes
      ORDER BY box_id ASC
    `;

    const status = data.rows;

    return status;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all status.');
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
    purchases.name ILIKE ${`%${query}%`} OR
    purchases.noitem ILIKE ${`%${query}%`} OR
    purchases.box_id ILIKE ${`%${query}%`} OR
    purchases.create_date::text ILIKE ${`%${query}%`}
  `;


    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of purchases.');
  }
}


