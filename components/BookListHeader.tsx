// components/BookListHeader.tsx
import React from "react";
import { View, Pressable } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import SearchBar from "./SearchBar";

type BookListHeaderProps = {
  value: string;
  onChange: (text: string) => void;
  onMenu1: () => void;
  onMenu2: () => void;
};

export default function BookListHeader({
  value,
  onChange,
  onMenu1,
  onMenu2,
}: BookListHeaderProps) {
  return (
    <View
      className="flex-row items-center w-full"
      style={{
        minHeight: 56,
        paddingHorizontal: 8,
      }}
    >
      <View className="flex-1">
        <SearchBar value={value} onChange={onChange} />
      </View>
      <View className="flex-row items-center ml-2">
        <Pressable
          className="p-2"
          onPress={onMenu1}
          style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          hitSlop={12}
        >
          <MaterialCommunityIcons name="chart-box-outline" size={24} color="#fff" />
        </Pressable>
        <Pressable
          className="p-2"
          onPress={onMenu2}
          style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          hitSlop={12}
        >
          <MaterialCommunityIcons name="menu" size={24} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}
