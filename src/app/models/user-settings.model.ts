export interface UserSettings {
  appPassword: string | null;
}

export const userSettingsKey = '4k-wall-scroll-user-settings';

export function storeSettings(settings: UserSettings): void {
  const serializedState = JSON.stringify(settings);

  localStorage.setItem(userSettingsKey, serializedState);
}

export function retrieveSettings(): UserSettings {
  const serializedSettings = localStorage.getItem(userSettingsKey);

  if (serializedSettings) {
    const parsed: UserSettings = JSON.parse(serializedSettings);

    return {
      ...parsed,
    };
  } else {
    return {
      appPassword: '',
    };
  }
}
