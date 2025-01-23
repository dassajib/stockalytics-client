export interface ItemInterface {
    id: string;
    name: string;
    description: string;
    uom: string;
    category: string;
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
