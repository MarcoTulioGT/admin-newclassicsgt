'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { floatToNumber} from '@/app/lib/utils';

const FormSchema = z.object({
  id: z.string(),
  box_id: z.string({
    invalid_type_error: 'Please select a box.',
  }),
  cost: z.coerce.number().gt(0, { message: 'Please enter a cost greater than $0.' }),
  status: z.enum(['filling', 'paid', 'intransit', 'delivered'],{
    invalid_type_error: 'Please select an box status.',
  }),
  delivery_date: z.string(),
});

const FormSchemaCategory = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  status: z.string(),
  ordenno: z.coerce.number(),
  parentid: z.string(),
  picture: z.string(),
  //create_date: z.string(),
});


const FormSchemaPurchase =z.object({
id: z.string(),
noitem: z.string(),
box_id: z.string(),
name: z.string(),
category:  z.string(),
qty: z.coerce.number().gt(0, { message: 'Please enter a qty greater or equal 0.' }),
investment_dollar: z.coerce.number().gt(0, { message: 'Please enter a cost greater than $0.' }),
cost: z.coerce.number().gt(0, { message: 'Please enter a cost greater than $0.' }),
costotal: z.coerce.number().gt(0, { message: 'Please enter a cost greater than $0.' }),
costshipUS: z.coerce.number().gt(0, { message: 'Please enter a cost greater than $0.' }),
costShippingGT: z.coerce.number().gt(0, { message: 'Please enter a cost greater than $0.' }),
costtotalshippingU: z.coerce.number().gt(0, { message: 'Please enter a cost greater than $0.' }),
costtotalbypurchase: z.coerce.number().gt(0, { message: 'Please enter a cost greater than $0.' }),
costsaleuq: z.coerce.number().gt(0, { message: 'Please enter a cost greater than $0.' }),
mu: z.coerce.number().gt(-100, { message: 'Please enter a mu greater or equal 0.' }),
pricesaleuq: z.coerce.number().gt(0, { message: 'Please enter a qty greater or equal 0.' }),
utility: z.coerce.number().gt(-100, { message: 'Please enter a utility greater or equal 0.' }),
totalutilitybyp: z.coerce.number().gt(-1000, { message: 'Please enter a totalutilitybyp greater or equal 0.' }),
images: z.string(),
});

const FormSchemaSale =z.object({
  id: z.string(),
  clientid: z.string(),
  name: z.string(),
  address: z.string(),
  depto: z.string(),
  city: z.string(),
  zone: z.string(),
  phone: z.string(),
  id_shipping: z.string(),
  noitem: z.string(),
  shipping_cost: z.string(),
  qty: z.coerce.number().gt(0, { message: 'Please enter a qty greater or equal 0.' }),
  price: z.coerce.number().gt(0, { message: 'Please enter a price greater than $0.' }),
  discount: z.coerce.number().gt(-1, { message: 'Please enter a discount greater than $0.' }),
  total: z.coerce.number().gt(0, { message: 'Please enter a total greater than $0.' }),
  status: z.string(),
  create_date: z.string(),
});


const FormSchemaShipping = z.object({
  id: z.string(),
  client_id: z.string(),
  shipping_cost: z.coerce.number(),
  status: z.string(),
  create_date: z.coerce.number(),
  updated_date: z.string(),
});


const FormSchemaClient = z.object({
  id: z.string(),
  name: z.string(),
  address: z.coerce.string(),
  depto: z.string(),
  city: z.string(),
  zone: z.string(),
  phone: z.string(),
});

const CreateBox = FormSchema.omit({ id: true, box_id: true  });
const UpdateBox = FormSchema.omit({ id: true, box_id: true });

const CreateCategory = FormSchemaCategory.omit({ id: true });
const UpdateCategory = FormSchemaCategory.omit({ id: true, parentid: true});

const CreatePurchase = FormSchemaPurchase.omit({ id: true });
const UpdatePurchase = FormSchemaPurchase.omit({ id: true, images: true});

