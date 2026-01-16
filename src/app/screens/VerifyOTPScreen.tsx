import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { VerifyOTPScreenProps } from '../../navigation/types.ts';
import { t } from 'i18next';

const VerifyOTPScreen: React.FC<VerifyOTPScreenProps> = ({
  route,
}) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const email = route?.params?.route?.params?.email || 'sohrab@gmail.com';

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleCodeChange = (text: string, index: number) => {
    // Only allow numbers
    if (text && !/^\d+$/.test(text)) return;

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all 6 digits are entered
    if (text && index === 5 && newCode.every(digit => digit !== '')) {
      handleVerify(newCode.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (verificationCode: string) => {
    console.log('Verifying code:', verificationCode);
    // Add your verification logic here
    // navigation?.navigate('NextScreen');
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(60);
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      console.log('Resending code...');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Safe/Lock Icon */}
        <View style={styles.iconContainer}>
          <Image
            source={require('../../images/verify-email.png')}
            style={{ width: 120, height: 120 }}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>{t('verifyYourEmail')}</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          {t('weHaveSent') + email + t('theCodeExpire')}
        </Text>

        {/* Code Input Boxes */}
        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputRefs.current[index] = ref)}
              style={[styles.codeInput, digit && styles.codeInputFilled]}
              value={digit}
              onChangeText={text => handleCodeChange(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              autoFocus={index === 0}
            />
          ))}
        </View>

        {/* Resend Code */}
        <TouchableOpacity
          onPress={handleResend}
          disabled={timer > 0}
          activeOpacity={0.7}
        >
          <Text
            style={[styles.resendText, timer > 0 && styles.resendTextDisabled]}
          >
            {timer > 0
              ? `Resend code in ${formatTime(timer)}`
              : t('resendCode')}
          </Text>
        </TouchableOpacity>
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
    paddingTop: 40,
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    marginBottom: 40,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeOuter: {
    width: 120,
    height: 120,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  safeInner: {
    width: 90,
    height: 90,
    backgroundColor: '#0a0a0a',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  codeInput: {
    width: 48,
    height: 56,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  codeInputFilled: {
    borderColor: '#6c5ce7',
    backgroundColor: '#1a1a1f',
  },
  resendText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  resendTextDisabled: {
    color: '#666',
  },
});

export default VerifyOTPScreen;
