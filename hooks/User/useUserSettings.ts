import {useUserSettingsStore} from '../../store/User/user-settings.store';

export const useUserSettings = () => {
	return useUserSettingsStore(state => ({
		settings: state.settings,
		setSettings: state.setSettings,
		fetchStorageSettings: state.fetchStorageSettings,
		saveSettings: state.saveSettings
	}));
}