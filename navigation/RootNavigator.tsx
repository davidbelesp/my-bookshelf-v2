import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useTheme } from '../theme/ThemeContext';
// Importing the screens
import HomeScreen from '../screens/HomeScreen';
import BookListScreen from '../screens/BookListScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddBookScreen from '../screens/AddBookScreen';
import EditBookScreen from 'screens/EditBookScreen';
import StatisticsScreen from 'screens/StatisticsScreen';
import HomeHeader from 'components/HomeHeader';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.main,
        },
        headerTitleStyle: {
          color: colors.mainWhite,
        },
        headerTintColor: colors.mainWhite,
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: () => <HomeHeader onConfigPress={() => navigation.navigate('Settings')} />,
          headerStyle: { backgroundColor: colors.main },
          headerTitleAlign: 'center',
        })}
      />

      <Stack.Screen name="AddBook" component={AddBookScreen} />
      <Stack.Screen
        name="Books"
        component={BookListScreen}
        options={{
          headerStyle: { backgroundColor: '#2d50a0' },
        }}
      />
      <Stack.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          title: "Statistics",
        }}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="EditBook" component={EditBookScreen} />
    </Stack.Navigator>
  );
}
