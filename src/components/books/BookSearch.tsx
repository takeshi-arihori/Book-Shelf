import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchBooks } from '../../api/bookApi';
import { addBookToBookshelf, removeBookFromBookshelf, checkIfBookExists } from '../../api/bookshelfApi';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { SearchContext } from '../../store/contexts/SearchContext';
import { useAuthContext } from '../../store/contexts/AuthContext';
import { useToast } from '../../store/contexts/ToastContext';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail?: string;
    };
  };
}

export const BookSearch = () => {
    const searchContext = useContext(SearchContext);
    const { session } = useAuthContext();
    const { showToast } = useToast();
    const navigate = useNavigate();

    if (!searchContext) {
        throw new Error('SearchContext must be used within a SearchProvider');
    }
    const { searchQuery, setSearchQuery, searchResults, setSearchResults } = searchContext as {
        searchQuery: string;
        setSearchQuery: (query: string) => void;
        searchResults: Book[];
        setSearchResults: (results: Book[]) => void;
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [bookshelfStatus, setBookshelfStatus] = useState<{[key: string]: boolean}>({});

    useEffect(() => {
        const checkBookshelfStatus = async () => {
            if (!session || searchResults.length === 0) return;
            
            const status: {[key: string]: boolean} = {};
            for (const book of searchResults) {
                const exists = await checkIfBookExists(session.user.id, book.id);
                status[book.id] = exists;
            }
            setBookshelfStatus(status);
        };
        checkBookshelfStatus();
    }, [searchResults, session]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setLoading(true);
        setError(null);
        setSearchResults([]);
        setBookshelfStatus({});

        try {
            const response = await searchBooks({ query: searchQuery });
            setSearchResults(response.items || []);
        } catch (err) {
            console.error('Search failed:', err);
            setError('本の検索に失敗しました');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleBookshelf = async (book: Book) => {
        if (!session) {
            showToast('ログインが必要です', 'error');
            navigate('/login');
            return;
        }

        const bookId = book.id;
        const isBookInBookshelf = bookshelfStatus[bookId];

        try {
            if (isBookInBookshelf) {
                await removeBookFromBookshelf(session.user.id, bookId);
                showToast('本棚から削除しました', 'success');
            } else {
                const bookData = {
                    google_books_id: bookId,
                    title: book.volumeInfo.title,
                    authors: book.volumeInfo.authors || [],
                    thumbnail: book.volumeInfo.imageLinks?.thumbnail || '',
                    user_id: session.user.id,
                };
                await addBookToBookshelf(bookData);
                showToast('本棚に追加しました', 'success');
            }
            setBookshelfStatus(prev => ({ ...prev, [bookId]: !isBookInBookshelf }));
        } catch (error) {
            console.error('Toggle bookshelf failed:', error);
            showToast('処理に失敗しました', 'error');
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
                        className="search-input w-full rounded-md p-2 text-white flex-grow"
                    />
                    <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg">
                        {loading ? '...' : '検索'}
                    </Button>
                </div>
            </form>

            {error && <div className="m-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg">{error}</div>}

            <div className="flex-grow p-6 overflow-y-auto custom-scrollbar">
                {loading ? (
                    <div className="text-center py-10"><p>検索中...</p></div>
                ) : searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {searchResults.map((book) => (
                            <div key={book.id} className="book-card p-4 rounded-lg flex flex-col items-center text-center">
                                <Link to={`/book/${book.id}`} className="flex flex-col items-center text-center">
                                    {book.volumeInfo.imageLinks?.thumbnail ? (
                                        <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} className="w-32 h-48 object-cover rounded shadow-lg mb-3" />
                                    ) : (
                                        <div className="w-32 h-48 flex items-center justify-center bg-gray-800 rounded shadow-lg mb-3">
                                            <span className="text-gray-500">No Image</span>
                                        </div>
                                    )}
                                    <h4 className="font-semibold text-sm text-white flex-grow">{book.volumeInfo.title}</h4>
                                    {book.volumeInfo.authors && <p className="text-xs text-gray-400 mt-1">{book.volumeInfo.authors.join(', ')}</p>}
                                </Link>
                                <Button
                                    onClick={() => handleToggleBookshelf(book)}
                                    className={`mt-4 w-full ${bookshelfStatus[book.id] ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded`}
                                >
                                    {bookshelfStatus[book.id] ? '追加済み' : '追加'}
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    searchQuery && !error && <div className="text-center py-10"><p>検索結果が見つかりませんでした。</p></div>
                )}
            </div>
        </div>
    );
};
