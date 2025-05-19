import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { RouteProp } from '@react-navigation/native';
import { loadBooks, saveBooks } from '../storage/bookStorage';
import BookForm from '../components/BookForm';
import { BookModel } from '../models/BookModel';
import * as FileSystem from 'expo-file-system';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type EditRoute = RouteProp<RootStackParamList, 'EditBook'>;

export default function EditBookScreen() {
  type Navigation = NativeStackNavigationProp<RootStackParamList, 'AddBook'>;
  const navigation = useNavigation<Navigation>();

  const route = useRoute<EditRoute>();
  const [book, setBook] = useState<BookModel | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const books = await loadBooks();
      const found = books.find((b) => b.uuid === route.params.uuid);
      if (found) setBook(found);
    };
    fetch();
  }, []);

  const handleSubmit = async (data: Partial<BookModel> & { deleted?: boolean }) => {
    const books = await loadBooks();

    if (data.deleted && data.uuid) {
      const filtered = books.filter((b) => b.uuid !== data.uuid);
      await saveBooks(filtered);

      const path = FileSystem.documentDirectory + `${data.uuid}.png`;
      const info = await FileSystem.getInfoAsync(path);
      if (info.exists) {
        await FileSystem.deleteAsync(path);
      }

      navigation.goBack();
      return;
    }

    const updated = books.map((b) =>
      b.uuid === data.uuid ? { ...b, ...data, updatedAt: Date.now() } : b
    );
    await saveBooks(updated);
    navigation.goBack();
  };

  if (!book) return null;

  return <BookForm initial={book} onSubmit={handleSubmit} submitLabel="Update Book" />;
}