const CreateSale = FormSchemaSale.omit({id: true, create_date: true, status: true, id_shipping: true, clientid: true});
const UpdateSale = FormSchemaSale.omit({id: true, name: true, address: true, depto: true, city: true, zone: true, phone: true, shipping_cost: true, id_shipping: true, noitem: true, create_date: true, status: true, clientid: true});

const CreateShipping = FormSchemaShipping.omit({ id: true, box_id: true  });
const UpdateShipping = FormSchemaShipping.omit({ id: true, client_id: true, create_date: true, updated_date: true });

const UpdateClient = FormSchemaClient.omit({ id: true });

const CreateSaleWClient = FormSchemaSale.omit({ id: true, name: true, depto: true, city: true, zone: true, address: true, status: true, id_shipping: true, create_date:true, phone:true});

export type State = {
  errors?: {
    cost?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createBox(prevState: State, formData: FormData) {
  // Validate form using Zod
    const validatedFields = CreateBox.safeParse({
    cost: formData.get('cost'),
    delivery_date: formData.get('delivery_date'),
    status: formData.get('status'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Box.',
    };
  }
    
     // Prepare data for insertion into the database
    const { delivery_date, cost, status } = validatedFields.data;
    const amountInCents = cost * 100;
    const created_date = new Date(delivery_date)
    const yyyy = created_date.getFullYear();
    let mm = created_date.getMonth() + 1; // Months start at 0!
    let dd = created_date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const name_box_id = 'box_'+dd+mm+yyyy
    try {
    await sql`
    INSERT INTO boxes (box_id, cost, status, delivery_date)
    VALUES (${name_box_id}, ${amountInCents}, ${status}, ${delivery_date})
  `;
    } catch (error){
      return {
        message: 'Database Error: Failed to Create Box.',
      };
    }

  // Revalidate the cache for the boxes page and redirect the user.
  revalidatePath('/ui/dashboard/boxes');
  redirect('/ui/dashboard/boxes');
}

export async function updateBox(id: string, prevState: State, formData: FormData) {

  const validatedFields = UpdateBox.safeParse({
  cost: formData.get('cost'),
  delivery_date: formData.get('delivery_date'),
  status: formData.get('status'),
 });

 
 if (!validatedFields.success) {
   return {
     errors: validatedFields.error.flatten().fieldErrors,
     message: 'Missing Fields. Failed to Update Box.',
   };
 }
 
   const {  cost, delivery_date, status } = validatedFields.data;
   const costInCents = cost * 100;
   const created_date = new Date(delivery_date)
   const yyyy = created_date.getFullYear();
   let mm = created_date.getMonth() + 1; // Months start at 0!
   let dd = created_date.getDate();

   if (dd < 10) dd = '0' + dd;
   if (mm < 10) mm = '0' + mm;

   const name_box_id = 'box_'+dd+mm+yyyy


   try {
   await sql`
     UPDATE boxes
     SET cost = ${costInCents}, delivery_date = ${delivery_date}, status = ${status}, box_id =${name_box_id}
     WHERE id = ${id}
   `;
   }catch (error){

     return { message: 'Database Error: Failed to Update Box.'};
   }
  
   revalidatePath('/ui/dashboard/boxes');
   redirect('/ui/dashboard/boxes');
}


export async function updateCategory(id: string, prevState: State, formData: FormData) {

  const validatedFields = UpdateCategory.safeParse({
  ordenno: formData.get('ordenno'),
  name: formData.get('name'),
  description: formData.get('description'),
  picture: formData.get('picture'),
  status: formData.get('status'),
 });

 
 if (!validatedFields.success) {
   return {
     errors: validatedFields.error.flatten().fieldErrors,
     message: 'Missing Fields. Failed to Update Category.',
   };
 }
 
   const { ordenno, name, description, picture, status } = validatedFields.data;
   const order = Number(ordenno);
 
   try {
   await sql`
     UPDATE categories
     SET ordenno = ${order}, name = ${name}, description = ${description}, picture = ${picture}, status= ${status}, updated_date = current_date
     WHERE id = ${id}
   `;
   }catch (error){

     return { message: 'Database Error: Failed to Update Category.'};
   }
  
   revalidatePath('/ui/dashboard/categories');
   redirect('/ui/dashboard/categories');
}

export async function updatePurchase(id: string, prevState: State, formData: FormData) {


 console.log(formData)
 // Validate form using Zod
   const validatedFields = UpdatePurchase.safeParse({
   noitem: formData.get("noitem"),
   box_id: formData.get("box_id"),
   name: formData.get('name'),
   category: formData.get('category'),
   qty: formData.get('qty'),
   investment_dollar: formData.get('investment_dollar'),
   cost: formData.get('cost'),
   costotal: formData.get('costotal'),
   costshipUS: formData.get('costshipUS'),
   costShippingGT: formData.get('costShippingGT'),
   costtotalshippingU: formData.get('costtotalshippingU'),
   costtotalbypurchase: formData.get('costtotalbypurchase'),
   costsaleuq: formData.get('costsaleuq'),
   mu: formData.get('mu'),
   pricesaleuq: formData.get('pricesaleuq'),
   utility: formData.get('utility'),
   totalutilitybyp: formData.get('totalutilitybyp'),
  });

 if (!validatedFields.success) {
   return {
     errors: validatedFields.error.flatten().fieldErrors,
     message: 'Missing Fields. Failed to Update Purchase.',
   };
 }
 
   const { noitem, box_id, name, category, qty, investment_dollar, cost, costotal, costshipUS, costShippingGT,
            costtotalshippingU, costtotalbypurchase, costsaleuq, mu, pricesaleuq, utility, totalutilitybyp  } = validatedFields.data;

 
   try {
   await sql`
     UPDATE purchases
     SET 
     noitem = ${noitem},
     box_id = ${box_id}, 
     name = ${name}, 
     category= ${category},
     qty = ${qty}, 
     investment_dollar= ${floatToNumber(investment_dollar)},
     cost= ${floatToNumber(cost)}, 
     costotal= ${floatToNumber(costotal)}, 
     costshipUS = ${floatToNumber(costshipUS)},
     costShippingGT = ${floatToNumber(costShippingGT)},
     costtotalshippingU = ${floatToNumber(costtotalshippingU)},
     costtotalbypurchase = ${floatToNumber(costtotalbypurchase)},
     costsaleuq = ${floatToNumber(costsaleuq)},
     mu = ${mu},
     pricesaleuq = ${floatToNumber(pricesaleuq)},
     utility = ${floatToNumber(utility)},
     totalutilitybyp =  ${floatToNumber(totalutilitybyp)},
     updated_date = current_date
     WHERE id = ${id}
   `;
   }catch (error){
     console.log(error)
     return { message: 'Database Error: Failed to Update Purchase.'};
   }
  
   revalidatePath('/ui/dashboard/purchases');
   redirect('/ui/dashboard/purchases');
}

export async function updateSale(id: string, prevState: State, formData: FormData) {

  const validatedFields = UpdateSale.safeParse({
    qty: formData.get('qty'),
    price: formData.get('price'),
    discount: formData.get('discount'),
    total: formData.get('total'),
 });

 
 if (!validatedFields.success) {
  console.log(validatedFields.error.flatten().fieldErrors)
   return {
     errors: validatedFields.error.flatten().fieldErrors,
     message: 'Missing Fields. Failed to Update sales.',
   };
 }
 
   const {  qty, price, discount, total } = validatedFields.data; 
   try {
   await sql`
     UPDATE sales
     SET qty = ${qty}, price = ${price*100}, discount = ${discount*100}, total =${total*100}, updated_date = current_date
     WHERE id = ${id}
   `;
   }catch (error){
    console.log(error)
     return { message: 'Database Error: Failed to Update sales.'};
   }
  
   revalidatePath('/ui/dashboard/sales');
   redirect('/ui/dashboard/sales');
}


export async function updateShipping(id: string, prevState: State, formData: FormData) {

  const validatedFields = UpdateShipping.safeParse({
    shipping_cost: formData.get('shipping_cost'),
    status: formData.get('status'),
 });
 
 if (!validatedFields.success) {
  console.log(validatedFields.error.flatten().fieldErrors)
   return {
     errors: validatedFields.error.flatten().fieldErrors,
     message: 'Missing Fields. Failed to updateShipping.',
   };
 }
 
   const {  shipping_cost , status} = validatedFields.data; 
   try {
   await sql`
     UPDATE shippings
     SET shipping_cost = ${shipping_cost*100}, status = ${status}, updated_date = current_date
     WHERE id = ${id}
   `;
   }catch (error){
    console.log(error)
     return { message: 'Database Error: Failed to updateShipping.'};
   }
  
   revalidatePath('/ui/dashboard/shippings');
   redirect('/ui/dashboard/shippings');
}

export async function updateClient(id: string, prevState: State, formData: FormData) {

  const validatedFields = UpdateClient.safeParse({
    name: formData.get('name'),
    address: formData.get('address'),
    depto: formData.get('depto'),
    city: formData.get('city'),
    zone: formData.get('zone'),
    phone: formData.get('phone'),
 });

 if (!validatedFields.success) {
  console.log(validatedFields.error.flatten().fieldErrors)
   return {
     errors: validatedFields.error.flatten().fieldErrors,
     message: 'Missing Fields. Failed to update clients.',
   };
 }
 
   const {  name , address, depto, city, zone, phone} = validatedFields.data; 
   try {
   await sql`
     UPDATE clients
     SET name = ${name}, address = ${address}, depto = ${depto}, city = ${city}, zone = ${zone}, phone = ${phone},  updated_date = current_date
     WHERE id = ${id}
   `;
   }catch (error){
    console.log(error)
     return { message: 'Database Error: Failed to update clients.'};
   }
  
   revalidatePath('/ui/dashboard/clients');
   redirect('/ui/dashboard/clients');
}

export async function deleteBox(id: string) {
    //throw new Error('Failed to Delete Box');

    try{
    await sql`DELETE FROM boxes WHERE id = ${id}`;
    revalidatePath('/ui/dashboard/boxes');
    return { message: 'Deleted Box'};
    }catch (error){
      return { message: 'Database Error: Failed to Delete Box.'};
    }
}

export async function deleteCategory(id: string) {
  //throw new Error('Failed to Delete Category');

  try{
  await sql`DELETE FROM categories WHERE id = ${id}`;
  revalidatePath('/ui/dashboard/categories');
  return { message: 'Deleted Category'};
  }catch (error){
    return { message: 'Database Error: Failed to Delete Category.'};
  }
}

export async function deletePurchase(id: string) {
  //throw new Error('Failed to Delete Purchase');

  try{
  await sql`DELETE FROM purchases WHERE id = ${id}`;
  revalidatePath('/ui/dashboard/purchases');
  return { message: 'Deleted Purchase'};
  }catch (error){
    return { message: 'Database Error: Failed to Delete Purchase.'};
  }
}

export async function deleteSale(id: string) {
  //throw new Error('Failed to Delete Box');

  try{
  await sql`DELETE FROM sales WHERE id = ${id}`;
  revalidatePath('/ui/dashboard/sales');
  return { message: 'Deleted Sale'};
  }catch (error){
    return { message: 'Database Error: Failed to Delete Sale.'};
  }
}

export async function deleteShipping(id: string) {
  //throw new Error('Failed to Delete Shipping');

  try{
  await sql`DELETE FROM shippings WHERE id = ${id}`;
  revalidatePath('/ui/dashboard/shipping');
  return { message: 'Deleted Shipping'};
  }catch (error){
    return { message: 'Database Error: Failed to Delete Shipping.'};
  }
}


export async function  deleteClient(id: string) {
  //throw new Error('Failed to Delete Shipping');

  try{
  await sql`DELETE FROM clients WHERE id = ${id}`;
  revalidatePath('/ui/dashboard/clients');
  return { message: 'Deleted client'};
  }catch (error){
    return { message: 'Database Error: Failed to Delete Client.'};
  }
}

export async function createCategory(prevState: State, formData: FormData) {

    // Validate form using Zod
    const validatedFields = CreateCategory.safeParse({
      name: formData.get('name'),
      description: formData.get('description'),
      status: formData.get('status'),
      ordenno: formData.get('ordenno'),
      parentid: formData.get('parentid'),
      picture: formData.get('picture'),
      });
  
      // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Category.',
      };
    }
      
       // Prepare data for insertion into the database
      const { name, description, status, ordenno, parentid, picture } = validatedFields.data;

      try {
      await sql`
      INSERT INTO categories (name, description, status, ordenno, parentid, picture)
      VALUES (${name}, ${description}, ${status}, ${ordenno}, ${parentid}, ${picture})
      ON CONFLICT (id) DO NOTHING
    `;
      } catch (error){
        console.log(error)
        return {
          message: 'Database Error: Failed to Create Category.',
        };
      }
  
    // Revalidate the cache for the categories page and redirect the user.
    revalidatePath('/ui/dashboard/categories');
    redirect('/ui/dashboard/categories');
}


export async function createPurchase(prevState: State, formData: FormData) {
   console.log(formData)
  // Validate form using Zod
    const validatedFields = CreatePurchase.safeParse({
    noitem: formData.get("noitem"),
    box_id: formData.get("box_id"),
    name: formData.get('name'),
    category: formData.get('category'),
    qty: formData.get('qty'),
    investment_dollar: formData.get('investment_dollar'),
    cost: formData.get('cost'),
    costotal: formData.get('costotal'),
    costshipUS: formData.get('costshipUS'),
    costShippingGT: formData.get('costShippingGT'),
    costtotalshippingU: formData.get('costtotalshippingU'),
    costtotalbypurchase: formData.get('costtotalbypurchase'),
    costsaleuq: formData.get('costsaleuq'),
    mu: formData.get('mu'),
    pricesaleuq: formData.get('pricesaleuq'),
    utility: formData.get('utility'),
    totalutilitybyp: formData.get('totalutilitybyp'),
    images: formData.get('image1')
    });

    // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create purchase.',
    };
  }
    
     // Prepare data for insertion into the database
    const { noitem, box_id, name, category, qty, investment_dollar, cost, costotal, costshipUS, costShippingGT, 
            costtotalshippingU, costtotalbypurchase, costsaleuq, mu, pricesaleuq, utility, totalutilitybyp, images} = validatedFields.data;
    console.log(cost)
    try {
    await sql`
    INSERT INTO purchases (noitem, box_id, name, category, qty, investment_dollar, cost, costotal, costshipUS, costShippingGT, 
      costtotalshippingU, costtotalbypurchase, costsaleuq, mu, pricesaleuq, utility, totalutilitybyp, images)
    VALUES (${noitem}, ${box_id}, ${name}, ${category}, ${qty}, ${floatToNumber(investment_dollar)}, ${floatToNumber(cost)}, ${floatToNumber(costotal)},
            ${floatToNumber(costshipUS)}, ${floatToNumber(costShippingGT)}, ${floatToNumber(costtotalshippingU)}, 
            ${floatToNumber(costtotalbypurchase)}, ${floatToNumber(costsaleuq)}, ${mu}, ${floatToNumber(pricesaleuq)}, ${floatToNumber(utility)},
             ${floatToNumber(totalutilitybyp)},
            ARRAY [${images}])
    ON CONFLICT (id) DO NOTHING
  `;
    } catch (error){
      console.log(error)
      return {
        message: 'Database Error: Failed to Create Purchase.',
      };
    }

  // Revalidate the cache for the categories page and redirect the user.
  revalidatePath('/ui/dashboard/purchases');
  redirect('/ui/dashboard/purchases');
}

