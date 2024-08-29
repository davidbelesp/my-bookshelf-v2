import React from 'react';
import { Stack } from 'expo-router';
import { View, Text } from 'react-native';

export default function Layout() {
  return (
    <View className="flex-1 pt-10">
      <Stack screenOptions={{
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
      }}}
      
      />
    </View>
    );
}
