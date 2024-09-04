import { View } from 'react-native';
import BookListComponent from '../../components/BookListComponent';
import { Link } from 'expo-router';
import React from 'react';
import colors from '../../constants/colors';


export default function Books() {
    return (
        <View className='flex-1' style={{ backgroundColor: colors.mainBackground}}>
            <BookListComponent />
            <Link href="/tests" className="p-4 text-white">Go to tests</Link>
        </View>
    );
}