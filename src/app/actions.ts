// src/app/actions.ts
'use server'

import { sanityWriteClient } from '@/lib/sanity.server'
import { demoData } from '@/lib/demo-data'
import { revalidatePath } from 'next/cache'

export async function importDemoData() {
  try {
    const transaction = sanityWriteClient.transaction()
    let createdCount = 0

    for (const doc of demoData) {
      // Skip image assets as they need to be uploaded, not created as documents
      if (doc._type === 'sanity.imageAsset') continue

      if (doc._id) {
        // Use createOrReplace for documents with a specific ID (e.g., settings, homepage)
        transaction.createOrReplace(doc)
      } else {
        // Use create for documents without a specific ID, letting Sanity generate one
        transaction.create(doc)
      }
      createdCount++
    }

    if (createdCount === 0) {
      return { success: true, message: 'যোগ করার জন্য কোনো নতুন ডেমো কনটেন্ট পাওয়া যায়নি।' }
    }

    await transaction.commit({ returnDocuments: false, autoGenerateArrayKeys: true })

    // Revalidate all paths to show new content
    revalidatePath('/', 'layout')

    return { success: true, message: `${createdCount}টি ডেমো কনটেন্ট সফলভাবে যোগ করা হয়েছে।` }
  } catch (error) {
    console.error('Error importing demo data to Sanity:', error)
    let errorMessage = 'ডেমো কনটেন্ট যোগ করতে সমস্যা হয়েছে।'
    if (error instanceof Error) {
      // Provide a more specific error message if available
      if (error.message.includes('permission')) {
        errorMessage = 'Insufficient permissions. Please check your API token in .env.local and ensure it has "Editor" rights.'
      } else if ('details' in error && typeof (error as any).details === 'object' && (error as any).details !== null) {
        errorMessage = (error as any).details.description || error.message
      } else {
        errorMessage = error.message
      }
    }
    return { success: false, message: `ত্রুটি: ${errorMessage}` }
  }
}
