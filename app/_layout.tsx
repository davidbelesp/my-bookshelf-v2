import React from 'react';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import colors from '../constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ZoomedLogo } from '../components/Logo';



export default function Layout() {
  
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1">

      <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.main,
        },
        headerTintColor: colors.extra.white,
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerTitle: "My Bookshelf",
        headerLeft: () => (
          <View className='mr-3'>
            <ZoomedLogo background={colors.main} logo={colors.extra.white} />
          </View>
        ),
      }}>
      </Stack>
      
      <StatusBar style="light" />
    </View>
    );
}
