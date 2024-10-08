import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';
import colors from '../constants/colors';


export default function MainPage() {
    return (
        <View className='flex-1' style={{ backgroundColor: colors.mainBackground}}>
            <Text className="text-4xl" style={{color:colors.extra.white}}>INDEX</Text>
            <Link href="/books" className="p-4 text-white">Go to books</Link>
            <Link href="/tests" className="p-4 text-white">Go to tests</Link>
        </View>
    );
}