export type OrderRequest = {
    product: string;
    quantity: number;
};

export type OrderResponse = {
    id: string;
    product: string;
    quantity: number;
    status: string;
};
