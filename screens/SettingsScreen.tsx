import { useEffect, useState } from 'react';
import { View, Text, Pressable, Switch, ScrollView, Alert } from 'react-native';
import { Settings } from '../models/Settings';
import { loadSettings, saveSettings } from '../storage/settingsStorage';
import { useTheme } from '../theme/ThemeContext';
import { TextInput } from 'react-native-gesture-handler';
import { saveBooks } from 'storage/bookStorage';

export default function SettingsScreen() {
  const { dark, toggleTheme } = useTheme();
  const [importText, setImportText] = useState('');

  const handleImport = async () => {
    try {
      const parsed = JSON.parse(importText);
      if (!Array.isArray(parsed)) throw new Error('Not an array');
      // Optionally: Validate each book item shape here!

      // Example: Transform to your new BookModel shape
      const books = parsed.map((b) => ({
        uuid: typeof b.uuid === "string" ? b.uuid : b.uuid.toString(),
        title: b.title,
        type: b.type,
        comments: Array.isArray(b.comments)
          ? b.comments
          : b.comments
          ? [b.comments]
          : [],
        score: b.score,
        chapter: b.chapter,
        volume: b.volume,
        image: "",
        state: b.state || b.status,
        nsfw: !!b.nsfw,
        lastRead: b.lastRead || Date.now(),
      }));

      await saveBooks(books);
      Alert.alert('Success', 'Books imported!');
      setImportText('');
    } catch (e: any) {
      console.error('Import error:', e);
      Alert.alert('Import failed', e.message);
    }
  };

  const [settings, setSettings] = useState<Settings>({
    darkMode: false,
    showNSFW: false,
    backupEnabled: false,
    censorNSFW: false,
  });
  const [tab, setTab] = useState<'config' | 'db'>('config');

  useEffect(() => {
    loadSettings().then(setSettings);
  }, []);

  const updateSetting = (key: keyof Settings, value: boolean) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    saveSettings(updated);
  };

  return (
    <View className={`flex-1 p-4 ${dark ? 'bg-dark_mainCard' : 'bg-mainScreenBg'}`}>
      {/* Tabs */}
      <View className="mb-4 flex-row border-b border-gray-300">
        <Pressable
          onPress={() => setTab('config')}
          className={`px-4 py-2 ${tab === 'config' ? dark ? 'border-b-2 border-mainScore' : 'border-b-2 border-dark_main' : ''}`}>
          <Text className={`font-semibold ${dark ? 'text-white' : 'text-black'}`}>Config</Text>
        </Pressable>
        <Pressable
          onPress={() => setTab('db')}
          className={`px-4 py-2 ${tab === 'db' ? dark ? 'border-b-2 border-mainScore' : 'border-b-2 border-dark_main' : ''}`}>
          <Text className={`font-semibold ${dark ? 'text-white' : 'text-black'}`}>DB</Text>
        </Pressable>
      </View>

      {/* Tab Content */}
      <ScrollView>
        {tab === 'config' && (
          <>
            <View className="mb-4 flex-row items-center justify-between">
              <Text className={`text-base ${dark ? 'text-white' : 'text-black'}`}>Dark Mode</Text>
              <Switch
                value={dark}
                onValueChange={(v) => {
                  updateSetting('darkMode', v);
                  toggleTheme();
                }}
              />
            </View>

            <View className="mb-4 flex-row items-center justify-between">
              <Text className={`text-base ${dark ? 'text-white' : 'text-black'}`}>Show NSFW</Text>
              <Switch
                value={settings.showNSFW}
                onValueChange={(v) => updateSetting('showNSFW', v)}
              />
            </View>

            <View className="mb-4 flex-row items-center justify-between">
              <Text className={`text-base ${dark ? 'text-white' : 'text-black'}`}>Censor NSFW</Text>
              <Switch
                value={settings.censorNSFW}
                onValueChange={(v) => updateSetting('censorNSFW', v)}
              />
            </View>
          </>
        )}

        {tab === 'db' && (
          <>
            <View className="mb-4 flex-row items-center justify-between">
              <Text className={`text-base ${dark ? 'text-white' : 'text-black'}`}>Enable Backup</Text>
              <Switch
                value={settings.backupEnabled}
                onValueChange={(v) => updateSetting('backupEnabled', v)}
              />
            </View>

            <View className="mb-4 flex-row items-center justify-between">
              <Pressable
                className="rounded bg-red-600 px-4 py-2"
                onPress={() => {
                  Alert.alert('Delete all books?', 'This action cannot be undone.', [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'Delete',
                      onPress: async () => {
                        await saveBooks([]);
                        Alert.alert('Success', 'All books deleted!');
                      },
                      style: 'destructive',
                    },
                  ]);
                }}>
                <Text className="text-center text-white">Delete All Books</Text>
              </Pressable>
            </View>
            {/* More DB settings here */}
            <View className="p-4">
              <Text className={`mb-2 font-semibold ${dark ? 'text-white' : 'text-black'}`}>Paste exported JSON here:</Text>
              <TextInput
                className={`mb-4 h-40 rounded border p-2 text-xs ${dark ? 'border-white text-black' : 'border-black text-white'}`}
                multiline
                value={importText}
                onChangeText={setImportText}
                placeholder="Paste your exported JSON data here"
                autoCorrect={false}
                autoCapitalize="none"
              />
              <Pressable className="rounded bg-main px-4 py-2" onPress={handleImport}>
                <Text className="text-center text-white">Import</Text>
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}
