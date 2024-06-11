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


const ITEMS_PER_PAGE = 6;
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
    
    console.log(box); 
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