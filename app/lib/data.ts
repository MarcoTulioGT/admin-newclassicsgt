import { sql } from '@vercel/postgres';
import {
  BoxField,
  CustomersTableType,
  InvoiceForm,
  BoxesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = await sql<Revenue>`select *
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
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestBoxes() {
  noStore();
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const data = await sql<LatestInvoiceRaw>`
    select cost, box_id, status, id
    from boxes
    ORDER BY delivery_date DESC
    LIMIT 5`;



    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
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
    const data = await sql<InvoiceForm>`
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