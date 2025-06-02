import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, Pressable, ImageBackground, Image } from 'react-native';
import { RootStackParamList } from '../types/navigation';
import { useTheme } from 'theme/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { dark } = useTheme();

  return (
    <ImageBackground
      source={require('../assets/bg.png')}
      className="flex-1"
      resizeMode="cover" // You can change to "contain" or others if you prefer
    >
      <View className="flex-1 flex-col justify-between p-10">
        <View className="mt-10 flex-1 flex-col justify-start items-start">
          <Text className="text-7xl text-mainWhite dark:text-dark-mainWhite">My</Text>
          <Text className="text-7xl text-mainWhite dark:text-dark-mainWhite">Bookshelf</Text>
        </View>
        <View className="mb-20 flex-1 flex-col items-center justify-end">
          <Pressable
            onPress={() => navigation.navigate('Books')}
            className={`items-center rounded-lg ${ dark ? 'bg-main' : 'bg-dark_mainDark'} px-10 py-5`}>
            <Text className="text-base font-bold text-mainWhite">Go to Bookshelf</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}
