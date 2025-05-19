import AsyncStorage from '@react-native-async-storage/async-storage';
import { BookModel } from '../models/BookModel';

const BOOKS_KEY = 'bookshelf_books';

export const saveBooks = async (books: BookModel[]) => {
  try {
    await AsyncStorage.setItem(BOOKS_KEY, JSON.stringify(books));
  } catch (error) {
    console.error('Error saving books:', error);
  }
};

export const loadBooks = async (): Promise<BookModel[]> => {
  try {
    const raw = await AsyncStorage.getItem(BOOKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error('Error loading books:', error);
    return [];
  }
};