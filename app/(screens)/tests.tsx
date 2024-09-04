import { Pressable, Text, TextInput, View } from 'react-native';
import React, { useEffect } from 'react';
import { deleteBooks, getBookByUuid, getBooks, getBooksEXAMPLE, getLastID, insertBook } from '../../lib/booksManager';


export default function Tests() {

    const [ id , setId ] = React.useState(1);

    useEffect(() => {
      

    }, []);

    const buttonStyle = {
        borderRadius: 10,
        padding: 10,
        backgroundColor: "#333",
    };

    return (
        <View style={{ backgroundColor: "#000"}}>
            
            <Pressable style={buttonStyle} onPress={
                async () => {
                    const book = getBooksEXAMPLE()[0];
                    insertBook(book);
                }
            }>
                <Text style={{color:"#fff"}}>SAVE RANDOM BOOK</Text>
            </Pressable>

            <Pressable style={buttonStyle} onPress={
                async () => {
                    const id = await getLastID();
                    console.log(id);
                }
            }>
                <Text style={{color:"#fff"}}>GET LAST ID</Text>
            </Pressable>

            <Pressable style={buttonStyle} onPress={
                async () => {
                    const idR = id ? id.toString() : "1";
                    const book = await getBookByUuid(idR);
                    console.log(book);
                }
            }>
                <Text style={{color:"#fff"}}>GET BOOK WITH ID</Text>
            </Pressable>

            <Pressable style={buttonStyle} onPress={
                async () => {  
                    await deleteBooks();
                }
            }>
                <Text style={{color:"#fff"}}>DELETE ALL BOOKS</Text>
            </Pressable>

            <Pressable style={buttonStyle} onPress={
                async () => {  
                    await getBooks();
                }
            }>
                <Text style={{color:"#fff"}}>GET ALL BOOKS</Text>
            </Pressable>

            <TextInput
                style={{backgroundColor: "#fff", padding: 10}}
                onChange={(e) => setId(Number(e.nativeEvent.text))} />

        </View>
    );
}