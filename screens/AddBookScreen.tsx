import React from 'react';
import { BookModel } from '../models/BookModel';
import { saveBooks, loadBooks } from '../storage/bookStorage';
import BookForm from '../components/BookForm';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/navigation';

export default function AddBookScreen() {

  type Navigation = NativeStackNavigationProp<RootStackParamList, 'AddBook'>;
  const navigation = useNavigation<Navigation>();

  const handleSubmit = async (data: Partial<BookModel>) => {
    const books = await loadBooks();
    const newBook: BookModel = {
      ...(data as BookModel),
      uuid: uuid.v4().toString(),
      comments: [],
    };
    await saveBooks([newBook, ...books]);
    navigation.navigate('Books');
  };

  return <BookForm onSubmit={handleSubmit} />;
}
