import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Pressable } from 'react-native';
import { loadBooks } from '../storage/bookStorage';
import { BookModel } from '../models/BookModel';
import { useNavigation } from '@react-navigation/native';

export default function BookListScreen() {
  const [books, setBooks] = useState<BookModel[]>([]);
  const navigation = useNavigation<any>();

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
    <View className="flex-1 bg-gray-100">
      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={books}
        keyExtractor={(item) => item.uuid}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-10">No books yet.</Text>
        }
      />

      {/* Floating Action Button */}
      <Pressable
        className="absolute bottom-6 right-6 bg-blue-600 rounded-full w-14 h-14 items-center justify-center shadow-lg"
        onPress={() => navigation.navigate('AddBook')}
      >
        <Text className="text-white text-3xl leading-none">＋</Text>
      </Pressable>
    </View>
  );
}