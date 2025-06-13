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

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    // ダミーデータでの認証処理
    const user = DUMMY_USERS.find(
        (u) => u.userId === credentials.userId && u.password === credentials.password
    );

    if (!user) {
        throw new Error('IDまたはパスワードが正しくありません');
    }

    // ダミートークンの生成
    const token = `dummy-token-${user.id}-${Date.now()}`;

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
