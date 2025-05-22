import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { loadBooks } from "../storage/bookStorage";
import { BookModel } from "../models/BookModel";

export default function StatisticsScreen() {
  const [books, setBooks] = useState<BookModel[]>([]);

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
          books.reduce((sum, b) => sum + (typeof b.score === "number" ? b.score : 0), 0) / count
        ).toFixed(2);
  const totalChapters = books.reduce(
    (sum, b) => sum + (typeof b.chapter === "number" ? b.chapter : 0),
    0
  );
  const totalVolumes = books.reduce(
    (sum, b) => sum + (typeof b.volume === "number" ? b.volume : 0),
    0
  );

  return (
    <ScrollView className="flex-1 bg-gray-100 p-6">
      <Text className="text-3xl font-bold mb-6 text-mainText">Statistics</Text>
      <View className="bg-white rounded-xl shadow p-6 mb-4 flex-row justify-between items-center">
        <Text className="text-lg text-gray-600">Total Books</Text>
        <Text className="text-2xl font-bold">{count}</Text>
      </View>
      <View className="bg-white rounded-xl shadow p-6 mb-4 flex-row justify-between items-center">
        <Text className="text-lg text-gray-600">Average Score</Text>
        <Text className="text-2xl font-bold">{averageScore}</Text>
      </View>
      <View className="bg-white rounded-xl shadow p-6 mb-4 flex-row justify-between items-center">
        <Text className="text-lg text-gray-600">Total Chapters</Text>
        <Text className="text-2xl font-bold">{totalChapters}</Text>
      </View>
      <View className="bg-white rounded-xl shadow p-6 mb-4 flex-row justify-between items-center">
        <Text className="text-lg text-gray-600">Total Volumes</Text>
        <Text className="text-2xl font-bold">{totalVolumes}</Text>
      </View>
    </ScrollView>
  );
}