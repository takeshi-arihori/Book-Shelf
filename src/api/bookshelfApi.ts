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
