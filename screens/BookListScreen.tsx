import { useState, useCallback, useLayoutEffect } from 'react';
import { View, Text, FlatList, Image, Pressable } from 'react-native';
import { loadBooks } from '../storage/bookStorage';
import { BookModel } from '../models/BookModel';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { stateColorClass } from 'models/State';
import { useTheme } from '../theme/ThemeContext';
import BookListHeader from 'components/BookListHeader';

export default function BookListScreen() {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [search, setSearch] = useState<string>('');
  const navigation = useNavigation<any>();
  const { colors } = useTheme();

  useFocusEffect(
    useCallback(() => {
      const fetchBooks = async () => {
        const storedBooks = await loadBooks();
        setBooks(storedBooks);
      };

      fetchBooks();
    }, [])
  );

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.type.toLowerCase().includes(search.toLowerCase()) ||
      b.state.toLowerCase().includes(search.toLowerCase())
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <BookListHeader
          value={search}
          onChange={setSearch}
          onMenu1={() => {
            navigation.navigate('Statistics');
          }}
          onMenu2={() => alert('Menu 2 pressed')}
        />
      ),
      headerTitleAlign: 'center',
      headerStyle: { backgroundColor: colors.main },
    });
  }, [navigation, search]);

  const renderItem = ({ item }: { item: BookModel }) => (
    <Pressable
      onPress={() => navigation.navigate('EditBook', { uuid: item.uuid })}
      className="relative mb-3 flex-row items-center rounded bg-white shadow-md">
      {
        /* Image and placeholder */
        item.image ? (
          <Image
            source={{ uri: item.image }}
            className="mr-4 h-full w-28 rounded"
            resizeMode="cover"
          />
        ) : (
          <View className="mr-4 h-full w-28 rounded bg-gray-300" />
        )
      }

      {/* Colored State corner */}
      <View
        className={`h-24 w-24 -top-16 -right-16 ${stateColorClass[item.state]} rotate-45`}
        style={{ zIndex: 10 }}
      />

      {/* Book details */}
      <View className="flex-1 flex-col items-center justify-between p-4">
        <Text className="mb-4 text-lg font-bold">{item.title}</Text>
        <Text className="text-sm text-gray-500">
          {item.type} · {item.state}
        </Text>

        {/* Separator */}
        <View className="my-2 h-[1px] w-full bg-gray-300" />

        <View className="w-full flex-row justify-center gap-16">
          <View className="flex flex-col items-center">
            <Text className="text-mainText text-xl font-bold">{item.chapter}</Text>
            <Text className="text-mainText text-lg font-bold">Chapters</Text>
          </View>

          <View className="flex flex-col items-center">
            <Text className="text-mainText text-xl font-bold">{item.volume}</Text>
            <Text className="text-mainText text-lg font-bold">Volumes</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View className="flex-1 bg-gray-100">
      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={filteredBooks}
        keyExtractor={(item) => item.uuid}
        renderItem={renderItem}
        ListEmptyComponent={<Text className="mt-10 text-center text-gray-500">No books yet.</Text>}
      />

      {/* Floating Action Button */}
      <Pressable
        className="absolute bottom-10 right-10 h-14 w-14 items-center justify-center rounded-full bg-main shadow-lg"
        onPress={() => navigation.navigate('AddBook')}>
        <Text className="text-3xl leading-none text-white">＋</Text>
      </Pressable>
    </View>
  );
}
