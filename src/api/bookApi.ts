interface BookSearchParams {
    query: string;
    maxResults?: number;
    startIndex?: number;
}

interface BookSearchResponse {
    items: Book[];
    totalItems: number;
}

export interface Book {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        description?: string;
        imageLinks?: {
            thumbnail?: string;
            smallThumbnail?: string;
        };
        publishedDate?: string;
        publisher?: string;
        pageCount?: number;
        categories?: string[];
        language?: string;
        previewLink?: string;
        infoLink?: string;
    };
}

const API_BASE_URL = 'https://www.googleapis.com/books/v1';
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export const searchBooks = async ({ query, maxResults = 10, startIndex = 0 }: BookSearchParams): Promise<BookSearchResponse> => {
    try {
        const url = new URL(`${API_BASE_URL}/volumes`);
        url.searchParams.append('q', query);
        url.searchParams.append('maxResults', maxResults.toString());
        url.searchParams.append('startIndex', startIndex.toString());
        if (API_KEY) {
            url.searchParams.append('key', API_KEY);
        }

        console.log('APIリクエストURL:', url.toString());

        const response = await fetch(url.toString());

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error('APIエラーレスポンス:', errorData);
            throw new Error(`本の検索に失敗しました: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('APIレスポンスデータ:', data);

        if (!data.items) {
            return {
                items: [],
                totalItems: 0
            };
        }

        return {
            items: data.items,
            totalItems: data.totalItems || 0,
        };
    } catch (error) {
        console.error('本の検索エラー:', error);
        throw error;
    }
};

export const getBookById = async (id: string): Promise<Book> => {
    try {
        const url = new URL(`${API_BASE_URL}/volumes/${id}`);
        if (API_KEY) {
            url.searchParams.append('key', API_KEY);
        }

        const response = await fetch(url.toString());

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error('APIエラーレスポンス:', errorData);
            throw new Error(`本の詳細取得に失敗しました: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('本の詳細取得エラー:', error);
        throw error;
    }
}; 
