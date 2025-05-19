import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View className="flex-1 items-center justify-center bg-red-500">
      <Text className="text-white text-xl font-bold">Tailwind is working!</Text>
      <Button title="Go to Book List" onPress={() => navigation.navigate('Books')} />
    </View>
  );
}