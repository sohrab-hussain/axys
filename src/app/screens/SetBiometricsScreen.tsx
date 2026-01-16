import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BiometricsSetupScreenProps } from '../../navigation/types.ts';
import { t } from 'i18next';

const BiometricsSetupScreen: React.FC<BiometricsSetupScreenProps> = ({
  navigation,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkBiometrics();
  }, []);

  const checkBiometrics = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const { available, biometryType } =
        await rnBiometrics.isSensorAvailable();

      if (available && biometryType) {
        // setBiometricType(biometryType);
        console.log('Biometry type available:', biometryType);
      } else {
        // No biometrics available, skip to home
        Alert.alert(
          'Biometrics Not Available',
          'Your device does not support biometric authentication.',
          [
            {
              text: 'OK',
              onPress: () => navigation?.navigate('Home'),
            },
          ],
        );
      }
    } catch (error) {
      console.error('Biometric check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnableBiometrics = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();

      // Create keys for biometric authentication
      const { publicKey } = await rnBiometrics.createKeys();
      console.log('Public key created:', publicKey);

      // Prompt for biometric authentication
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate to enable biometrics',
        cancelButtonText: 'Cancel',
      });

      if (success) {
        // Save biometric preference
        await AsyncStorage.setItem('biometricsEnabled', 'true');
        await AsyncStorage.setItem('biometricPublicKey', publicKey);
        navigation?.navigate('Dashboard');
        // Alert.alert('Success!', 'Biometric authentication has been enabled', [
        //   {
        //     text: 'OK',
        //     onPress: () => navigation?.navigate('Dashboard'),
        //   },
        // ]);
      } else {
        Alert.alert('Cancelled', 'Biometric setup was cancelled');
      }
    } catch (error: any) {
      console.error('Biometric enrollment error:', error);
      Alert.alert(
        'Error',
        error.message || 'Could not enable biometric authentication',
      );
    } finally {
    }
  };

  const handleSkip = async () => {
    try {
      await AsyncStorage.setItem('biometricsEnabled', 'false');
      navigation?.navigate('Dashboard');
    } catch (error) {
      console.error('Error saving preference:', error);
      navigation?.navigate('Home');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={[styles.content, { justifyContent: 'center' }]}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Biometric Icons */}
        <View style={styles.iconContainer}>
          {/* Face ID Icon */}
          <View style={styles.faceIdContainer}>
            <Image
              source={require('../../images/face-id.png')}
              style={{ width: 60, height: 60 }}
              resizeMode="contain"
            />
          </View>

          {/* Fingerprint Icon */}
          <View style={styles.fingerprintContainer}>
            <Image
              source={require('../../images/fingerprint.png')}
              style={{ width: 60, height: 60 }}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>{t('setupBiometrics')}</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>{t('useBiometrics')}</Text>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={handleEnableBiometrics}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>{t('proceed')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={handleSkip}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>{t('skip')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    marginBottom: 60,
  },
  faceIdContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceIdFrame: {
    width: 70,
    height: 70,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#fff',
    borderWidth: 3,
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  face: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyes: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  eye: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  mouth: {
    width: 20,
    height: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: '#fff',
  },
  fingerprintContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  fingerprintOuter: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fingerprintMiddle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 3,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fingerprintInner: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fingerprintCore: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  fingerprintLine: {
    position: 'absolute',
    height: 3,
    backgroundColor: '#fff',
    borderRadius: 1.5,
  },
  line1: {
    width: 35,
    top: 15,
    left: 22,
    transform: [{ rotate: '-45deg' }],
  },
  line2: {
    width: 30,
    bottom: 15,
    right: 22,
    transform: [{ rotate: '-45deg' }],
  },
  line3: {
    width: 35,
    top: 15,
    right: 22,
    transform: [{ rotate: '45deg' }],
  },
  line4: {
    width: 30,
    bottom: 15,
    left: 22,
    transform: [{ rotate: '45deg' }],
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#999',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  biometricType: {
    fontSize: 14,
    color: '#6c5ce7',
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '500',
  },
  spacer: {
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
    paddingBottom: 60,
  },
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  secondaryButton: {
    backgroundColor: '#333',
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    letterSpacing: 0.3,
  },
  secondaryButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.3,
  },
});

export default BiometricsSetupScreen;
