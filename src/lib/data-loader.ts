import Papa from 'papaparse';
import sheetUrls from '@/data/sheets.json';

type SheetName = keyof typeof sheetUrls;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002';

async function fetchAndParseFromApi(name: SheetName): Promise<any[]> {
    try {
        const apiUrl = `${BASE_URL}/api/sheets?name=${name}`;
        // Using `cache: 'no-store'` is crucial for dynamic pages on Vercel/Next.js
        // to ensure they re-fetch data on each request and don't serve stale build-time data.
        const response = await fetch(apiUrl, { cache: 'no-store' }); 
        
        if (!response.ok) {
            console.error(`Failed to fetch from API for sheet "${name}". Status: ${response.status}`);
            return [];
        }
        
        const data = await response.json();
        return data;

    } catch (error) {
        console.error(`Error fetching or parsing sheet "${name}" from API:`, error);
        return []; // Return empty array on error to prevent site crash
    }
}


export async function getSheetData(name: SheetName): Promise<any[]> {
    const url = sheetUrls[name];
    if (!url || url.includes('URL_TO_YOUR')) {
        console.warn(`Sheet URL for "${name}" is not configured in sheets.json.`);
        return [];
    }
    // All data fetching now goes through our internal API route
    return fetchAndParseFromApi(name);
}

// Specific data transformation helpers
export function objectify(data: any[], keyField: string = 'key') {
    if (!Array.isArray(data)) return {};
    return data.reduce((acc, item) => {
        if (item && item[keyField]) {
            acc[item[keyField]] = item.value;
        }
        return acc;
    }, {});
}

export function buildNestedNav(data: any[]): any[] {
    const navItems: any = {};
    const childItems: any[] = [];

    if (!Array.isArray(data)) {
        return [];
    }

    data.forEach(item => {
        if (item && !item.parent_key) {
            navItems[item.key] = {
                _key: item.key,
                label: item.label,
                href: item.href || undefined,
                children: []
            };
        } else if (item) {
            childItems.push(item);
        }
    });

    childItems.forEach(item => {
        if (item && navItems[item.parent_key]) {
            navItems[item.parent_key].children.push({
                _key: item.key,
                label: item.label,
                href: item.href,
            });
        }
    });
    
    return Object.values(navItems).map((item: any) => {
        if (item.children.length === 0) {
            delete item.children;
        }
        return item;
    });
}
