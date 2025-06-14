import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBookById } from '../api/bookApi';
import { useToast } from '../store/contexts/ToastContext';
import type { Book } from '../api/bookApi';
import { useAuthContext } from '../store/contexts/AuthContext';
import { addBookToBookshelf, checkIfBookExists } from '../api/bookshelfApi';

export function BookDetailPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { session } = useAuthContext();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookAdded, setIsBookAdded] = useState(false);

  useEffect(() => {
    if (bookId) {
      const getBookDetails = async () => {
        try {
          setLoading(true);
          const bookData = await fetchBookById(bookId);
          setBook(bookData);
          setError(null);
        } catch (err) {
          setError('書籍情報の取得に失敗しました。');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      getBookDetails();
    }
  }, [bookId]);

  useEffect(() => {
    if (session?.user && bookId) {
      const checkBook = async () => {
        try {
          const exists = await checkIfBookExists(session.user.id, bookId);
          setIsBookAdded(exists);
        } catch (err) {
          console.error('Failed to check if book exists:', err);
        }
      };
      checkBook();
    }
  }, [session, bookId]);

  const handleBackToSearch = () => {
    navigate('/book-manager');
  };

  const handleAddToShelf = async () => {
    if (isBookAdded) {
      showToast('この本は既に追加されています。', 'info');
      return;
    }

    if (!session?.user) {
      showToast('本棚に追加するにはログインが必要です。', 'error');
      navigate('/login');
      return;
    }

    if (book && bookInfo) {
      const bookData = {
        google_books_id: book.id,
        title: bookInfo.title || '',
        authors: bookInfo.authors || [],
        thumbnail: bookInfo.imageLinks?.thumbnail || '',
        user_id: session.user.id,
      };
      try {
        await addBookToBookshelf(bookData);
        showToast('本棚に追加しました', 'success');
        setIsBookAdded(true);
      } catch (error) {
        console.error('Error adding book to bookshelf:', error);
        showToast('追加に失敗しました', 'error');
      }
    }
  };

  const bookInfo = book?.volumeInfo;

  return (
    <div className="panel rounded-2xl shadow-lg p-6 md:p-8">
      <div id="book-details-content">
        {loading ? (
          <p className="text-center">読み込み中...</p>
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : bookInfo ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 flex justify-center">
              <img
                src={bookInfo.imageLinks?.thumbnail || 'https://placehold.co/192x288/161b22/c9d1d9?text=No+Image'}
                alt="Cover"
                className="w-48 h-auto object-cover rounded-lg shadow-2xl"
              />
            </div>
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold text-white">{bookInfo.title || ''}</h3>
              <p className="text-lg text-gray-400 mt-2">{(bookInfo.authors || []).join(', ')}</p>
              <div className="mt-4 text-sm text-gray-500">
                <span>{bookInfo.publisher || ''}</span>
                {bookInfo.publisher && bookInfo.publishedDate && <span className="mx-2">&#8226;</span>}
                <span>{bookInfo.publishedDate || ''}</span>
                {(bookInfo.publisher || bookInfo.publishedDate) && bookInfo.pageCount && <span className="mx-2">&#8226;</span>}
                <span>{bookInfo.pageCount ? `${bookInfo.pageCount} ページ` : ''}</span>
              </div>
              <p className="text-base text-left mt-6 text-gray-300">
                {bookInfo.description || '概要はありません。'}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center">書籍が見つかりませんでした。</p>
        )}
      </div>
      <div className="mt-8 flex gap-4">
        <button id="add-to-shelf-btn" onClick={handleAddToShelf} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-lg disabled:bg-gray-600 disabled:cursor-not-allowed" disabled={isBookAdded}>{isBookAdded ? '追加済み' : '本棚に追加'}</button>
        <button id="back-to-search-btn" onClick={handleBackToSearch} className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg shadow-lg">検索に戻る</button>
      </div>
    </div>
  );
}
