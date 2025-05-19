import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { loadBooks } from '../storage/bookStorage';
import { BookModel } from '../models/BookModel';

export default function BookListScreen() {
  const [books, setBooks] = useState<BookModel[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const storedBooks = await loadBooks();
      setBooks(storedBooks);
    };
    fetchBooks();
  }, []);

  const renderItem = ({ item }: { item: BookModel }) => (
    <View className="bg-white rounded-xl p-4 mb-3 shadow-md flex-row items-center">
      {item.image ? (
        <Image
          source={{ uri: item.image }}
          className="w-16 h-24 rounded mr-4"
          resizeMode="cover"
        />
      ) : (
        <View className="w-16 h-24 bg-gray-300 rounded mr-4" />
      )}
      <View className="flex-1">
        <Text className="text-lg font-bold">{item.title}</Text>
        <Text className="text-sm text-gray-500">{item.state}</Text>
        <Text className="text-sm text-gray-700">Chapter {item.chapter}</Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {books.length === 0 ? (
        <Text className="text-center text-gray-500 mt-10">No books yet.</Text>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.uuid}
          renderItem={renderItem}
        />
      )}
    </View>
  );
  
}
