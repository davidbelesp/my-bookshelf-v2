import { Text, View } from 'react-native';
import BookListComponent from '../components/BookListComponent';
import { Link } from 'expo-router';
import React from 'react';


export default function Index() {
    return (
        <View style={{ backgroundColor: "#000"}}>
            <Text style={{color:"#fff"}}>My Bookshelf</Text>
            <BookListComponent />
            <Link href="/tests" className="p-4 text-white">Go to tests</Link>
        </View>
        
    );
}