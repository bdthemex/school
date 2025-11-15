'use client';

// This function is intended to be used on the client-side
export function buildNestedNav(data: any[]): any[] {
    const navItems: any = {};
    const childItems: any[] = [];

    if (!Array.isArray(data)) {
        console.error("buildNestedNav expects an array, but received:", data);
        return [];
    }

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
