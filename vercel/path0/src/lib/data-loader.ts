import Papa from 'papaparse';
import sheetUrls from '@/data/sheets.json';

type SheetName = keyof typeof sheetUrls;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

async function fetchSheetFromApi(name: SheetName): Promise<any[]> {
    try {
        const url = `${BASE_URL}/api/sheets?name=${name}`;
        const response = await fetch(url, { cache: 'no-store' });
        
        if (!response.ok) {
            console.error(`Failed to fetch sheet "${name}" from API. Status: ${response.status}`);
            return [];
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching sheet "${name}" from API:`, error);
        return [];
    }
}

export async function getSheetData(name: SheetName): Promise<any[]> {
    return fetchSheetFromApi(name);
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
