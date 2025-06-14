import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { searchBooks } from '../../api/bookApi';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { SearchContext } from '../../store/contexts/SearchContext';

export const BookSearch = () => {
    const searchContext = useContext(SearchContext);
    if (!searchContext) {
        throw new Error('SearchContext must be used within a SearchProvider');
    }
    const { searchQuery, setSearchQuery, searchResults, setSearchResults } = searchContext;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setLoading(true);
        setError(null);
        setSearchResults([]);

        try {
            console.log('検索クエリ:', searchQuery);
            const response = await searchBooks({ query: searchQuery });
            console.log('APIレスポンス:', response);
            setSearchResults(response.items || []);
        } catch (err) {
            console.error('検索エラーの詳細:', err);
            setError('本の検索に失敗しました');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="panel rounded-2xl shadow-lg flex flex-col h-full">
            <form onSubmit={handleSearch} className="p-6 border-b border-gray-700">
                <div className="flex gap-3">
                    <Input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="タイトル、著者名..."
                        className="search-input w-full rounded-md p-2 text-white"
                    />
                    <Button
                        type="submit"
                        disabled={loading}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg"
                    >
                        {loading ? '...' : '検索'}
                    </Button>
                </div>
            </form>

            {error && (
                <div className="m-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg">
                    {error}
                </div>
            )}

            <div className="flex-grow p-6 overflow-y-auto custom-scrollbar">
                {loading ? (
                    <div className="text-center py-10"><p>検索中...</p></div>
                ) : searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {searchResults.map((book) => (
                            <Link
                                to={`/book/${book.id}`}
                                key={book.id}
                                className="book-card p-4 rounded-lg cursor-pointer flex flex-col items-center text-center"
                            >
                                {book.volumeInfo.imageLinks?.thumbnail ? (
                                    <img
                                        src={book.volumeInfo.imageLinks.thumbnail}
                                        alt={book.volumeInfo.title}
                                        className="w-32 h-48 object-cover rounded shadow-lg mb-3"
                                    />
                                ) : (
                                    <div className="w-32 h-48 flex items-center justify-center bg-gray-800 rounded shadow-lg mb-3">
                                        <span className="text-gray-500">No Image</span>
                                    </div>
                                )}
                                <h4 className="font-semibold text-sm text-white flex-grow">
                                    {book.volumeInfo.title}
                                </h4>
                                {book.volumeInfo.authors && (
                                    <p className="text-xs text-gray-400 mt-1">
                                        {book.volumeInfo.authors.join(', ')}
                                    </p>
                                )}
                            </Link>
                        ))}
                    </div>
                ) : (
                    searchQuery && !error && (
                        <div className="text-center py-10">
                            <p>検索結果が見つかりませんでした。</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};
