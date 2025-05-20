import React, { useState, useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { auth } from '../firebase.config';         // ← correct relative path
import { onAuthStateChanged, User } from 'firebase/auth';
import { Redirect } from 'expo-router';

export default function RootLayout() {             // ← **must** be a default export
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({ /* …fonts… */ });
  const [user, setUser] = useState<User|null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  if (!loaded) return null;
  if (!user)   return <Redirect href="/login" />;  // this will show your Login screen

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)"      options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}