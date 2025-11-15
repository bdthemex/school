import { NextResponse } from 'next/server';
import Papa from 'papaparse';
import sheetUrls from '@/data/sheets.json';

type SheetName = keyof typeof sheetUrls;

async function fetchAndParseCSV(url: string): Promise<any[]> {
    try {
        // Use `no-store` to ensure fresh data on every request.
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`Failed to fetch CSV from ${url}. Status: ${response.status}`);
        }
        const csvText = await response.text();
        
        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    resolve(results.data);
                },
                error: (error: any) => {
                    console.error('Error parsing CSV:', error);
                    reject(error);
                }
            });
        });
    } catch (error) {
        console.error(`Error fetching or parsing sheet:`, error);
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

  const data = await fetchAndParseCSV(url);
  return NextResponse.json(data);
}
