'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  box_id: z.string({
    invalid_type_error: 'Please select a box.',
  }),
  cost: z.coerce.number().gt(0, { message: 'Please enter a cost greater than $0.' }),
  status: z.enum(['pending', 'paid', 'inprogress', 'delivery'],{
    invalid_type_error: 'Please select an box status.',
  }),
  delivery_date: z.string(),
});

const UpdateBox = FormSchema.omit({ id: true, box_id: true, delivery_date: true });

export type State = {
  errors?: {
    cost?: string[];
    status?: string[];
  };
  message?: string | null;
};


export async function updateBox(id: string, prevState: State, formData: FormData) {

  const validatedFields = UpdateBox.safeParse({
  cost: formData.get('cost'),
  status: formData.get('status'),
 });

 
 if (!validatedFields.success) {
   return {
     errors: validatedFields.error.flatten().fieldErrors,
     message: 'Missing Fields. Failed to Update Box.',
   };
 }
 
   const {  cost, status } = validatedFields.data;
   const costInCents = cost * 100;

   console.log(costInCents)
   console.log(status)
   try {
   await sql`
     UPDATE boxes
     SET cost = ${costInCents}, status = ${status}
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