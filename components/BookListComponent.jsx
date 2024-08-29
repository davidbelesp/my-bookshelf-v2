import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { getBooks } from "../lib/books";
import Book from './BookComponent';


export default function BookListComponent() {

    const [books, setBooks] = useState([]);
    useEffect(() => {
        getBooks().then((data) => setBooks(data));
    });

    return(
      <View className="bg-black">
        <FlatList data={books}
          keyExtractor={(book) => book.uuid}
          renderItem={({ item }) => ( 
           <Book book={item} />
          )}>
        </FlatList>
        <StatusBar style="dark" />
      </View>
    )

}