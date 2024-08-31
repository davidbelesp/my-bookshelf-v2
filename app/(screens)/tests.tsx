import { Pressable, Text, View } from 'react-native';
import BookListComponent from '../../components/BookListComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBook, getBooks, getBooksEXAMPLE } from '../../lib/books';
import React from 'react';

export default function Tests() {

    const buttonStyle = {
        borderRadius: 10,
        padding: 10,
        backgroundColor: "#333",
    };

    return (
        <View style={{ backgroundColor: "#000"}}>
            
            <Pressable style={buttonStyle} onPress={
                async () => {
                    const books = getBooksEXAMPLE()

                    await AsyncStorage.setItem("books", JSON.stringify(books));
                    console.log(books);
                }
            }>
                <Text style={{color:"#fff"}}>Save</Text>
            </Pressable>

            <Pressable style={buttonStyle} onPress={
                () => {
                    getBooks().then((value) => console.log(value));
                    console.log("read button pressed");
                }
            }>
                <Text style={{color:"#fff"}}>Read</Text>
            </Pressable>

            <Pressable style={buttonStyle} onPress={
                () => {
                    getBook("1").then((value) => console.log(value));
                    console.log("read button pressed");
                }
            }>
                <Text style={{color:"#fff"}}>getuuid 1</Text>
            </Pressable>

            <Pressable style={buttonStyle} onPress={
                () => {
                    AsyncStorage.removeItem("books");
                    console.log("Books deleted");
                }
            }>
                <Text style={{color:"#fff"}}>Delete</Text>
            </Pressable>

        </View>
    );
}