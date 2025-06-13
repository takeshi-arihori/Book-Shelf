import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

const loginSchema = z.object({
    userId: z.string().min(1, 'IDを入力してください'),
    password: z.string().min(1, 'パスワードを入力してください'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage = () => {
    const { login } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            setError(null);
            await login(data.userId, data.password);
        } catch (error) {
            console.error('ログインに失敗しました:', error);
            setError(error instanceof Error ? error.message : 'ログインに失敗しました');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        ログイン
                    </h2>
                </div>
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="userId" className="sr-only">
                                IDまたはメールアドレス
                            </label>
                            <input
                                {...register('userId')}
                                type="text"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="IDまたはメールアドレス"
                            />
                            {errors.userId && (
                                <p className="mt-1 text-sm text-red-600">{errors.userId.message}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                パスワード
                            </label>
                            <input
                                {...register('password')}
                                type="password"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="パスワード"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {isSubmitting ? 'ログイン中...' : 'ログイン'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
