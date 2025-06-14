import { useAuth } from '../hooks/useAuth';

export const HomePage = () => {
    const { user } = useAuth();

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">ようこそ、{user?.name}さん</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">🛠️ ビルダー</h2>
                    <p className="text-gray-600 mb-4">
                        カスタムPCのパーツを選択し、組み立てシミュレーションを行います。
                    </p>
                    <a
                        href="/builder"
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                        ビルダーを開く
                    </a>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">📚 ライブラリ</h2>
                    <p className="text-gray-600 mb-4">
                        保存したPC構成やお気に入りのパーツを管理します。
                    </p>
                    <a
                        href="/library"
                        className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                    >
                        ライブラリを開く
                    </a>
                </div>
            </div>
        </div>
    );
}; 
