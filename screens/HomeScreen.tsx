import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, Pressable } from 'react-native';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View className="flex-1 flex-col bg-mainWhite justify-between p-10">
      <View className="mt-10 flex-1 flex-col justify-start items-start">
        <Text className="text-7xl text-mainText dark:text-dark-mainWhite">My</Text>
        <Text className="text-7xl text-mainText dark:text-dark-mainWhite">Bookshelf</Text>
      </View>
      <View className="mb-12 flex-1 flex-col items-center justify-end">
        <Pressable
          onPress={() => navigation.navigate('Books')}
          className="items-center rounded-lg bg-main px-10 py-5">
          <Text className="text-base font-bold text-mainWhite">Go to Bookshelf</Text>
        </Pressable>
      </View>
    </View>
  );
}
