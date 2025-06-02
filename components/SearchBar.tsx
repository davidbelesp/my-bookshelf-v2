import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "theme/ThemeContext";

type SearchBarProps = {
  value: string;
  onChange: (text: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const { colors, dark } = useTheme();

  return (
    <View 
        className={`flex-1 flex-row items-center ${dark ? 'bg-main' : 'bg-dark_mainDark'} rounded px-3`}
        style={{ minHeight: 52, maxHeight: 52 }}
    >
      <Ionicons name="search" size={20} color="#FFF" style={{ marginRight: 8 }} />
      <TextInput
        className="flex-1 text-base"
        placeholder="Search books..."
        placeholderTextColor="#FFF"
        value={value}
        onChangeText={onChange}
        returnKeyType="search"
        clearButtonMode="while-editing"
        style={{ 
            color: '#FFF',
        }}
      />
    </View>
  );
}
