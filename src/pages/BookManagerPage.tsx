
export const BookManagerPage = () => (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 h-screen">
            {/* 左パネル: 検索と結果 */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg flex flex-col h-full">
                <header className="p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-900">書籍を検索</h1>
                    <p className="text-sm text-gray-500 mt-1">Google Books APIから本を探して本棚に追加しましょう。</p>
                    <form className="mt-4 flex gap-2">
                        <input type="text" placeholder="タイトル、著者名など" className="flex-grow block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3" />
                        <button type="submit" className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">検索</button>
                    </form>
                </header>
                <div className="flex-grow p-6 overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {/* 検索結果がここに表示されます */}
                    </div>
                    <div className="hidden text-center py-10">
                        <p className="text-gray-500">検索中...</p>
                    </div>
                    <div className="text-center py-10">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">検索結果はここに表示されます</h3>
                        <p className="mt-1 text-sm text-gray-500">上の検索ボックスから本を探してください。</p>
                    </div>
                </div>
            </div>
            {/* 右パネル: マイ本棚 */}
            <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg flex flex-col h-full">
                <header className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">マイ本棚</h2>
                    <p className="text-xs text-gray-400 mt-1 truncate">User ID: N/A</p>
                </header>
                <div className="flex-grow p-6 overflow-y-auto custom-scrollbar">
                    <div className="space-y-4">
                        {/* 保存した本がここに表示されます */}
                    </div>
                    <div className="hidden text-center py-10">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">本棚は空です</h3>
                        <p className="mt-1 text-sm text-gray-500">本を検索して「保存」ボタンを押してください。</p>
                    </div>
                    <div className="hidden text-center py-10">
                        <p className="text-gray-500">本棚を読み込み中...</p>
                    </div>
                </div>
            </div>
        </div>
        {/* トースト通知用のコンテナ */}
        <div className="fixed bottom-5 right-5 z-50" />
        {/* カスタムスクロールバーやトーストアニメーションはTailwindのカスタムCSSで対応 */}
    </div>
);

export default BookManagerPage; 