export async function createSale(prevState: State, formData: FormData) {
  console.log(formData)
    const validatedFields = CreateSale.safeParse({
    name: formData.get("client"),
    address: formData.get("address"),
    depto: formData.get('depto'),
    city: formData.get('municipio'),
    zone: formData.get('zona'),
    phone: formData.get('phone'),
    shipping_cost: formData.get('shipcost'),
    noitem: formData.get('product'),
    qty: formData.get('qty'),
    price: formData.get('price'),
    discount: formData.get('discount'),
    total: formData.get('total')
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
    //console.log(validatedFields.error.flatten().fieldErrors)
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Sales.',
      };
  }
    
     // Prepare data for insertion into the database
    const { name, address, depto, city, zone, phone, shipping_cost, noitem, qty, price, discount, total} = validatedFields.data;
    try {
    const id_client = await sql`
    INSERT INTO clients (name, address, depto, city, zone, phone)
    VALUES (${name}, ${address}, ${depto}, ${city}, ${zone}, ${phone})
    RETURNING id ;
  `;
    const id_shipping = await sql`
    INSERT INTO shippings (client_id, shipping_cost, status)
    VALUES (${id_client.rows[0].id}, ${floatToNumber(shipping_cost)}, 'backordered')
    RETURNING id ;
  `;
    console.log(id_shipping)
    const id_sale = await sql`
    INSERT INTO sales (id_shipping, noitem, qty, price, discount, total )
    VALUES (${id_shipping.rows[0].id}, ${noitem}, ${qty}, ${floatToNumber(price)}, ${floatToNumber(discount)}, ${floatToNumber(total)})
    RETURNING id ;
    `;
    } catch (error){
      return {
        message: 'Database Error: Failed to Create Sales.',
      };
    }

  // Revalidate the cache for the categories page and redirect the user.
  revalidatePath('/ui/dashboard/sales');
  redirect('/ui/dashboard/sales');
}

