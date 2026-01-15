import React, { useEffect, useState } from 'react';
import './src/i18n/i18n';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useLanguage } from './src/i18n/useLanguage';
import type { Language } from './src/i18n/types';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { changeLanguage, currentLanguage } = useLanguage();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for i18n to be initialized
    if (i18n.isInitialized) {
      setIsReady(true);
    } else {
      i18n.on('initialized', () => setIsReady(true));
    }
  }, [i18n]);

  if (!isReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const handleLanguageChange = (lang: Language) => {
    changeLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('welcome')}</Text>
      <Text style={styles.text}>{t('hello', { name: 'Sohrab' })}</Text>

      <Text style={styles.currentLang}>
        Current: {currentLanguage.toUpperCase()}
      </Text>

      <View style={styles.buttons}>
        <Button
          title="English"
          onPress={() => handleLanguageChange('en')}
          disabled={currentLanguage === 'en'}
        />
        <Button
          title="日本語"
          onPress={() => handleLanguageChange('ja')}
          disabled={currentLanguage === 'ja'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  currentLang: {
    fontSize: 14,
    color: '#666',
    marginVertical: 20,
  },
  buttons: {
    gap: 10,
    marginTop: 20,
  },
});

export default App;
