import { useState, useCallback } from 'react';
import { View, Text, FlatList, Image, Pressable } from 'react-native';
import { loadBooks } from '../storage/bookStorage';
import { BookModel } from '../models/BookModel';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { stateColorClass } from 'models/State';

export default function BookListScreen() {
  const [books, setBooks] = useState<BookModel[]>([]);
  const navigation = useNavigation<any>();

  useFocusEffect(
    useCallback(() => {
      const fetchBooks = async () => {
        const storedBooks = await loadBooks();
        setBooks(storedBooks);
      };

      fetchBooks();
    }, [])
  );

  const renderItem = ({ item }: { item: BookModel }) => (
    <Pressable
      onPress={() => navigation.navigate('EditBook', { uuid: item.uuid })}
      className="bg-white mb-3 shadow-md flex-row items-center overflow-hidden rounded"
    >
      { /* Image and placeholder */ 
        item.image ? (
          <Image
            source={{ uri: item.image }}
            className="w-28 h-full mr-4 rounded"
            resizeMode="cover"
          />
        ) : (
          <View className="w-28 h-full bg-gray-300 mr-4 rounded" />
        )
      }

      { /* Colored State corner */ }
      <View className={`absolute -top-16 -right-16 w-24 h-24 ${stateColorClass[item.state]} rotate-45`} />
      
      { /* Book details */ }
      <View className="flex-1 p-4 flex-col justify-between items-center">
        <Text className="text-lg font-bold mb-4">{item.title}</Text>
        <Text className='text-sm text-gray-500'>{item.type} · {item.state}</Text>

        { /* Separator */}
        <View className="w-full h-[1px] bg-gray-300 my-2" />

        <View className="flex-row w-full justify-center gap-16">
          <View className='flex flex-col items-center'>
            <Text className='text-xl text-mainText font-bold'>{item.chapter}</Text>
            <Text className='text-lg text-mainText font-bold'>Chapters</Text>
          </View>

          <View className='flex flex-col items-center'>
            <Text className='text-xl text-mainText font-bold'>{item.volume}</Text>
            <Text className='text-lg text-mainText font-bold'>Volumes</Text>
          </View>
        </View>

      </View>

      </Pressable>
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
        className="absolute bottom-10 right-10 bg-blue-600 rounded-full w-14 h-14 items-center justify-center shadow-lg"
        onPress={() => navigation.navigate('AddBook')}
      >
        <Text className="text-white text-3xl leading-none">＋</Text>
      </Pressable>
    </View>
  );
}