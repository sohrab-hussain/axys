import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import type { SignUpScreenProps } from '../../navigation/types';
import { supabase } from '../../configs/supabase.ts';

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!email || !isChecked) return;

    setLoading(true);

    try {
      // Send OTP to email
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: {
          // Optional: customize email
          emailRedirectTo: undefined, // Not needed for mobile
        },
      });

      if (error) {
        Alert.alert('Error', error.message);
        return;
      }

      // Navigate to verification screen
      // navigation?.navigate('VerifyEmail', {
      //   email: email.trim().toLowerCase(),
      // });
      navigation?.navigate('VerifyOTP', { email: email.trim().toLowerCase() });
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }

    // if (email && isChecked) {
    //   navigation?.navigate('VerifyOTP', { email: email });
    // }
  };

  const isButtonDisabled = !email || !isChecked;

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>{t('createAccount')}</Text>
            <Text style={styles.subtitle}>{t('futureFinancialfreedom')}</Text>
          </View>

          {/* Email Input Section */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>{t('email')}</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder=""
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Spacer to push footer to bottom */}
          <View style={styles.spacer} />

          {/* Footer Section */}
          <View style={styles.footer}>
            {/* Checkbox and Terms */}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setIsChecked(!isChecked)}
              activeOpacity={0.7}
            >
              <View
                style={[styles.checkbox, isChecked && styles.checkboxChecked]}
              >
                {isChecked && <View style={styles.checkmark} />}
              </View>
              <Text style={styles.checkboxText}>
                {t('byCreating')}{' '}
                <Text style={styles.link}>{t('termsAndServices')}</Text>{' '}
                {t('and')} <Text style={styles.link}>{t('privacyPolicy')}</Text>
              </Text>
            </TouchableOpacity>

            {/* Next Button */}
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <TouchableOpacity
                style={[
                  styles.button,
                  isButtonDisabled && styles.buttonDisabled,
                ]}
                onPress={handleNext}
                disabled={isButtonDisabled}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.buttonText,
                    isButtonDisabled && styles.buttonTextDisabled,
                  ]}
                >
                  {t('next')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    backgroundColor: '#000',
    paddingBottom: 40
  },
  header: {
    paddingTop: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#999',
    lineHeight: 22,
  },
  inputSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  spacer: {
    flex: 1,
  },
  footer: {
    paddingBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#666',
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#6c5ce7',
    borderColor: '#6c5ce7',
  },
  checkmark: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  checkboxText: {
    flex: 1,
    fontSize: 13,
    color: '#999',
    lineHeight: 20,
  },
  link: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#333',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  buttonTextDisabled: {
    color: '#666',
  },
});

export default SignUpScreen;
