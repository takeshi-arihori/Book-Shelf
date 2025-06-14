import api from './index';
import type { OrderRequest, OrderResponse } from '../types/api';

export const createOrder = async (order: OrderRequest): Promise<OrderResponse> => {
    const { data } = await api.post<OrderResponse>('/orders', order);
    return data;
};

export const fetchOrders = async (): Promise<OrderResponse[]> => {
    const { data } = await api.get<OrderResponse[]>('/orders');
    return data;
};
