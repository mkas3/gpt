import { create } from 'zustand';
import * as FileSystem from 'expo-file-system';

type Settings = {
  readonly model: string;
};

type UserSettingsStore = {
  readonly settings: Settings;
  isFetched: boolean;
  setSettings: (value: Settings) => void;
  fetchStorageSettings: () => Promise<void>;
  saveSettings: () => Promise<void>;
};

const settingsFile = FileSystem.cacheDirectory + 'settings.json';

export const useUserSettingsStore = create<UserSettingsStore>((set, get) => ({
  settings: {
    model: 'gpt-4',
  },
  isFetched: false,
  setSettings: (value) => {
    set({ settings: value });
  },
  fetchStorageSettings: async () => {
    if (get().isFetched) return;
    const fileInfo = await FileSystem.getInfoAsync(settingsFile);
    if (!fileInfo.exists) return;
    const settings = await FileSystem.readAsStringAsync(settingsFile);
    if (!settings) return;
    set({ settings: JSON.parse(settings) });
  },
  saveSettings: async () => {
    if (!get().isFetched) return;
    await FileSystem.writeAsStringAsync(
      settingsFile,
      JSON.stringify(get().settings),
    );
  },
}));
