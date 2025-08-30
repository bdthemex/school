// src/app/actions.ts
'use server'

import { sanityClient, sanityWriteClient } from '@/lib/sanity.server'
import { demoData } from '@/lib/demo-data'
import { revalidatePath } from 'next/cache'

export async function importDemoData() {
  try {
    const transaction = sanityWriteClient.transaction()
    let createdCount = 0

    // Clean up all previous demo data
    const types = new Set(demoData.map(doc => doc._type));
    for (const type of types) {
       if (type !== 'sanity.imageAsset') {
           // Don't delete settings and navigation documents, but rather update them
            const query = `*[_type == "${type}" && !(_id in ["siteSettings", "homepage", "headerNavigation", "footerLinksCol1", "footerLinksCol2"])]`
            const oldDocs = await sanityClient.fetch(query);
            for(const doc of oldDocs) {
                transaction.delete(doc._id);
            }
       }
    }


    for (const doc of demoData) {
      if (doc._type === 'sanity.imageAsset') continue

      if (doc._id) {
        transaction.createOrReplace(doc)
      } else {
        transaction.create(doc)
      }
      createdCount++
    }

    if (createdCount === 0) {
      return { success: true, message: 'যোগ করার জন্য কোনো নতুন ডেমো কনটেন্ট পাওয়া যায়নি।' }
    }

    await transaction.commit({ returnDocuments: false, autoGenerateArrayKeys: true })

    revalidatePath('/', 'layout')

    return { success: true, message: `${createdCount}টি ডেমো কনটেন্ট সফলভাবে যোগ করা হয়েছে।` }
  } catch (error) {
    console.error('Error importing demo data to Sanity:', error)
    let errorMessage = 'ডেমো কনটেন্ট যোগ করতে সমস্যা হয়েছে।'
    if (error instanceof Error) {
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

interface SearchParams {
  year: string;
  examType: string;
  class: string;
  roll: string;
}

export async function searchResult(params: SearchParams) {
    try {
        const query = `*[_type == "studentResult" && year == $year && examType == $examType && className == $class && roll == $roll][0]`
        const result = await sanityClient.fetch(query, params);
        return { success: true, data: result || null };
    } catch(error) {
        console.error("Error fetching result from Sanity:", error);
        return { success: false, message: "ফলাফল খুঁজতে গিয়ে একটি সমস্যা হয়েছে।" };
    }
}
