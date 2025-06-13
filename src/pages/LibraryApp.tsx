import React from 'react';
import { BookSearch } from '../components/books/BookSearch';

export const LibraryApp = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] rounded-lg p-6 mb-6 border-2 border-[#e2e8f0]">
                <h1 className="text-2xl font-bold text-[#0f172a] mb-4">📚 ライブラリ検索</h1>
                <BookSearch />
            </div>
        </div>
    );
};
