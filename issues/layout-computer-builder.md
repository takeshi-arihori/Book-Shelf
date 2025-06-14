<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Computer Builder</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #0d1117;
            color: #c9d1d9;
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #0d1117;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #21262d;
            border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #30363d;
        }
        .component-select {
            background-color: #0d1117;
            border-color: #30363d;
        }
        .panel {
            background-color: #161b22;
            border: 1px solid #30363d;
        }
        .score-bar-bg {
            background-color: #30363d;
        }
        .score-bar {
            transition: width 0.5s ease-in-out;
        }
        @keyframes toast-in { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes toast-out { from { transform: translateY(0); opacity: 1; } to { transform: translateY(100%); opacity: 0; } }
        .toast { animation: toast-in 0.3s ease-out forwards; }
        .toast.hide { animation: toast-out 0.3s ease-in forwards; }
    </style>
</head>
<body class="text-gray-200">

    <div id="app" class="max-w-7xl mx-auto p-4 md:p-6 h-screen flex flex-col">
        <header class="mb-6 text-center">
            <h1 class="text-4xl font-bold text-white">Computer Builder</h1>
            <p class="text-gray-400 mt-2">パーツを選んで、あなたの理想のPCを組み立てましょう。</p>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
            <!-- 左パネル: パーツ選択 -->
            <div id="component-panel" class="panel rounded-2xl shadow-lg p-6 flex flex-col space-y-4">
                <h2 class="text-xl font-bold text-white border-b border-gray-700 pb-3">1. パーツを選択</h2>
                <div id="component-selectors">
                    <!-- セレクターはJSで動的に生成 -->
                </div>
                <div id="initial-loader" class="text-center py-10">
                    <p class="text-gray-400">パーツデータを読み込み中...</p>
                </div>
            </div>

            <!-- 中央パネル: 現在のビルドとスコア -->
            <div class="panel rounded-2xl shadow-lg p-6 flex flex-col">
                <h2 class="text-xl font-bold text-white border-b border-gray-700 pb-3">2. ビルドを構成</h2>
                <div id="current-build" class="flex-grow mt-4 space-y-3">
                    <p class="text-gray-500 text-center py-8">左のパネルからパーツを選択してください。</p>
                </div>
                <div class="mt-auto">
                    <div class="mt-4">
                        <h3 class="font-semibold mb-2 text-white">主な用途</h3>
                        <div class="flex gap-4">
                            <label class="flex items-center space-x-2 cursor-pointer">
                                <input type="radio" name="purpose" value="Gaming" class="form-radio text-indigo-500 bg-gray-800" checked>
                                <span>ゲーミング</span>
                            </label>
                            <label class="flex items-center space-x-2 cursor-pointer">
                                <input type="radio" name="purpose" value="Work" class="form-radio text-indigo-500 bg-gray-800">
                                <span>作業用</span>
                            </label>
                        </div>
                    </div>
                    <button id="add-build-btn" class="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-lg disabled:bg-gray-600 disabled:cursor-not-allowed">
                        ビルドを追加して比較
                    </button>
                </div>
            </div>

            <!-- 右パネル: ビルド比較 -->
            <div class="panel rounded-2xl shadow-lg flex flex-col h-full">
                <header class="p-6 border-b border-gray-700">
                    <h2 class="text-xl font-bold text-white">3. ビルド比較</h2>
                    <p id="user-id-display" class="text-xs text-gray-500 mt-1 truncate">User ID: N/A</p>
                </header>
                <div id="comparison-container" class="flex-grow p-6 overflow-y-auto custom-scrollbar">
                    <div id="builds-list" class="space-y-4">
                        <!-- 保存したビルドがここに表示されます -->
                    </div>
                    <div id="empty-build-state" class="hidden text-center py-10">
                        <p class="mt-1 text-sm text-gray-500">まだビルドがありません。</p>
                    </div>
                    <div id="build-loader" class="hidden text-center py-10">
                        <p class="text-gray-400">ビルドを読み込み中...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div id="toast-container" class="fixed bottom-5 right-5 z-50"></div>

    <script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
        import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
        import { getFirestore, doc, collection, addDoc, onSnapshot, deleteDoc, query } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

        // --- DOM Elements ---
        const componentSelectorsContainer = document.getElementById('component-selectors');
        const currentBuildContainer = document.getElementById('current-build');
        const buildsListContainer = document.getElementById('builds-list');
        const addBuildBtn = document.getElementById('add-build-btn');
        const initialLoader = document.getElementById('initial-loader');
        const emptyBuildState = document.getElementById('empty-build-state');
        const userIdDisplay = document.getElementById('user-id-display');

        // --- State and Config ---
        let db, auth, userId, app, unsubscribeBuilds;
        const componentTypes = ['cpu', 'gpu', 'ram', 'ssd', 'hdd'];
        let componentsData = {};
        let selectedComponents = {};

        // --- Firebase Init ---
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'computer-builder-default';
        try {
            const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
            app = initializeApp(firebaseConfig);
            db = getFirestore(app);
            auth = getAuth(app);
            
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    userId = user.uid;
                    userIdDisplay.textContent = `User ID: ${userId}`;
                    listenToBuilds();
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

        // --- API & Data Fetching ---
        const fetchAllComponents = async () => {
            try {
                const requests = componentTypes.map(type => 
                    fetch(`https://api.recursionist.io/builder/computers?type=${type}`).then(res => res.json())
                );
                const results = await Promise.all(requests);
                componentTypes.forEach((type, index) => {
                    componentsData[type] = results[index];
                });
                populateSelectors();
                initialLoader.classList.add('hidden');
            } catch (error) {
                console.error('Error fetching components:', error);
                showToast('パーツの読み込みに失敗しました。', 'error');
            }
        };
        
        // --- Rendering ---
        const populateSelectors = () => {
            componentSelectorsContainer.innerHTML = '';
            for (const type of componentTypes) {
                const data = componentsData[type];
                if (!data) continue;
                
                const selectorHTML = `
                    <div class="mb-2">
                        <label for="${type}-select" class="block text-sm font-medium text-gray-400 mb-1 uppercase">${type}</label>
                        <select id="${type}-select" data-type="${type}" class="component-select w-full rounded-md text-white p-2">
                            <option value="">${type.toUpperCase()} を選択...</option>
                            ${data.map(item => `<option value='${JSON.stringify(item)}'>${item.Brand} ${item.Model}</option>`).join('')}
                        </select>
                    </div>
                `;
                componentSelectorsContainer.innerHTML += selectorHTML;
            }
        };

        const updateCurrentBuild = () => {
            const hasSelections = Object.keys(selectedComponents).length > 0;
            if (!hasSelections) {
                 currentBuildContainer.innerHTML = '<p class="text-gray-500 text-center py-8">左のパネルからパーツを選択してください。</p>';
                 return;
            }

            currentBuildContainer.innerHTML = '';
            for(const type of ['cpu', 'gpu', 'ram', 'hdd', 'ssd']){
                if(selectedComponents[type]){
                    const item = selectedComponents[type];
                     currentBuildContainer.innerHTML += `
                        <div class="text-sm">
                            <span class="font-semibold uppercase text-gray-400">${type}:</span>
                            <span class="ml-2">${item.Brand} ${item.Model}</span>
                        </div>
                    `;
                }
            }
            
            const allRequiredSelected = ['cpu', 'gpu', 'ram'].every(t => selectedComponents[t]) && (selectedComponents['hdd'] || selectedComponents['ssd']);
            addBuildBtn.disabled = !allRequiredSelected;
        };
        
        const renderBuilds = (builds) => {
            if (builds.length === 0) {
                emptyBuildState.classList.remove('hidden');
                buildsListContainer.innerHTML = '';
                return;
            }
            emptyBuildState.classList.add('hidden');
            buildsListContainer.innerHTML = '';

            builds.forEach(build => {
                const scoreColor = build.score > 75 ? 'bg-green-500' : build.score > 50 ? 'bg-yellow-500' : 'bg-red-500';
                const card = `
                    <div class="panel rounded-lg p-4 border border-gray-700">
                        <div class="flex justify-between items-start">
                             <div>
                                <h4 class="font-bold text-lg text-white">Build Score: ${build.score.toFixed(2)}</h4>
                                <p class="text-xs text-gray-400">${build.purpose} 用途</p>
                             </div>
                             <button data-doc-id="${build.docId}" class="remove-btn text-gray-500 hover:text-red-400">&times;</button>
                        </div>
                        <div class="w-full score-bar-bg rounded-full h-2.5 my-3">
                            <div class="score-bar ${scoreColor} h-2.5 rounded-full" style="width: ${Math.min(build.score, 100)}%"></div>
                        </div>
                        <div class="text-xs space-y-1 mt-2 text-gray-400">
                             ${Object.entries(build.components).map(([type, comp]) => `
                                <div><strong class="uppercase">${type}:</strong> ${comp.Brand} ${comp.Model}</div>`).join('')}
                        </div>
                    </div>
                `;
                 buildsListContainer.innerHTML += card;
            });
        };

        // --- Logic & Calculations ---
        const parseModel = (type, model) => {
            if (type === 'ram') {
                const match = model.match(/(\d+)x(\d+)GB/);
                return match ? { sticks: parseInt(match[1]), sizePerStick: parseInt(match[2]) } : null;
            }
            if (type === 'hdd' || type === 'ssd') {
                const match = model.match(/(\d+)(GB|TB)/);
                if (match) {
                    let size = parseInt(match[1]);
                    if (match[2] === 'TB') size *= 1000;
                    return { capacityGB: size };
                }
            }
            return {};
        };
        
        const calculateScore = () => {
            const purpose = document.querySelector('input[name="purpose"]:checked').value;
            const weights = {
                Gaming: { gpu: 0.6, cpu: 0.25, ram: 0.125, storage: 0.025 },
                Work:   { cpu: 0.6, gpu: 0.25, ram: 0.1, storage: 0.05 }
            };
            
            let totalScore = 0;
            const currentWeights = weights[purpose];
            
            for (const type in currentWeights) {
                 const componentKey = type === 'storage' ? (selectedComponents.ssd ? 'ssd' : 'hdd') : type;
                 if (selectedComponents[componentKey]) {
                     totalScore += selectedComponents[componentKey].Benchmark * currentWeights[type];
                 }
            }
            return totalScore;
        };

        // --- Firestore ---
        const addBuild = async () => {
            const purpose = document.querySelector('input[name="purpose"]:checked').value;
            const score = calculateScore();
            
            const build = {
                purpose,
                score,
                components: selectedComponents,
                createdAt: new Date(),
            };
            
            try {
                const buildsCollection = collection(db, 'artifacts', appId, 'users', userId, 'computer_builds');
                await addDoc(buildsCollection, build);
                showToast('ビルドが正常に追加されました！', 'success');
            } catch (error) {
                console.error("Error adding build: ", error);
                showToast('ビルドの追加に失敗しました。', 'error');
            }
        };

        const removeBuild = async (docId) => {
            try {
                const buildDoc = doc(db, 'artifacts', appId, 'users', userId, 'computer_builds', docId);
                await deleteDoc(buildDoc);
                showToast('ビルドを削除しました。', 'info');
            } catch (error) {
                 console.error("Error removing build: ", error);
                 showToast('ビルドの削除に失敗しました。', 'error');
            }
        };
        
        const listenToBuilds = () => {
            if (unsubscribeBuilds) unsubscribeBuilds();
            if (!userId) return;
            
            const buildsCollection = collection(db, 'artifacts', appId, 'users',userId, 'computer_builds');
            const q = query(buildsCollection);
            
            unsubscribeBuilds = onSnapshot(q, (snapshot) => {
                const builds = [];
                snapshot.forEach(doc => builds.push({ docId: doc.id, ...doc.data() }));
                builds.sort((a,b) => b.createdAt.toDate() - a.createdAt.toDate());
                renderBuilds(builds);
            }, (error) => {
                console.error("Snapshot error: ", error);
                showToast('ビルドの同期に失敗しました。', 'error');
            });
        };

        // --- Event Listeners ---
        componentSelectorsContainer.addEventListener('change', (e) => {
            if (e.target.tagName === 'SELECT') {
                const type = e.target.dataset.type;
                const value = e.target.value;

                if (value) {
                    selectedComponents[type] = JSON.parse(value);
                    if (type === 'hdd') delete selectedComponents.ssd;
                    if (type === 'ssd') delete selectedComponents.hdd;
                } else {
                    delete selectedComponents[type];
                }
                
                // hdd/ssdの選択を排他的にするためのUI更新
                if(type === 'hdd' && value) document.getElementById('ssd-select').value = '';
                if(type === 'ssd' && value) document.getElementById('hdd-select').value = '';

                updateCurrentBuild();
            }
        });

        addBuildBtn.addEventListener('click', () => {
            addBuild();
        });

        buildsListContainer.addEventListener('click', (e) => {
            const button = e.target.closest('.remove-btn');
            if (button) {
                const docId = button.dataset.docId;
                removeBuild(docId);
            }
        });

        // --- Toast & Init ---
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
        
        document.addEventListener('DOMContentLoaded', () => {
            fetchAllComponents();
            updateCurrentBuild(); // 初期状態を設定
        });
    </script>
</body>
</html>
