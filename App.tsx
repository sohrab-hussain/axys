import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import './src/i18n/i18n';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator.tsx';

const App: React.FC = () => {
  const { i18n } = useTranslation();
  // const { changeLanguage, currentLanguage } = useLanguage();
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

  return <AppNavigator />;
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
