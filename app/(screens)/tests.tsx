import { Pressable, Text, View } from 'react-native';
import BookListComponent from '../../components/BookListComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteBooks, getBooksEXAMPLE, saveBook, saveBooks, getBookByUUID } from '../../lib/booksManager';
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
                    console.log(books)
                    await saveBook(books[0])

                }
            }>
                <Text style={{color:"#fff"}}>Save</Text>
            </Pressable>

            <Pressable style={buttonStyle} onPress={
                () => {
                    
                }
            }>
                <Text style={{color:"#fff"}}>Read</Text>
            </Pressable>

            <Pressable style={buttonStyle} onPress={
                async () => {
                    const book = await getBookByUUID("1")
                    console.log(book)
                }
            }>
                <Text style={{color:"#fff"}}>getuuid 1</Text>
            </Pressable>

            <Pressable style={buttonStyle} onPress={
                async () => {
                    await deleteBooks()
                }
            }>
                <Text style={{color:"#fff"}}>Delete</Text>
            </Pressable>

        </View>
    );
}