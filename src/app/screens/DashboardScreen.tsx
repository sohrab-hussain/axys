import React, { useEffect, useState } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

// const { width, height } = Dimensions.get('window');

const DashboardScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
          const parsedObject = JSON.parse(value);
          console.log('Retrieved data:', parsedObject);
          setUser(parsedObject);
          // If you need to use this data, set it in state
          // setUserData(parsedObject);
        }
      } catch (e) {
        console.error('Failed to fetch the data', e);
      }
    };

    fetchData();
  }, [user]);

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
            <Text style={styles.title}>Welcome , </Text>
            <Text style={styles.title}>
              {user?.firstName + ' ' + user?.lastName}{' '}
            </Text>
          </View>
          <View style={{flex: 1}}/>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={() => {
                // navigation?.navigate('Home');
                navigation?.reset({
                  index: 0,
                  routes: [{ name: 'Home' }],
                });
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>{t('logout')}</Text>
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
    paddingTop: 60,
    flex: 1,
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
    width: '100%',
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

export default DashboardScreen;
