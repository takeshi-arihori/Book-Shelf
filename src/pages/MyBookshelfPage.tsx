import { useState, useEffect } from 'react';
import { useAuthContext } from '../store/contexts/AuthContext';
import { getBookshelf } from '../api/bookshelfApi';
import { Link, useNavigate } from 'react-router-dom';

// Bookの型を定義
interface Book {
  id: number;
  google_books_id: string;
  title: string;
  authors: string[];
  thumbnail: string;
  created_at: string;
}

export function MyBookshelfPage() {
  const { session } = useAuthContext();
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      navigate('/login');
      return;
    }

    const fetchBooks = async () => {
      if (session.user) {
        try {
          setLoading(true);
          const bookshelfData = await getBookshelf(session.user.id);
          setBooks(bookshelfData);
        } catch (error) {
          console.error('Failed to fetch bookshelf:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBooks();
  }, [session, navigate]);

  return (
    <div className="panel rounded-2xl shadow-lg flex flex-col h-full">
      <header className="p-6 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">マイ本棚</h2>
          <Link to="/" className="text-sm text-blue-400 hover:underline">検索に戻る</Link>
        </div>
      </header>
      <div className="flex-grow p-6 overflow-y-auto custom-scrollbar">
        {loading ? (
          <p className="text-gray-500 text-center py-8">読み込み中...</p>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {books.map((book) => (
              <Link to={`/book/${book.google_books_id}`} key={book.id} className="group">
                <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out transform group-hover:scale-105">
                  <img
                    src={book.thumbnail || 'https://via.placeholder.com/128x192?text=No+Image'}
                    alt={book.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-white truncate group-hover:whitespace-normal">{book.title}</h3>
                    <p className="text-xs text-gray-400 mt-1 truncate group-hover:whitespace-normal">{book.authors?.join(', ')}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">本棚は空です。</p>
        )}
      </div>
    </div>
  );
}
