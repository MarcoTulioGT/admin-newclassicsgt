'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

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

const CreateBox = FormSchema.omit({ id: true, box_id: true  });
const UpdateBox = FormSchema.omit({ id: true, box_id: true });

const CreateCategory = FormSchemaCategory.omit({ id: true });
const UpdateCategory = FormSchemaCategory.omit({ id: true, parentid: true});

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
    const created_date = new Date()
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


   try {
   await sql`
     UPDATE boxes
     SET cost = ${costInCents}, delivery_date = ${delivery_date}, status = ${status}
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
  //throw new Error('Failed to Delete Box');

  try{
  await sql`DELETE FROM categories WHERE id = ${id}`;
  revalidatePath('/ui/dashboard/categories');
  return { message: 'Deleted Category'};
  }catch (error){
    return { message: 'Database Error: Failed to Delete Category.'};
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