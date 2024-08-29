import React from 'react';
import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import colors from '../constants/colors';
import Logo, { ZoomedLogo } from '../components/Logo';

export default function Layout() {
  return (
    <View className="flex-1">
      <Stack screenOptions={{
        headerStyle: {
          backgroundColor: colors.main,
        },
        headerTintColor: colors.extra.white,
        headerTitle: "My Bookshelf",
        headerLeft: () => (
          <View className='mr-3'>
            <ZoomedLogo background={colors.main} logo={colors.extra.white} />
          </View>
        ),
      }}
      />
      <StatusBar style="light" />
    </View>
    );
}
