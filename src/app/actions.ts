// src/app/actions.ts
'use server'

import { sanityClient } from '@/lib/sanity'
import { demoData } from '@/lib/demo-data'
import { revalidatePath } from 'next/cache'

// Helper to prevent duplicate imports
async function documentExists(id: string) {
  try {
    const doc = await sanityClient.fetch(`*[_id == $id][0]`, { id });
    return !!doc;
  } catch (error) {
    console.error(`Error checking document existence for ID ${id}:`, error);
    return false;
  }
}

export async function importDemoData() {
  try {
    const transaction = sanityClient.transaction();
    let createdCount = 0;

    for (const doc of demoData) {
        // Sanity IDs must not have dots
        const docId = doc._id.replace(/\./g, '-');
        const docWithSanitizedId = { ...doc, _id: docId };
        
        const exists = await documentExists(docId);
        if (!exists) {
            transaction.createOrReplace(docWithSanitizedId);
            createdCount++;
        }
    }
    
    if (createdCount === 0) {
        return { success: true, message: 'সমস্ত ডেমো কনটেন্ট আগে থেকেই যোগ করা আছে।' };
    }

    await transaction.commit();

    // Revalidate all paths to show new content
    revalidatePath('/', 'layout')

    return { success: true, message: `${createdCount}টি ডেমো কনটেন্ট সফলভাবে যোগ করা হয়েছে।` };
  } catch (error) {
    console.error('Error importing demo data to Sanity:', error);
    let errorMessage = 'ডেমো কনটেন্ট যোগ করতে সমস্যা হয়েছে।';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return { success: false, message: errorMessage };
  }
}