export async function createSaleWClient(prevState: State, formData: FormData) {
  console.log(formData)
    const validatedFields = CreateSaleWClient.safeParse({
    clientid: formData.get('clientid'),
    shipping_cost: formData.get('shipcost'),
    noitem: formData.get('product'),
    qty: formData.get('qty'),
    price: formData.get('price'),
    discount: formData.get('discount'),
    total: formData.get('total')
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
    //console.log(validatedFields.error.flatten().fieldErrors)
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Sales W Clients.',
      };
  }
    
     // Prepare data for insertion into the database
    const { clientid, shipping_cost, noitem, qty, price, discount, total} = validatedFields.data;

    console.log(clientid)
    console.log(shipping_cost)
    console.log(noitem)
    console.log(discount)
    console.log(qty)
    console.log(total)
    try {
    const id_shipping = await sql`
    INSERT INTO shippings (client_id, shipping_cost, status)
    VALUES (${clientid}, ${floatToNumber(shipping_cost)}, 'backordered')
    RETURNING id ;
  `;
    console.log(id_shipping)
    const id_sale = await sql`
    INSERT INTO sales (id_shipping, noitem, qty, price, discount, total )
    VALUES (${id_shipping.rows[0].id}, ${noitem}, ${qty}, ${floatToNumber(price)}, ${floatToNumber(discount)}, ${floatToNumber(total)})
    RETURNING id ;
    `;
    } catch (error){
      return {
        message: 'Database Error: Failed to Create Sales W client.',
      };
    }

  // Revalidate the cache for the categories page and redirect the user.
  revalidatePath('/ui/dashboard/sales');
  redirect('/ui/dashboard/sales');
}



export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}