import React, { useEffect } from 'react';
import { useUserStore } from '../../../store/User/user.store';
import { useUserSettings } from '../../../hooks/User/useUserSettings';
import { useUserSettingsStore } from '../../../store/User/user-settings.store';

type SettingsProviderProps = {
  children?: React.ReactNode;
};

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [settings, fetchStorageSettings, saveSettings] = useUserSettingsStore((state) => [
    state.settings,
    state.fetchStorageSettings,
		state.saveSettings,
  ]);

  useEffect(() => {
		saveSettings();
	}, [settings]);

	useEffect(() => {
		fetchStorageSettings();
	}, []);

  return <>{children}</>;
};
