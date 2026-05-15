import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, KeyboardAvoidingView,
  Platform, ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.illustrationBox}>
          <Image
            source={require('../../../src/assets/icon_green.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <View style={styles.formBox}>
          <Text style={styles.sectionLabel}>Email</Text>
          <View style={styles.inputRow}>
            <MaterialIcons name="mail-outline" size={18} color="#6aaa85" />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#a8c9b5"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Text style={[styles.sectionLabel, { marginTop: 16 }]}>Password</Text>
          <View style={styles.inputRow}>
            <MaterialIcons name="lock-outline" size={18} color="#6aaa85" />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#a8c9b5"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(p => !p)}>
              <MaterialIcons
                name={showPassword ? 'visibility' : 'visibility-off'}
                size={18}
                color="#6aaa85"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f7f0' },
  scroll: { flexGrow: 1 },
  illustrationBox: {
    height: 220,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#d4edda',
  },
  illustration: { width: 180, height: 170 },
  formBox: { flex: 1, padding: 28, gap: 6 },
  sectionLabel: {
    fontSize: 12, fontWeight: '500',
    color: '#4a7c5f', letterSpacing: 0.3,
  },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    borderBottomWidth: 1.5, borderBottomColor: '#b2d8c0',
    paddingVertical: 10, paddingHorizontal: 4, gap: 10,
  },
  input: { flex: 1, fontSize: 14, color: '#1a1a1a' },
  btn: {
    backgroundColor: '#2e8b57', borderRadius: 8,
    paddingVertical: 15, alignItems: 'center', marginTop: 24,
  },
  btnText: { color: '#fff', fontSize: 15, fontWeight: '500' },
  footer: {
    flexDirection: 'row', justifyContent: 'center',
    marginTop: 16,
  },
  footerText: { fontSize: 12, color: '#6b7280' },
  footerLink: { fontSize: 12, color: '#2e8b57', fontWeight: '500' },
});

export default Login;