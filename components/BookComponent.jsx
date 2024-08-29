import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native';



export default function Book({ book }) {

    return(
        <View className="flex-1 flex-row">
            <Image
            source={{ uri: book.image }}
            style={{ width: 100, height: 100 }}
            />

            <View className="flex-1 flex-col">
                <Text className="text-white">{book.title}</Text>
                <View className="flex-1 flex-row">
                    <Text className="text-white">{book.chapter}</Text>
                    <Text className="text-white">{book.volume}</Text>
                    <Text className="text-white">{book.type}</Text>
                    <Text className="text-white">{book.score}</Text>
                    <Text className="text-white">{book.chapter}</Text>
                
                </View>
            
            </View>

        </View>
    )
}