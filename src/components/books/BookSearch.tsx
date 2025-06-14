import React, { useState } from 'react';
import { searchBooks } from '../../api/bookApi';
import type { Book } from '../../api/bookApi';

export const BookSearch = () => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError(null);

        try {
            console.log('検索クエリ:', query);
            const response = await searchBooks({ query });
            console.log('APIレスポンス:', response);
            setBooks(response.items);
        } catch (err) {
            console.error('検索エラーの詳細:', err);
            setError('本の検索に失敗しました');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <form onSubmit={handleSearch} className="mb-8">
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="本のタイトルや著者名を入力"
                        className="flex-1 px-4 py-2 border-2 border-[#475569] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4338ca] text-[#0f172a] placeholder-[#64748b]"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-[#4338ca] text-white rounded-lg hover:bg-[#3730a3] focus:outline-none focus:ring-2 focus:ring-[#4338ca] disabled:opacity-50 font-semibold"
                    >
                        {loading ? '検索中...' : '検索'}
                    </button>
                </div>
            </form>

            {error && (
                <div className="mb-4 p-4 bg-[#fee2e2] border-2 border-[#ef4444] text-[#b91c1c] rounded-lg font-medium">
                    {error}
                </div>
            )}

            {!loading && books.length === 0 && query && (
                <div className="text-center py-8 text-[#334155] font-medium">
                    検索結果が見つかりませんでした。別のキーワードで試してみてください。
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                    <div
                        key={book.id}
                        className="bg-white rounded-lg shadow-strong p-6 hover:shadow-strong transition-shadow duration-200 border-2 border-[#e2e8f0]"
                    >
                        <div className="flex gap-4">
                            {book.volumeInfo.imageLinks?.thumbnail ? (
                                <img
                                    src={book.volumeInfo.imageLinks.thumbnail}
                                    alt={book.volumeInfo.title}
                                    className="w-24 h-36 object-cover rounded shadow-md"
                                />
                            ) : (
                                <div className="w-24 h-36 bg-[#e2e8f0] rounded flex items-center justify-center shadow-md">
                                    <span className="text-[#475569] font-medium">No Image</span>
                                </div>
                            )}
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-[#0f172a] mb-2">
                                    {book.volumeInfo.title}
                                </h3>
                                {book.volumeInfo.authors && (
                                    <p className="text-[#334155] mb-2 font-medium">
                                        著者: {book.volumeInfo.authors.join(', ')}
                                    </p>
                                )}
                                {book.volumeInfo.publishedDate && (
                                    <p className="text-[#475569] text-sm font-medium">
                                        出版日: {book.volumeInfo.publishedDate}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}; 
 