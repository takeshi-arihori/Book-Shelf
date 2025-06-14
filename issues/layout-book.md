<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Book API マネージャー</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
        /* スクロールバーのスタイル */
        .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f5f9; /* gray-100 */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #94a3b8; /* gray-400 */
            border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #64748b; /* gray-500 */
        }
        /* トースト通知のアニメーション */
        @keyframes toast-in {
            from {
                transform: translateY(100%);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        @keyframes toast-out {
            from {
                transform: translateY(0);
                opacity: 1;
            }
            to {
                transform: translateY(100%);
                opacity: 0;
            }
        }
        .toast {
            animation: toast-in 0.3s ease-out forwards;
        }
        .toast.hide {
            animation: toast-out 0.3s ease-in forwards;
        }
    </style>
</head>
<body class="bg-gray-100 text-gray-800">

    <div id="app" class="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 h-screen">

        <!-- 左パネル: 検索と結果 -->
        <div class="lg:col-span-2 bg-white rounded-2xl shadow-lg flex flex-col h-full">
            <header class="p-6 border-b border-gray-200">
                <h1 class="text-2xl font-bold text-gray-900">書籍を検索</h1>
                <p class="text-sm text-gray-500 mt-1">Google Books APIから本を探して本棚に追加しましょう。</p>
                <form id="search-form" class="mt-4 flex gap-2">
                    <input type="text" id="search-input" placeholder="タイトル、著者名など" class="flex-grow block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3">
                    <button type="submit" class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">検索</button>
                </form>
            </header>
            <div id="search-results-container" class="flex-grow p-6 overflow-y-auto custom-scrollbar">
                <div id="search-results" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <!-- 検索結果がここに表示されます -->
                </div>
                <div id="loader" class="hidden text-center py-10">
                    <p class="text-gray-500">検索中...</p>
                </div>
                <div id="empty-search-state" class="text-center py-10">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                    <h3 class="mt-2 text-sm font-medium text-gray-900">検索結果はここに表示されます</h3>
                    <p class="mt-1 text-sm text-gray-500">上の検索ボックスから本を探してください。</p>
                </div>
            </div>
        </div>

        <!-- 右パネル: マイ本棚 -->
        <div class="lg:col-span-1 bg-white rounded-2xl shadow-lg flex flex-col h-full">
            <header class="p-6 border-b border-gray-200">
                <h2 class="text-2xl font-bold text-gray-900">マイ本棚</h2>
                 <p id="user-id-display" class="text-xs text-gray-400 mt-1 truncate">User ID: N/A</p>
            </header>
            <div id="bookshelf-container" class="flex-grow p-6 overflow-y-auto custom-scrollbar">
                <div id="bookshelf" class="space-y-4">
                    <!-- 保存した本がここに表示されます -->
                </div>
                <div id="empty-bookshelf-state" class="hidden text-center py-10">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    <h3 class="mt-2 text-sm font-medium text-gray-900">本棚は空です</h3>
                    <p class="mt-1 text-sm text-gray-500">本を検索して「保存」ボタンを押してください。</p>
                </div>
                 <div id="bookshelf-loader" class="hidden text-center py-10">
                    <p class="text-gray-500">本棚を読み込み中...</p>
                </div>
            </div>
        </div>
    </div>
    
    <!-- トースト通知用のコンテナ -->
    <div id="toast-container" class="fixed bottom-5 right-5 z-50"></div>

    <script type="module">
        // Firebase SDKのインポート
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
        import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
        import { getFirestore, doc, collection, addDoc, onSnapshot, deleteDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

        // --- DOM要素の取得 ---
        const searchForm = document.getElementById('search-form');
        const searchInput = document.getElementById('search-input');
        const searchResultsContainer = document.getElementById('search-results');
        const bookshelfContainer = document.getElementById('bookshelf');
        const loader = document.getElementById('loader');
        const emptySearchState = document.getElementById('empty-search-state');
        const emptyBookshelfState = document.getElementById('empty-bookshelf-state');
        const bookshelfLoader = document.getElementById('bookshelf-loader');
        const userIdDisplay = document.getElementById('user-id-display');

        // --- Firebaseのセットアップ ---
        let db, auth, userId, app;
        let myBookIds = new Set(); // 保存済みの本のIDを管理
        let unsubscribeBookshelf; // onSnapshotのリスナーを解除する関数

        const appId = typeof __app_id !== 'undefined' ? __app_id : 'book-api-manager-default';
        
        try {
            const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
            app = initializeApp(firebaseConfig);
            db = getFirestore(app);
            auth = getAuth(app);
            
            // --- 認証 ---
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    userId = user.uid;
                    userIdDisplay.textContent = `User ID: ${userId}`;
                    listenToBookshelf(); // 認証後に本棚のリスニングを開始
                } else {
                    // ユーザーがいない場合、カスタムトークンまたは匿名でサインイン
                    try {
                        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                            await signInWithCustomToken(auth, __initial_auth_token);
                        } else {
                            await signInAnonymously(auth);
                        }
                    } catch (error) {
                        console.error("Authentication failed:", error);
                        showToast("認証に失敗しました。", 'error');
                    }
                }
            });

        } catch (e) {
            console.error("Firebaseの初期化に失敗しました:", e);
            showToast("アプリの初期化に失敗しました。ページを再読み込みしてください。", 'error');
        }


        // --- Google Books API ---
        const searchBooks = async (query) => {
            if (!query) return;
            loader.classList.remove('hidden');
            emptySearchState.classList.add('hidden');
            searchResultsContainer.innerHTML = '';

            try {
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=18`);
                if (!response.ok) throw new Error('Network response was not ok.');
                const data = await response.json();
                renderSearchResults(data.items || []);
            } catch (error) {
                console.error('Error fetching books:', error);
                showToast("書籍の検索に失敗しました。", 'error');
                searchResultsContainer.innerHTML = '<p class="text-red-500">エラーが発生しました。もう一度お試しください。</p>';
            } finally {
                loader.classList.add('hidden');
            }
        };

        // --- レンダリング関数 ---
        const renderSearchResults = (books) => {
            searchResultsContainer.innerHTML = '';
            if (books.length === 0) {
                emptySearchState.classList.remove('hidden');
                return;
            }
            emptySearchState.classList.add('hidden');
            
            books.forEach(book => {
                const bookInfo = book.volumeInfo;
                const bookId = book.id;
                const isSaved = myBookIds.has(bookId);

                const card = `
                    <div class="bg-gray-50 rounded-lg p-4 flex flex-col gap-3 border border-gray-200 transition-shadow hover:shadow-md">
                        <div class="flex gap-4">
                             <img src="${bookInfo.imageLinks?.thumbnail || 'https://placehold.co/128x192/E2E8F0/94A3B8?text=No+Image'}" alt="Cover of ${bookInfo.title}" class="w-20 h-28 object-cover rounded shadow-md">
                             <div class="flex-1">
                                <h3 class="font-bold text-md leading-tight text-gray-900">${bookInfo.title || 'タイトル不明'}</h3>
                                <p class="text-sm text-gray-600 mt-1">${(bookInfo.authors || ['著者不明']).join(', ')}</p>
                             </div>
                        </div>
                        <p class="text-xs text-gray-500 leading-snug line-clamp-3">${bookInfo.description || '概要はありません。'}</p>
                        <button 
                            data-book-id="${bookId}"
                            class="save-btn mt-auto w-full text-sm font-semibold py-2 px-4 rounded-lg ${isSaved ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}"
                            ${isSaved ? 'disabled' : ''}
                        >
                            ${isSaved ? '保存済み' : '本棚に保存'}
                        </button>
                    </div>
                `;
                searchResultsContainer.innerHTML += card;
            });
        };
        
        const renderBookshelf = (books) => {
            bookshelfLoader.classList.add('hidden');
            if (books.length === 0) {
                emptyBookshelfState.classList.remove('hidden');
                bookshelfContainer.innerHTML = '';
                return;
            }
            emptyBookshelfState.classList.add('hidden');
            bookshelfContainer.innerHTML = ''; // 一旦クリア
            
            books.forEach(book => {
                const card = `
                    <div class="bg-white rounded-lg p-3 flex items-center gap-4 border border-gray-200">
                        <img src="${book.thumbnail || 'https://placehold.co/64x96/E2E8F0/94A3B8?text=No+Image'}" alt="Cover of ${book.title}" class="w-12 h-16 object-cover rounded shadow">
                        <div class="flex-1 overflow-hidden">
                            <h4 class="font-semibold text-sm truncate text-gray-800">${book.title}</h4>
                            <p class="text-xs text-gray-500 truncate">${(book.authors || []).join(', ')}</p>
                        </div>
                        <button data-doc-id="${book.docId}" class="remove-btn text-gray-400 hover:text-red-500 p-1">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </div>
                `;
                bookshelfContainer.innerHTML += card;
            });
        };

        // --- Firestore 処理 ---
        const saveBook = async (bookId) => {
            if (!userId) {
                showToast("ログインしていません。", 'error');
                return;
            }
            try {
                // Google Books APIから完全な書籍情報を再取得
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
                if (!response.ok) throw new Error('Failed to fetch book details.');
                const bookData = await response.json();
                
                const bookToSave = {
                    googleBooksId: bookData.id,
                    title: bookData.volumeInfo.title || 'タイトル不明',
                    authors: bookData.volumeInfo.authors || [],
                    publisher: bookData.volumeInfo.publisher || '',
                    publishedDate: bookData.volumeInfo.publishedDate || '',
                    description: bookData.volumeInfo.description || '',
                    thumbnail: bookData.volumeInfo.imageLinks?.thumbnail || null,
                    createdAt: new Date(),
                };

                const booksCollectionRef = collection(db, 'artifacts', appId, 'users', userId, 'books');
                await addDoc(booksCollectionRef, bookToSave);
                showToast(`「${bookToSave.title}」を保存しました。`, 'success');

            } catch (error) {
                console.error("Error saving book: ", error);
                showToast("本の保存に失敗しました。", 'error');
            }
        };

        const removeBook = async (docId) => {
             if (!userId) {
                showToast("ログインしていません。", 'error');
                return;
            }
            try {
                const bookDocRef = doc(db, 'artifacts', appId, 'users', userId, 'books', docId);
                await deleteDoc(bookDocRef);
                showToast("本棚から削除しました。", 'info');
            } catch (error) {
                console.error("Error removing book: ", error);
                 showToast("本の削除に失敗しました。", 'error');
            }
        };
        
        const listenToBookshelf = () => {
             if (unsubscribeBookshelf) {
                unsubscribeBookshelf(); // 既存のリスナーを解除
            }
            if (!userId) return;

            bookshelfLoader.classList.remove('hidden');
            emptyBookshelfState.classList.add('hidden');
            
            const booksCollectionRef = collection(db, 'artifacts', appId, 'users', userId, 'books');
            const q = query(booksCollectionRef);

            unsubscribeBookshelf = onSnapshot(q, (snapshot) => {
                const books = [];
                const newBookIds = new Set();
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    books.push({ docId: doc.id, ...data });
                    newBookIds.add(data.googleBooksId);
                });
                
                books.sort((a,b) => b.createdAt.toDate() - a.createdAt.toDate());

                myBookIds = newBookIds;
                renderBookshelf(books);
                // 検索結果のボタンの状態を更新
                updateSaveButtonsState();
            }, (error) => {
                console.error("Error listening to bookshelf:", error);
                showToast("本棚の読み込みに失敗しました。", 'error');
                bookshelfLoader.classList.add('hidden');
            });
        };

        // --- UI更新 & イベントリスナー ---
        
        // 保存ボタンの状態を更新する
        const updateSaveButtonsState = () => {
            document.querySelectorAll('.save-btn').forEach(button => {
                const bookId = button.dataset.bookId;
                if (myBookIds.has(bookId)) {
                    button.disabled = true;
                    button.textContent = '保存済み';
                    button.classList.remove('bg-indigo-100', 'text-indigo-700', 'hover:bg-indigo-200');
                    button.classList.add('bg-gray-300', 'text-gray-500', 'cursor-not-allowed');
                }
            });
        };

        // 検索フォームの送信
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            searchBooks(searchInput.value.trim());
        });

        // イベント委任：保存ボタン
        searchResultsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('save-btn') && !e.target.disabled) {
                const button = e.target;
                const bookId = button.dataset.bookId;
                button.disabled = true;
                button.textContent = '保存中...';
                saveBook(bookId);
            }
        });
        
        // イベント委任：削除ボタン
        bookshelfContainer.addEventListener('click', (e) => {
            const button = e.target.closest('.remove-btn');
            if (button) {
                const docId = button.dataset.docId;
                removeBook(docId);
            }
        });
        
        // トースト通知
        const showToast = (message, type = 'info') => {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            
            let bgColor, textColor;
            switch(type) {
                case 'success': bgColor = 'bg-green-500'; textColor = 'text-white'; break;
                case 'error': bgColor = 'bg-red-500'; textColor = 'text-white'; break;
                default: bgColor = 'bg-gray-800'; textColor = 'text-white'; break;
            }

            toast.className = `toast ${bgColor} ${textColor} text-sm font-semibold py-3 px-5 rounded-lg shadow-xl`;
            toast.textContent = message;
            
            container.appendChild(toast);
            
            setTimeout(() => {
                toast.classList.add('hide');
                toast.addEventListener('animationend', () => toast.remove());
            }, 3000);
        };
    </script>
</body>
</html>
