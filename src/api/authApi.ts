// ダミーユーザーデータ
const DUMMY_USERS = [
    { id: '1', userId: 'user1', password: 'password1', name: 'ユーザー1' },
    { id: '2', userId: 'user2', password: 'password2', name: 'ユーザー2' },
];

interface LoginCredentials {
    userId: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: {
        id: string;
        name: string;
    };
}

// Unicode文字列を安全にBase64エンコードする関数
const safeBtoa = (str: string): string => {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
    ));
};

// テスト用のダミーJWTトークンを生成
const generateDummyToken = (user: { id: string; name: string }) => {
    // ヘッダー
    const header = safeBtoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));

    // ペイロード（1年後の有効期限を設定）
    const payload = safeBtoa(JSON.stringify({
        user: {
            id: user.id,
            name: user.name
        },
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60) // 1年後
    }));

    // 署名（ダミー）
    const signature = 'dummy_signature';

    return `${header}.${payload}.${signature}`;
};

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    // ダミーデータでの認証処理
    const user = DUMMY_USERS.find(
        (u) => u.userId === credentials.userId && u.password === credentials.password
    );

    if (!user) {
        throw new Error('IDまたはパスワードが正しくありません');
    }

    // ダミートークンの生成（1年有効）
    const token = generateDummyToken(user);

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
        },
    };
};

export const logout = async (): Promise<void> => {
    // ダミーのログアウト処理
    await new Promise((resolve) => setTimeout(resolve, 500));
}; 
