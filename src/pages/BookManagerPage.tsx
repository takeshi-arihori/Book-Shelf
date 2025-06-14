
import { BookSearch } from '../components/books/BookSearch';

export const BookManagerPage = () => (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-900 p-6">書籍管理</h1>
        <div className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 h-screen">
            {/* 左パネル: 検索と結果 */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg flex flex-col h-full">
                <BookSearch />
            </div>
        </div>
        {/* トースト通知用のコンテナ */}
        <div className="fixed bottom-5 right-5 z-50" />
        {/* カスタムスクロールバーやトーストアニメーションはTailwindのカスタムCSSで対応 */}
    </div>
);

export default BookManagerPage; 
