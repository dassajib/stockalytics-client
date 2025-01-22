export interface ItemInterface {
    id: string;
    name: string;
    description: string;
    uom: string | { id: string; name: string };
    category: string | { id: string; name: string };
    uomId?: string;
    categoryId?: string;
}

export interface UpdateItemInterface {
    id: string;
    data: {
        name: string;
        uomId: string;
        categoryId: string;
    };
}
