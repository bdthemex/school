import { NextResponse } from 'next/server';
import Papa from 'papaparse';
import sheetUrls from '@/data/sheets.json';

type SheetName = keyof typeof sheetUrls;

const cache = new Map<string, { data: any[], timestamp: number }>();
const CACHE_DURATION = 300 * 1000; // 5 minutes in milliseconds

async function fetchAndParseCSV(url: string, sheetName: SheetName): Promise<any[]> {
    const cached = cache.get(sheetName);
    if (cached && (Date.now() - cached.timestamp < CACHE_DURATION)) {
        return cached.data;
    }

    try {
        const response = await fetch(url, { next: { revalidate: 300 } });
        if (!response.ok) {
            throw new Error(`Failed to fetch CSV from ${url}. Status: ${response.status}`);
        }
        const csvText = await response.text();
        
        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    cache.set(sheetName, { data: results.data, timestamp: Date.now() });
                    resolve(results.data);
                },
                error: (error: any) => {
                    console.error('Error parsing CSV:', error);
                    reject(error);
                }
            });
        });
    } catch (error) {
        console.error(`Error fetching or parsing sheet "${sheetName}":`, error);
        return []; // Return empty array on error
    }
}


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') as SheetName | null;

  if (!name || !(name in sheetUrls)) {
    return NextResponse.json({ error: 'Invalid sheet name provided.' }, { status: 400 });
  }
  
  const url = sheetUrls[name];
  if (!url || url.includes('URL_TO_YOUR')) {
    console.warn(`Sheet URL for "${name}" is not configured in sheets.json.`);
    return NextResponse.json([]);
  }

  const data = await fetchAndParseCSV(url, name);
  return NextResponse.json(data);
}
