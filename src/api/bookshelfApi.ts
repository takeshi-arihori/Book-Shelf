import { supabase } from '../lib/supabaseClient';

interface BookData {
  google_books_id: string;
  title: string;
  authors: string[];
  thumbnail: string;
  user_id: string;
}

export const addBookToBookshelf = async (bookData: BookData) => {
  const { data, error } = await supabase
    .from('bookshelf')
    .insert([bookData]);

  if (error) {
    console.error('Error adding book to bookshelf:', error);
    throw error;
  }
  return data;
};

export const getBookshelf = async (userId: string) => {
  const { data, error } = await supabase
    .from('bookshelf')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching bookshelf:', error);
    throw error;
  }
  return data;
};

export const checkIfBookExists = async (userId: string, googleBooksId: string) => {
  const { data, error } = await supabase
    .from('bookshelf')
    .select('id')
    .eq('user_id', userId)
    .eq('google_books_id', googleBooksId)
    .single(); // 1件だけ取得、なければnull

  if (error && error.code !== 'PGRST116') { // PGRST116は行が見つからないエラーなので無視
    console.error('Error checking if book exists:', error);
    throw error;
  }
  return !!data; // データがあればtrue、なければfalse
};
