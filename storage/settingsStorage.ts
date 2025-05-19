import AsyncStorage from '@react-native-async-storage/async-storage';
import { Settings } from '../models/Settings';

const SETTINGS_KEY = 'app-settings';

export const loadSettings = async (): Promise<Settings> => {
  const json = await AsyncStorage.getItem(SETTINGS_KEY);
  if (json) return JSON.parse(json);
  return {
    darkMode: false,
    showNSFW: false,
    backupEnabled: false,
  };
};

export const saveSettings = async (settings: Settings) => {
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};
