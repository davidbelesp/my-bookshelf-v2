import { View, Text, Pressable, Platform, ActionSheetIOS } from 'react-native';

type Option<T> = { label: string; value: T };

type Props<T> = {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: Option<T>[];
};

export function ActionSheetPicker<T>({
  label,
  value,
  onChange,
  options,
}: Props<T>) {
  function handlePress() {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [...options.map(opt => opt.label), 'Cancel'],
          cancelButtonIndex: options.length,
        },
        (buttonIndex) => {
          if (buttonIndex < options.length) {
            onChange(options[buttonIndex].value);
          }
        }
      );
    }
    // Android fallback goes here
  }

  return (
    <View className="flex">
      <Text className="mb-2 font-semibold text-inputLabel">{label}</Text>
      <View className="mb-2 rounded border bg-inputMain border-inputBorder">
        <Pressable className="p-3" onPress={handlePress}>
          <Text className="text-base text-inputText">
            {/* Find the label for the current value */}
            {options.find(opt => opt.value === value)?.label ?? ''}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
