// components/HomeHeader.tsx
import { View, Pressable, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type HomeHeaderProps = {
  onConfigPress: () => void;
};

export default function HomeHeader({ onConfigPress }: HomeHeaderProps) {
  return (
    <View
      className="flex-row items-center justify-between w-full"
      style={{ minHeight: 56, paddingHorizontal: 12 }}
    >
      <Text className="text-2xl font-bold text-white">Home</Text>

      <Pressable onPress={onConfigPress} className="p-2">
        <MaterialIcons name="settings" size={24} color="#fff" />
      </Pressable>
    </View>
  );
}
