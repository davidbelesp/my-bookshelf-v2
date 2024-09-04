import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import Book from './BookComponent';
import { BookModel } from '../Models/Book';
import colors from '../constants/colors';
import { getBooks } from '../lib/booksManager';


export default function BookListComponent() {

    const [books, setBooks] = useState<BookModel[]>([]);
    useEffect(() => {
        getBooks().then((books) => setBooks(books));
    }, []);

    return(
      <View className="" style={{backgroundColor:colors.mainBackground}}>
        <FlatList data={books}
          keyExtractor={(book) => book.uuid}
          renderItem={({ item }) => ( 
           <Book book={item}/>
          )}
          className='pt-2 pb-2'>
        </FlatList>
        <StatusBar style="dark" />
      </View>
    )

}