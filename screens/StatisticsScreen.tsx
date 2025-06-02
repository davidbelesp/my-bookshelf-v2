import { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { loadBooks } from '../storage/bookStorage';
import { BookModel } from '../models/BookModel';
import { Type } from 'models/Type';
import { useTheme } from 'theme/ThemeContext';

export default function StatisticsScreen() {
  const [books, setBooks] = useState<BookModel[]>([]);
  const { dark } = useTheme();

  useEffect(() => {
    const fetchBooks = async () => {
      const storedBooks = await loadBooks();
      setBooks(storedBooks);
    };
    fetchBooks();
  }, []);

  // Calculate statistics
  const count = books.length;
  const averageScore =
    count === 0
      ? 0
      : (
          books.reduce((sum, b) => sum + (typeof b.score === 'number' ? b.score : 0), 0) / count
        ).toFixed(2);
  const totalChapters = books.reduce(
    (sum, b) => sum + (typeof b.chapter === 'number' ? b.chapter : 0),
    0
  );
  const totalVolumes = books.reduce(
    (sum, b) => sum + (typeof b.volume === 'number' ? b.volume : 0),
    0
  );

  const totalPages = books.reduce(
    (sum, b) => sum + (typeof b.chapter === 'number' ? b.chapter * 24.14515 : 0),
    0
  );

  const mainStats = [
    { label: 'All Books', value: formatLargeNumber(count) },
    { label: 'Chapters', value: formatLargeNumber(totalChapters) },
    { label: 'Volumes', value: formatLargeNumber(totalVolumes) },
    { label: 'Pages', value: formatLargeNumber(totalPages) },
  ];

  function formatLargeNumber(num: number): string {
    if (num >= 1_000_000) {
      // Format as millions, one decimal place
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'm';
    }
    if (num >= 100_000) {
      // Format as thousands, one decimal place
      return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num.toLocaleString(); // Default: add commas if needed
  }

  const typeCounts = books.reduce(
    (acc, book) => {
      acc[book.type] = (acc[book.type] || 0) + 1;
      return acc;
    },
    {} as Record<Type, number>
  );

  const stateCounts = books.reduce(
    (ste, book) => {
      ste[book.state] = (ste[book.state] || 0) + 1;
      return ste;
    },
    {} as Record<string, number>
  );
  return (
    <ScrollView className="flex-1 bg-gray-100 p-6">
      {/* Header */}
      <View className="mb-4 w-full flex-1 flex-row items-center justify-between rounded-xl bg-white p-6 shadow">
        {/* Score */}
        <View className="flex-1 flex-col items-start justify-center px-4">
          <Text className="rounded-xl bg-white text-5xl font-bold">{averageScore}</Text>
          <Text className="text-xl text-gray-600">Average Score</Text>
        </View>

        {/* Total details */}
        <View className="w-full flex-1 flex-col items-center justify-center">
          {mainStats.map((stat, idx) => (
            <View
              key={stat.label}
              className={`mb-4 w-full flex-row items-center justify-between ${
                idx % 2 !== 0 ? 'bg-gray-100' : 'bg-white'
              } rounded p-2`}>
              <Text className="text-lg text-gray-600">{stat.label}</Text>
              <Text className="text-xl font-bold">{stat.value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Group by Type */}
      <View className="mb-4 w-full flex-1 flex-col items-center justify-between rounded-xl bg-white p-6 shadow">
        <Text className="mb-4 text-xl font-bold">By Type</Text>
        <View className="w-full flex-1 flex-col items-center justify-center">
          {Object.entries(typeCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([type, count], idx) => (
              <View
                key={type}
                className={`mb-4 w-full flex-row items-center justify-between ${
                  idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                } p-2`}>
                <Text className="text-lg text-gray-600">{type}</Text>
                <Text className="text-xl font-bold">{count}</Text>
              </View>
            ))}
        </View>
      </View>

      <View className="mb-4 w-full flex-1 flex-col items-center justify-between rounded-xl bg-white p-6 shadow">
        <Text className="mb-4 text-xl font-bold">By State</Text>
        <View className="w-full flex-1 flex-col items-center justify-center">
          {Object.entries(stateCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([state, count], idx) => (
              <View
                key={state}
                className={`mb-4 w-full flex-row items-center justify-between ${
                  idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                } p-2`}>
                <Text className="text-lg text-gray-600">{state}</Text>
                <Text className="text-xl font-bold">{count}</Text>
              </View>
            ))}
        </View>
      </View>
    </ScrollView>
  );
}
