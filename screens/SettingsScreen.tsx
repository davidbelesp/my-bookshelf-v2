import { useEffect, useState } from 'react';
import { View, Text, Pressable, Switch, ScrollView } from 'react-native';
import { Settings } from '../models/Settings';
import { loadSettings, saveSettings } from '../storage/settingsStorage';
import { useTheme } from '../theme/ThemeContext';

export default function SettingsScreen() {
  const { dark, toggleTheme } = useTheme();

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
    <View className="flex-1 p-4">
      {/* Tabs */}
      <View className="mb-4 flex-row border-b border-gray-300">
        <Pressable
          onPress={() => setTab('config')}
          className={`px-4 py-2 ${tab === 'config' ? 'border-b-2 border-blue-600' : ''}`}>
          <Text className="font-semibold">Config</Text>
        </Pressable>
        <Pressable
          onPress={() => setTab('db')}
          className={`px-4 py-2 ${tab === 'db' ? 'border-b-2 border-blue-600' : ''}`}>
          <Text className="font-semibold">DB</Text>
        </Pressable>
      </View>

      {/* Tab Content */}
      <ScrollView>
        {tab === 'config' && (
          <>
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-base">Dark Mode</Text>
              <Switch
                value={dark}
                onValueChange={(v) => {
                  updateSetting('darkMode', v)
                  toggleTheme();
                }}
              />
            </View>

            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-base">Show NSFW</Text>
              <Switch
                value={settings.showNSFW}
                onValueChange={(v) => updateSetting('showNSFW', v)}
              />
            </View>

            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-base">Censor NSFW</Text>
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
              <Text className="text-base">Enable Backup</Text>
              <Switch
                value={settings.backupEnabled}
                onValueChange={(v) => updateSetting('backupEnabled', v)}
              />
            </View>
            {/* More DB settings here */}
          </>
        )}
      </ScrollView>
    </View>
  );
}
