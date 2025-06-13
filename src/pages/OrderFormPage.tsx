import React from 'react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const OrderFormPage = () => (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">注文フォーム</h2>
        <form>
            <Input type="text" placeholder="商品名" className="mb-2 w-full" />
            <Input type="number" placeholder="数量" className="mb-2 w-full" />
            <Button type="submit" className="w-full">注文する</Button>
        </form>
    </div>
);
