import Papa from 'papaparse';
import sheetUrls from '@/data/sheets.json';

type SheetName = keyof typeof sheetUrls;

async function fetchAndParseCSV(url: string): Promise<any[]> {
    try {
        // Use `revalidate: 0` to ensure fresh data on every request, bypassing any cache.
        const response = await fetch(url, { next: { revalidate: 0 } });
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
