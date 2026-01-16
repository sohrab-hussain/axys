import React, { useState } from 'react';
import {
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { UserDetailsScreenProps } from '../../navigation/types.ts';
import { useTranslation } from 'react-i18next';

// interface UserDetailsScreenProps {
//   navigation?: any;
// }

const UserDetailsScreen: React.FC<UserDetailsScreenProps> = ({
  navigation,
}) => {
  const [firstName, setFirstName] = useState('Sohrab');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('Hussain');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [nationality, setNationality] = useState('United States of America');
  const [password, setPassword] = useState('Ajman@2023');
  const [confirmPassword, setConfirmPassword] = useState('Ajman@2023');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showNationalityPicker, setShowNationalityPicker] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const { t } = useTranslation();
  const countries = [
    'United States of America',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'India',
    'Brazil',
    'Mexico',
  ];

  const formatDate = (date: Date) => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  const validatePassword = (pass: string) => {
    if (pass.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (!/(?=.*[a-z])/.test(pass)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/(?=.*[A-Z])/.test(pass)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/(?=.*\d)/.test(pass)) {
      return 'Password must contain at least one number';
    }
    return '';
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    const error = validatePassword(text);
    setPasswordError(error);

    // Check confirm password match if it's already filled
    if (confirmPassword && text !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else if (confirmPassword) {
      setConfirmPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    if (text !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleNext = () => {
    // Validate all fields before submitting
    if (passwordError || confirmPasswordError) {
      return;
    }

    console.log({
      firstName,
      middleName,
      lastName,
      dateOfBirth: formatDate(dateOfBirth),
      nationality,
      password,
    });
    navigation?.navigate('BiometricsSetup');
  };

  const isButtonDisabled =
    !firstName ||
    !lastName ||
    !password ||
    !confirmPassword ||
    !!passwordError ||
    !!confirmPasswordError;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t('letsKnow')}</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.form}>
          {/* First Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('firstName')}</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="John"
              placeholderTextColor="#666"
              autoCapitalize="words"
            />
          </View>

          {/* Middle Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('middleName')}</Text>
            <TextInput
              style={styles.input}
              value={middleName}
              onChangeText={setMiddleName}
              placeholder=""
              placeholderTextColor="#666"
              autoCapitalize="words"
            />
          </View>

          {/* Last Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('lastName')}</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Doe"
              placeholderTextColor="#666"
              autoCapitalize="words"
            />
          </View>

          {/* Date of Birth */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('dob')}</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>{formatDate(dateOfBirth)}</Text>
              <Text style={styles.calendarIcon}>📅</Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              maximumDate={new Date()}
              textColor="#fff"
            />
          )}

          {/* Nationality */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('nationality')}</Text>
            {Platform.OS === 'ios' ? (
              <>
                <TouchableOpacity
                  style={styles.pickerButton}
                  onPress={() => setShowNationalityPicker(true)}
                >
                  <Text style={styles.pickerButtonText}>{nationality}</Text>
                  <Text style={styles.dropdownIcon}>▼</Text>
                </TouchableOpacity>

                <Modal
                  visible={showNationalityPicker}
                  transparent={true}
                  animationType="slide"
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <View style={styles.modalHeader}>
                        <TouchableOpacity
                          onPress={() => setShowNationalityPicker(false)}
                        >
                          <Text style={styles.modalButton}>{t('done')}</Text>
                        </TouchableOpacity>
                      </View>
                      <Picker
                        selectedValue={nationality}
                        onValueChange={value => setNationality(value)}
                        style={styles.picker}
                      >
                        {countries.map(country => (
                          <Picker.Item
                            key={country}
                            label={country}
                            value={country}
                            color="#fff"
                          />
                        ))}
                      </Picker>
                    </View>
                  </View>
                </Modal>
              </>
            ) : (
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={nationality}
                  onValueChange={value => setNationality(value)}
                  style={styles.androidPicker}
                  dropdownIconColor="#666"
                >
                  {countries.map(country => (
                    <Picker.Item
                      key={country}
                      label={country}
                      value={country}
                    />
                  ))}
                </Picker>
              </View>
            )}
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('password')}</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={handlePasswordChange}
                placeholder="Enter password"
                placeholderTextColor="#666"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeIconText}>
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </Text>
              </TouchableOpacity>
            </View>
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
            <Text style={styles.helperText}>
              {t('passwordValidationError')}
            </Text>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('confirmPassword')}</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={confirmPassword}
                onChangeText={handleConfirmPasswordChange}
                placeholder="Re-enter password"
                placeholderTextColor="#666"
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Text style={styles.eyeIconText}>
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </Text>
              </TouchableOpacity>
            </View>
            {confirmPasswordError ? (
              <Text style={styles.errorText}>{confirmPasswordError}</Text>
            ) : null}
          </View>
        </View>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Next Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
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
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 20,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: -0.5,
  },
  form: {
    gap: 24,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
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
  dateInput: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#fff',
  },
  calendarIcon: {
    fontSize: 18,
  },
  pickerButton: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#666',
  },
  pickerContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    overflow: 'hidden',
  },
  androidPicker: {
    color: '#fff',
    backgroundColor: '#1a1a1a',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 34,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  modalButton: {
    fontSize: 17,
    color: '#6c5ce7',
    fontWeight: '600',
  },
  picker: {
    backgroundColor: '#1a1a1a',
  },
  passwordContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#fff',
  },
  eyeIcon: {
    paddingHorizontal: 12,
  },
  eyeIconText: {
    fontSize: 20,
  },
  errorText: {
    fontSize: 12,
    color: '#ff4444',
    marginTop: 4,
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  spacer: {
    flex: 1,
    minHeight: 40,
  },
  footer: {
    paddingBottom: 60,
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

export default UserDetailsScreen;
