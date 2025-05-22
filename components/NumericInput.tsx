// components/NumericInput.tsx
import { View, Text, TextInput } from "react-native";

type NumericInputProps = {
  label: string;
  value: number;
  onChange: (num: number) => void;
  max?: number;
};

export default function NumericInput({
  label,
  value,
  onChange,
  max = 9999,
}: NumericInputProps) {
  return (
    <View className="flex-1 py-2 w-full mb-4">
      <Text className="font-semibold mb-2 text-inputLabel">{label}</Text>
      <TextInput
        className="py-3 px-6 h-full text-2xl border border-inputBorder rounded text-inputText bg-inputMain"
        keyboardType="numeric"
        value={value.toString()}
        onChangeText={(text) => {
          let num = parseInt(text) || 0;
          if (num > max) num = max;
          onChange(num);
        }}
      />
    </View>
  );
}
