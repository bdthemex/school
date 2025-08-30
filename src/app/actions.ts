// src/app/actions.ts
'use server'

import { sanityWriteClient } from '@/lib/sanity.server'
import { demoData } from '@/lib/demo-data'
import { revalidatePath } from 'next/cache'

// Helper to prevent duplicate imports
async function documentExists(id: string) {
  try {
    const doc = await sanityWriteClient.fetch(`*[_id == $id][0]`, { id });
    return !!doc;
  } catch (error) {
    console.error(`Error checking document existence for ID ${id}:`, error);
    return false;
  }
}

export async function importDemoData() {
  try {
    const transaction = sanityWriteClient.transaction();
    let createdCount = 0;

    for (const doc of demoData) {
        // Skip image assets as they need to be uploaded, not created as documents
        if (doc._type === 'sanity.imageAsset') continue;

        // Sanity IDs must not have dots and cannot start with 'drafts.'
        const sanitizedId = doc._id.replace(/^drafts\./, '').replace(/\./g, '-');
        
        const docWithSanitizedId = { ...doc, _id: sanitizedId };
        
        const exists = await documentExists(sanitizedId);
        if (!exists) {
            transaction.createOrReplace(docWithSanitizedId);
            createdCount++;
        }
    }
    
    if (createdCount === 0) {
        return { success: true, message: 'সমস্ত ডেমো কনটেন্ট আগে থেকেই যোগ করা আছে।' };
    }

    await transaction.commit({ returnDocuments: false });

    // Revalidate all paths to show new content
    revalidatePath('/', 'layout')

    return { success: true, message: `${createdCount}টি ডেমো কনটেন্ট সফলভাবে যোগ করা হয়েছে।` };
  } catch (error) {
    console.error('Error importing demo data to Sanity:', error);
    let errorMessage = 'ডেমো কনটেন্ট যোগ করতে সমস্যা হয়েছে।';
    if (error instanceof Error) {
        // Provide a more specific error message if available
        if ('details' in error && typeof (error as any).details === 'object' && (error as any).details !== null) {
            errorMessage = (error as any).details.description || errorMessage;
        } else {
            errorMessage = error.message;
        }
    }
    return { success: false, message: `ত্রুটি: ${errorMessage}` };
  }
}
