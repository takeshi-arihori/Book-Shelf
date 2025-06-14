<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ブックシェルフマネージャー</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #0d1117;
            color: #c9d1d9;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0d1117; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #21262d; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #30363d; }
        .panel { background-color: #161b22; border: 1px solid #30363d; }
        .search-input { background-color: #0d1117; border-color: #30363d; }
        .nav-link { transition: background-color 0.2s; }
        .nav-link.active { background-color: #58a6ff; color: #161b22; }
        .book-card:hover { background-color: #21262d; }
        @keyframes toast-in { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes toast-out { from { transform: translateY(0); opacity: 1; } to { transform: translateY(100%); opacity: 0; } }
        .toast { animation: toast-in 0.3s ease-out forwards; }
        .toast.hide { animation: toast-out 0.3s ease-in forwards; }
    </style>
</head>
<body class="text-gray-200">

    <div id="app" class="max-w-7xl mx-auto p-4 md:p-6 h-screen flex flex-col">
        <!-- ヘッダーとナビゲーション -->
        <header class="mb-6">
            <div class="text-center">
                <h1 class="text-4xl font-bold text-white">Book Shelf</h1>
                <p class="text-gray-400 mt-2">あなただけの本棚を作りましょう。</p>
            </div>
            <nav class="mt-6 flex justify-center gap-4">
                <a href="#" id="nav-search" class="nav-link px-4 py-2 rounded-md font-semibold">書籍検索</a>
                <a href="#" id="nav-bookshelf" class="nav-link px-4 py-2 rounded-md font-semibold">マイ本棚</a>
            </nav>
        </header>

        <!-- ページコンテナ -->
        <main class="flex-grow min-h-0">
            <!-- 検索ページ -->
            <div id="page-search">
                <div class="panel rounded-2xl shadow-lg flex flex-col h-full">
                    <form id="search-form" class="p-6 border-b border-gray-700">
                        <div class="flex gap-3">
                            <input type="text" id="search-input" placeholder="タイトル、著者名..." class="search-input w-full rounded-md p-2 text-white">
                            <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg">検索</button>
                        </div>
                    </form>
                    <div id="search-results-container" class="flex-grow p-6 overflow-y-auto custom-scrollbar">
                         <div id="search-loader" class="hidden text-center py-10"><p>検索中...</p></div>
                        <div id="search-results" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            <p id="search-prompt" class="text-gray-500 text-center py-8 col-span-full">検索結果がここに表示されます。</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 書籍詳細ページ -->
            <div id="page-details" class="hidden">
                 <div class="panel rounded-2xl shadow-lg p-6 md:p-8">
                     <div id="book-details-content">
                         <!-- JSで詳細をレンダリング -->
                     </div>
                     <div class="mt-8 flex gap-4">
                         <button id="add-to-shelf-btn" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-lg disabled:bg-gray-600 disabled:cursor-not-allowed">本棚に追加</button>
                         <button id="back-to-search-btn" class="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg shadow-lg">検索に戻る</button>
                     </div>
                 </div>
            </div>

            <!-- マイ本棚ページ -->
            <div id="page-bookshelf" class="hidden">
                 <div class="panel rounded-2xl shadow-lg flex flex-col h-full">
                     <header class="p-6 border-b border-gray-700">
                        <h2 class="text-xl font-bold text-white">マイ本棚</h2>
                        <p id="user-id-display" class="text-xs text-gray-500 mt-1 truncate">User ID: N/A</p>
                    </header>
                    <div id="bookshelf-container" class="flex-grow p-6 overflow-y-auto custom-scrollbar">
                        <div id="bookshelf-loader" class="hidden text-center py-10"><p>本棚を読み込み中...</p></div>
                        <div id="bookshelf-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            <!-- JSで本棚をレンダリング -->
                        </div>
                         <p id="empty-bookshelf-state" class="hidden text-gray-500 text-center py-8 col-span-full">本棚は空です。</p>
                    </div>
                 </div>
            </div>
        </main>
    </div>
    
    <div id="toast-container" class="fixed bottom-5 right-5 z-50"></div>

    <script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
        import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
        import { getFirestore, doc, collection, addDoc, onSnapshot, deleteDoc, query } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

        // --- DOM Elements ---
        const pages = {
            search: document.getElementById('page-search'),
            details: document.getElementById('page-details'),
            bookshelf: document.getElementById('page-bookshelf'),
        };
        const navLinks = {
            search: document.getElementById('nav-search'),
            bookshelf: document.getElementById('nav-bookshelf'),
        };
        const searchForm = document.getElementById('search-form');
        const searchInput = document.getElementById('search-input');
        const searchResultsContainer = document.getElementById('search-results');
        const searchLoader = document.getElementById('search-loader');
        const searchPrompt = document.getElementById('search-prompt');
        const bookDetailsContent = document.getElementById('book-details-content');
        const addToShelfBtn = document.getElementById('add-to-shelf-btn');
        const backToSearchBtn = document.getElementById('back-to-search-btn');
        const bookshelfGrid = document.getElementById('bookshelf-grid');
        const bookshelfLoader = document.getElementById('bookshelf-loader');
        const emptyBookshelfState = document.getElementById('empty-bookshelf-state');
        const userIdDisplay = document.getElementById('user-id-display');

        // --- State ---
        let db, auth, userId, app, unsubscribeBookshelf;
        let activePage = 'search';
        let currentBookDetails = null;
        let myBookIds = new Set();

        // --- Firebase Init ---
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'bookshelf-manager-default';
        try {
            const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
            app = initializeApp(firebaseConfig);
            db = getFirestore(app);
            auth = getAuth(app);
            
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    userId = user.uid;
                    userIdDisplay.textContent = `User ID: ${userId}`;
                    listenToBookshelf();
                } else {
                    try {
                         if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                            await signInWithCustomToken(auth, __initial_auth_token);
                        } else {
                            await signInAnonymously(auth);
                        }
                    } catch (error) { console.error("Auth failed:", error); }
                }
            });
        } catch (e) {
            console.error("Firebase init failed:", e);
            showToast("アプリの初期化に失敗しました。", 'error');
        }

        // --- Navigation ---
        const navigateTo = (pageName) => {
            activePage = pageName;
            Object.values(pages).forEach(p => p.classList.add('hidden'));
            pages[activePage].classList.remove('hidden');

            Object.values(navLinks).forEach(l => l.classList.remove('active'));
            if(navLinks[activePage]) navLinks[activePage].classList.add('active');
        };

        // --- API & Data Fetching ---
        const searchBooks = async (query) => {
            if (!query) return;
            searchLoader.classList.remove('hidden');
            searchPrompt.classList.add('hidden');
            searchResultsContainer.innerHTML = '';
            
            try {
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=28`);
                const data = await response.json();
                renderSearchResults(data.items || []);
            } catch (error) {
                console.error('Search error:', error);
                showToast("書籍の検索に失敗しました。", 'error');
            } finally {
                searchLoader.classList.add('hidden');
            }
        };

        const fetchBookDetails = async (bookId) => {
            bookDetailsContent.innerHTML = '<p class="text-center">読み込み中...</p>';
            navigateTo('details');
            try {
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
                currentBookDetails = await response.json();
                renderBookDetails();
            } catch (error) {
                 console.error('Fetch details error:', error);
                 bookDetailsContent.innerHTML = '<p class="text-center text-red-400">詳細の読み込みに失敗しました。</p>';
            }
        };

        // --- Rendering ---
        const renderSearchResults = (books) => {
            searchResultsContainer.innerHTML = '';
            if (books.length === 0) {
                searchResultsContainer.innerHTML = '<p class="text-gray-500 text-center py-8 col-span-full">該当する本が見つかりませんでした。</p>';
                return;
            }
            books.forEach(book => {
                const bookInfo = book.volumeInfo;
                const card = document.createElement('div');
                card.className = 'book-card p-4 rounded-lg cursor-pointer flex flex-col items-center text-center';
                card.innerHTML = `
                    <img src="${bookInfo.imageLinks?.thumbnail || 'https://placehold.co/128x192/161b22/c9d1d9?text=No+Image'}" alt="Cover" class="w-32 h-48 object-cover rounded shadow-lg mb-3">
                    <h4 class="font-semibold text-sm text-white flex-grow">${bookInfo.title || 'タイトル不明'}</h4>
                    <p class="text-xs text-gray-400 mt-1">${(bookInfo.authors || ['著者不明']).join(', ')}</p>
                `;
                card.addEventListener('click', () => fetchBookDetails(book.id));
                searchResultsContainer.appendChild(card);
            });
        };

        const renderBookDetails = () => {
            const bookInfo = currentBookDetails.volumeInfo;
            bookDetailsContent.innerHTML = `
                 <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="md:col-span-1 flex justify-center">
                        <img src="${bookInfo.imageLinks?.thumbnail || 'https://placehold.co/192x288/161b22/c9d1d9?text=No+Image'}" alt="Cover" class="w-48 h-auto object-cover rounded-lg shadow-2xl">
                    </div>
                    <div class="md:col-span-2">
                        <h3 class="text-3xl font-bold text-white">${bookInfo.title || ''}</h3>
                        <p class="text-lg text-gray-400 mt-2">${(bookInfo.authors || []).join(', ')}</p>
                        <div class="mt-4 text-sm text-gray-500">
                             <span>${bookInfo.publisher || ''}</span>
                             <span class="mx-2">&#8226;</span>
                             <span>${bookInfo.publishedDate || ''}</span>
                             <span class="mx-2">&#8226;</span>
                             <span>${bookInfo.pageCount || 'N/A'} ページ</span>
                        </div>
                        <p class="text-base text-left mt-6 text-gray-300">${bookInfo.description || '概要はありません。'}</p>
                    </div>
                </div>
            `;
            updateAddToShelfButtonState();
        };

        const renderBookshelf = (books) => {
            bookshelfLoader.classList.add('hidden');
            bookshelfGrid.innerHTML = '';
            if (books.length === 0) {
                emptyBookshelfState.classList.remove('hidden');
                return;
            }
            emptyBookshelfState.classList.add('hidden');
            books.forEach(book => {
                const card = document.createElement('div');
                card.className = 'relative group';
                card.innerHTML = `
                    <img src="${book.thumbnail || 'https://placehold.co/192x288/161b22/c9d1d9?text=No+Image'}" alt="Cover" class="w-full h-auto object-cover rounded-lg shadow-lg">
                    <div class="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg p-4 text-center">
                        <h4 class="font-bold text-white">${book.title}</h4>
                        <p class="text-xs text-gray-300 mt-1">${(book.authors || []).join(', ')}</p>
                        <button data-doc-id="${book.docId}" class="remove-btn mt-4 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 px-4 rounded-full">削除</button>
                    </div>
                `;
                bookshelfGrid.appendChild(card);
            });
        };

        // --- UI State & Firestore ---
        const updateAddToShelfButtonState = () => {
            if (!currentBookDetails || myBookIds.has(currentBookDetails.id)) {
                addToShelfBtn.disabled = true;
                addToShelfBtn.textContent = myBookIds.has(currentBookDetails?.id) ? '追加済み' : '本棚に追加';
            } else {
                addToShelfBtn.disabled = false;
                addToShelfBtn.textContent = '本棚に追加';
            }
        };
        
        const addBookToShelf = async () => {
            if (!userId || !currentBookDetails) return;
            const bookInfo = currentBookDetails.volumeInfo;
            const bookToAdd = {
                googleBooksId: currentBookDetails.id,
                title: bookInfo.title, authors: bookInfo.authors, thumbnail: bookInfo.imageLinks?.thumbnail, createdAt: new Date()
            };
            try {
                await addDoc(collection(db, 'artifacts', appId, 'users', userId, 'bookshelf'), bookToAdd);
                showToast(`「${bookToAdd.title}」を追加しました。`, 'success');
            } catch (e) {
                showToast("本の追加に失敗しました。", 'error');
            }
        };

        const listenToBookshelf = () => {
            if (unsubscribeBookshelf) unsubscribeBookshelf();
            if (!userId) return;
            
            bookshelfLoader.classList.remove('hidden');
            const q = query(collection(db, 'artifacts', appId, 'users', userId, 'bookshelf'));
            unsubscribeBookshelf = onSnapshot(q, (snapshot) => {
                const books = [];
                myBookIds.clear();
                snapshot.forEach(doc => {
                    const data = doc.data();
                    books.push({ docId: doc.id, ...data });
                    myBookIds.add(data.googleBooksId);
                });
                books.sort((a,b) => b.createdAt.toDate() - a.createdAt.toDate());
                renderBookshelf(books);
                if (activePage === 'details') updateAddToShelfButtonState();
            });
        };

        // --- Event Listeners ---
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            searchBooks(searchInput.value.trim());
        });

        navLinks.search.addEventListener('click', (e) => { e.preventDefault(); navigateTo('search'); });
        navLinks.bookshelf.addEventListener('click', (e) => { e.preventDefault(); navigateTo('bookshelf'); });
        backToSearchBtn.addEventListener('click', () => navigateTo('search'));
        addToShelfBtn.addEventListener('click', () => addBookToShelf());
        bookshelfGrid.addEventListener('click', async (e) => {
            const removeBtn = e.target.closest('.remove-btn');
            if (removeBtn) {
                try {
                    await deleteDoc(doc(db, 'artifacts', appId, 'users', userId, 'bookshelf', removeBtn.dataset.docId));
                    showToast("本棚から削除しました。", 'info');
                } catch(err) {
                     showToast("削除に失敗しました。", 'error');
                }
            }
        });
        
        // --- Init ---
        const showToast = (message, type = 'info') => {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            const colors = { success: 'bg-green-500', error: 'bg-red-500', info: 'bg-gray-700' };
            toast.className = `toast ${colors[type]} text-white text-sm font-semibold py-3 px-5 rounded-lg shadow-xl`;
            toast.textContent = message;
            container.appendChild(toast);
            setTimeout(() => {
                toast.classList.add('hide');
                toast.addEventListener('animationend', () => toast.remove());
            }, 3000);
        };
        
        navigateTo('search'); // 初期ページを設定
    </script>
</body>
</html>
