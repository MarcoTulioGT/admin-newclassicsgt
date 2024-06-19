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
const CreateBox = FormSchema.omit({ id: true, box_id: true  });
const UpdateBox = FormSchema.omit({ id: true, box_id: true });

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
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
    
     // Prepare data for insertion into the database
    const { delivery_date, cost, status } = validatedFields.data;
    const amountInCents = cost * 100;
    const created_date = new Date()
    console.log(created_date)
    const yyyy = created_date.getFullYear();
    let mm = created_date.getMonth() + 1; // Months start at 0!
    let dd = created_date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const name_box_id = 'box_'+dd+mm+yyyy
    console.log(name_box_id)
    try {
    await sql`
    INSERT INTO boxes (box_id, cost, status, delivery_date)
    VALUES (${name_box_id}, ${amountInCents}, ${status}, ${delivery_date})
  `;
    } catch (error){
      console.log(error)
      return {
        message: 'Database Error: Failed to Create Box.',
      };
    }

  // Revalidate the cache for the invoices page and redirect the user.
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
   console.log(delivery_date)

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

export async function deleteBox(id: string) {
    //throw new Error('Failed to Delete Invoice');

    try{
    await sql`DELETE FROM boxes WHERE id = ${id}`;
    revalidatePath('/ui/dashboard/boxes');
    return { message: 'Deleted Box'};
    }catch (error){
      return { message: 'Database Error: Failed to Delete Box.'};
    }
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