/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // プライマリーカラー（インディゴベース）
                primary: {
                    50: '#eef2ff',
                    100: '#e0e7ff',
                    200: '#c7d2fe',
                    300: '#a5b4fc',
                    400: '#818cf8',
                    500: '#6366f1',
                    600: '#4f46e5',
                    700: '#4338ca',
                    800: '#3730a3',
                    900: '#312e81',
                    950: '#1e1b4b',
                },
                // セカンダリーカラー（グレーベース）
                secondary: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617',
                },
                // アクセントカラー（エラー、警告など）
                accent: {
                    error: {
                        light: '#fee2e2',
                        DEFAULT: '#ef4444',
                        dark: '#b91c1c',
                    },
                    success: {
                        light: '#dcfce7',
                        DEFAULT: '#22c55e',
                        dark: '#15803d',
                    },
                    warning: {
                        light: '#fef3c7',
                        DEFAULT: '#f59e0b',
                        dark: '#b45309',
                    },
                },
            },
            // カスタムシャドウ
            boxShadow: {
                'soft': '0 2px 4px rgba(0, 0, 0, 0.05)',
                'medium': '0 4px 6px rgba(0, 0, 0, 0.1)',
                'strong': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            },
        },
    },
    plugins: [],
    important: true, // すべてのTailwindクラスに!importantを追加
} 
