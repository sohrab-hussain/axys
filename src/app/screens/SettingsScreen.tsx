import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../i18n/useLanguage';
import type { SettingsScreenProps } from '../../navigation/types';
import type { Language } from '../../i18n/types';

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { changeLanguage, currentLanguage } = useLanguage();

  const handleLanguageChange = (lang: Language) => {
    changeLanguage(lang);
  };

  return (
    <View style={styles.container}>
      {/*<Text style={styles.title}>{t('settings')}</Text>*/}

      <Text style={styles.subtitle}>{t('changeLanguage')}</Text>

      <View style={styles.languageButtons}>
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

      <View style={styles.backButton}>
        <Button title="Back to Home" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    color: '#fff',
  },
  languageButtons: {
    gap: 10,
    marginTop: 10,
  },
  backButton: {
    marginTop: 40,
  },
});

export default SettingsScreen;
