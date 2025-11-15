import Papa from 'papaparse';
import sheetUrls from '@/data/sheets.json';

type SheetName = keyof typeof sheetUrls;

const cache = new Map<string, any>();

async function fetchAndParseCSV(url: string): Promise<any[]> {
    if (cache.has(url)) {
        return cache.get(url);
    }

    try {
        const response = await fetch(url, { next: { revalidate: 300 } }); // Revalidate every 5 minutes
        if (!response.ok) {
            throw new Error(`Failed to fetch CSV from ${url}. Status: ${response.status}`);
        }
        const csvText = await response.text();
        
        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    cache.set(url, results.data);
                    resolve(results.data);
                },
                error: (error: any) => {
                    console.error('Error parsing CSV:', error);
                    reject(error);
                }
            });
        });
    } catch (error) {
        console.error('Error fetching or parsing sheet:', error);
        return []; // Return empty array on error to prevent site crash
    }
}

export async function getSheetData(name: SheetName): Promise<any[]> {
    const url = sheetUrls[name];
    if (!url || url.includes('URL_TO_YOUR')) {
        console.warn(`Sheet URL for "${name}" is not configured in sheets.json.`);
        return [];
    }
    return fetchAndParseCSV(url);
}

// Specific data transformation helpers
export function objectify(data: any[], keyField: string = 'key') {
    return data.reduce((acc, item) => {
        if (item[keyField]) {
            acc[item[keyField]] = item.value;
        }
        return acc;
    }, {});
}

export function buildNestedNav(data: any[]): any[] {
    const navItems: any = {};
    const childItems: any[] = [];

    data.forEach(item => {
        if (!item.parent_key) {
            navItems[item.key] = {
                _key: item.key,
                label: item.label,
                href: item.href || undefined,
                children: []
            };
        } else {
            childItems.push(item);
        }
    });

    childItems.forEach(item => {
        if (navItems[item.parent_key]) {
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
