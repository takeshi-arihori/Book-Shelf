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

// APIキーが設定されていない場合、コンソールにエラーを出力して問題を明確にする
if (!API_KEY) {
    console.error('Google Books API key is not set. Please set VITE_GOOGLE_BOOKS_API_KEY in your .env file.');
}

export const searchBooks = async ({ query, maxResults = 10, startIndex = 0 }: BookSearchParams): Promise<BookSearchResponse> => {
    // APIキーがない場合は、空の結果を返して処理を中断する
    if (!API_KEY) {
        console.error('API key is missing. Cannot search for books.');
        return { items: [], totalItems: 0 };
    }

    try {
        const url = new URL(`${API_BASE_URL}/volumes`);
        url.searchParams.append('q', query);
        url.searchParams.append('startIndex', startIndex.toString());
        url.searchParams.append('maxResults', maxResults.toString());
        url.searchParams.append('key', API_KEY);

        const response = await fetch(url.toString());

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            throw new Error(`Failed to search books: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        return {
            items: data.items || [],
            totalItems: data.totalItems || 0,
        };
    } catch (error) {
        console.error('Error searching books:', error);
        // エラーを再スローして、呼び出し元でハンドリングできるようにする
        throw error;
    }
};

export const fetchBookById = async (id: string): Promise<Book | null> => {
    if (!API_KEY) {
        console.error('API key is missing. Cannot get book by ID.');
        return null;
    }

    try {
        const url = new URL(`${API_BASE_URL}/volumes/${id}`);
        url.searchParams.append('key', API_KEY);

        const response = await fetch(url.toString());

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            throw new Error(`Failed to get book by ID: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching book with ID ${id}:`, error);
        throw error;
    }
};
 