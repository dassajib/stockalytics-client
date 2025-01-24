export interface ItemInterface {
    id: string;
    name: string;
    description: string;
    uom: any;
    category: any;
    uomId?: string;
    categoryId?: string;
}

export interface UpdateItemInterface {
    id: string;
    data: {
        name: string;
        uom: string;
        category: string;
    };
}
