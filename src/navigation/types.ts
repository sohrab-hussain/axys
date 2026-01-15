import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// Define your navigation stack parameters
export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  Profile: { userId: string; name?: string };
  Details: { itemId: number };
};

// Helper types for screens
export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
export type SettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Settings'
>;


// Declare global types for navigation
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
