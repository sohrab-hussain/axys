import React from 'react';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import type { HomeScreenProps } from '../../navigation/types';

// const { width, height } = Dimensions.get('window');

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  // const { changeLanguage, currentLanguage } = useLanguage();
  const handleLoginButton = () => {
    navigation?.navigate('Login');
  };

  const handleSignUpButton = () => {
     navigation?.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background Image with Globe and Plane */}
      <ImageBackground
        source={require('../../images/home-background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Content */}
        <View style={styles.content}>
          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Axys to</Text>
            <Text style={styles.title}>Neo Thinkers</Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            {/* Primary Button (White) */}
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={handleLoginButton}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>{t('login')}</Text>
            </TouchableOpacity>

            {/* Secondary Button (Transparent with border) */}
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={handleSignUpButton}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>{t('signup')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 60,
    flex: 1,
    justifyContent: 'flex-end',
  },
  titleContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -1,
    lineHeight: 56,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
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
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: 0.3,
  },
  secondaryButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});

export default HomeScreen;
