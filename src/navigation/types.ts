import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// Define your navigation stack parameters
export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  // Profile: { userId: string; name?: string };
  UserDetails: { email?: string };
  Login: undefined;
  SignUp: undefined;
  BiometricsSetup: undefined;
  Dashboard: undefined;
  VerifyOTP: {
    email?: string;
  };
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
export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;
export type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export type VerifyOTPScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'VerifyOTP'
>;

export type UserDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'UserDetails'
>;

export type BiometricsSetupScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'BiometricsSetup'
>;

// Declare global types for navigation
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
