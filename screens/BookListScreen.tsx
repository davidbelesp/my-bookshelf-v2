import { useState, useCallback, useLayoutEffect, useEffect } from 'react';
import { View, Text, FlatList, Image, Pressable } from 'react-native';
import { loadBooks } from '../storage/bookStorage';
import { BookModel } from '../models/BookModel';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { darkStateColorClass, State, stateColorClass } from 'models/State';
import { useTheme } from '../theme/ThemeContext';
import BookListHeader from 'components/BookListHeader';
import { Type } from 'models/Type';
import { SortBy, StateOrAll, TypeOrAll } from 'types/FilterTypes';
import FilterSortModal from 'components/FilterSortModal';
import { Settings } from 'models/Settings';
import { loadSettings } from 'storage/settingsStorage';
import { filterBooks } from 'utils/filterBooks';

export default function BookListScreen() {
  const [books, setBooks] = useState<BookModel[]>([]);
  const navigation = useNavigation<any>();
  const { colors, dark } = useTheme();

  const [settings, setSettings] = useState<Settings | null>(null);

  const [stateFilter, setStateFilter] = useState<StateOrAll>('All');
  const [typeFilter, setTypeFilter] = useState<TypeOrAll>('All');
  const [sortBy, setSortBy] = useState<SortBy>('title');
  const [search, setSearch] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);

  const allStates: StateOrAll[] = ['All', ...Object.values(State)];
  const allTypes: TypeOrAll[] = ['All', ...Object.values(Type)];

  const sortOptions: { label: string; value: SortBy }[] = [
    { label: 'Title (A-Z)', value: 'title' },
    { label: 'Chapters (desc)', value: 'chapter' },
    { label: 'Last Read (desc)', value: 'lastRead' },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <BookListHeader
          value={search}
          onChange={setSearch}
          onMenu1={() => navigation.navigate('Statistics')}
          onMenu2={() => setModalVisible(true)}
        />
      ),
      headerTitleAlign: 'center',
      headerStyle: { backgroundColor: dark ? colors.main : colors.mainDark },
    });
  }, [navigation, search]);

  useEffect(() => {
    (async () => {
      const loadedSettings = await loadSettings();
      setSettings(loadedSettings);
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchBooks = async () => {
        const storedBooks = await loadBooks();
        setBooks(storedBooks);
      };

      fetchBooks();
    }, [])
  );

  const filteredBooks = filterBooks({
    books,
    search,
    settings,
    stateFilter,
    typeFilter,
    sortBy,
  });

  const renderItem = ({ item }: { item: BookModel }) => (
    <Pressable
      onPress={() => navigation.navigate('EditBook', { uuid: item.uuid })}
      className={`relative mb-3 flex-row items-center overflow-hidden rounded ${dark ? 'bg-dark_mainCard' : 'bg-white'} shadow-md`}>
      {
        /* Image and placeholder */
        settings?.censorNSFW && item.nsfw ? (
          <Image
            source={require('../assets/cover_nsfw.png')}
            className="mr-4 h-full w-28 rounded"
            resizeMode="cover"
          />
        ) : item.image ? (
          <Image
            source={{ uri: item.image }}
            className="mr-4 h-full w-28 rounded"
            resizeMode="cover"
          />
        ) : (
          <Image
            source={require('../assets/cover_null.png')}
            className="mr-4 h-full w-28 rounded"
            resizeMode="cover"
          />
        )
      }

      {/* Colored State corner */}
      <View
        className={`absolute -right-16 -top-16 h-24 w-24 ${dark ? darkStateColorClass[item.state] : stateColorClass[item.state]} rotate-45`}
        style={{ zIndex: 10 }}
      />

      {/* Score box */}
      <View className={`absolute left-0 bottom-0 flex h-10 w-10 items-center justify-center rounded-tr ${dark ? 'bg-mainScore' : 'bg-dark_mainScore'} shadow-md`}>
        <Text
          className={`text-center text-base font-bold ${dark ? 'text-white' : 'text-black'}`}
          style={{ zIndex: 20 }}>
          {item.score}
        </Text>
      </View>

      {/* Book details */}
      <View className={`flex-1 flex-col items-center justify-between p-4`}>
        <Text className={`mb-4 text-lg font-bold ${dark ? 'text-white' : 'text-black'}`}>{item.title}</Text>
        <Text className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
          {item.type} · {item.state}
        </Text>

        {/* Separator */}
        <View className="my-2 h-[1px] w-full bg-gray-300" />

        <View className="w-full flex-row justify-center gap-16">
          <View className="flex flex-col items-center">
            <Text className={`${dark ? 'text-mainText' : 'text-dark_mainText'} text-xl font-bold`}>{item.chapter}</Text>
            <Text className={`${dark ? 'text-mainText' : 'text-dark_mainText'} text-lg font-bold`}>Chapters</Text>
          </View>

          <View className="flex flex-col items-center">
            <Text className={`${dark ? 'text-mainText' : 'text-dark_mainText'} text-xl font-bold`}>{item.volume}</Text>
            <Text className={`${dark ? 'text-mainText' : 'text-dark_mainText'} text-lg font-bold`}>Volumes</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View className={`flex-1 ${dark ? 'bg-dark_mainScreenBg' : 'bg-mainScreenBg'}`}>
      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={filteredBooks}
        keyExtractor={(item) => item.uuid}
        renderItem={renderItem}
        ListEmptyComponent={<Text className="mt-10 text-center text-gray-500">No books yet.</Text>}
      />

      {/* Floating Action Button */}
      <Pressable
        className={`${ dark ? "bg-main" : "bg-dark_mainDark"} absolute bottom-10 right-10 h-14 w-14 items-center justify-center rounded-full shadow-lg`}
        onPress={() => navigation.navigate('AddBook')}>
        <Text className="text-3xl leading-none text-white">＋</Text>
      </Pressable>

      <FilterSortModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        allStates={allStates}
        stateFilter={stateFilter}
        setStateFilter={setStateFilter}
        allTypes={allTypes}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        sortOptions={sortOptions}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </View>
  );
}
