import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStackParamList } from './lib/nav';
import { colors } from './lib/theme';
import { SessionProvider } from './lib/store';
import AdaptiveScreen from './screens/AdaptiveScreen';
import AyushScreen from './screens/AyushScreen';
import ConsentScreen from './screens/ConsentScreen';
import ConversationScreen from './screens/ConversationScreen';
import DashboardScreen from './screens/DashboardScreen';
import LanguageScreen from './screens/LanguageScreen';
import PatientInfoScreen from './screens/PatientInfoScreen';
import ProcessingScreen from './screens/ProcessingScreen';
import RedFlagScreen from './screens/RedFlagScreen';
import ScanScreen from './screens/ScanScreen';
import SuccessScreen from './screens/SuccessScreen';
import WelcomeScreen from './screens/WelcomeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  // Preload icon fonts for web - required for icons to display correctly
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SessionProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
              contentStyle: { backgroundColor: colors.canvas },
            }}
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ animation: 'fade' }} />
            <Stack.Screen name="Language" component={LanguageScreen} />
            <Stack.Screen name="Consent" component={ConsentScreen} />
            <Stack.Screen name="PatientInfo" component={PatientInfoScreen} options={{ animation: 'slide_from_bottom' }} />
            <Stack.Screen name="Conversation" component={ConversationScreen} />
            <Stack.Screen name="Adaptive" component={AdaptiveScreen} />
            <Stack.Screen name="Scan" component={ScanScreen} />
            <Stack.Screen name="Processing" component={ProcessingScreen} options={{ animation: 'fade_from_bottom' }} />
            <Stack.Screen name="RedFlag" component={RedFlagScreen} options={{ animation: 'fade' }} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Ayush" component={AyushScreen} />
            <Stack.Screen name="Success" component={SuccessScreen} options={{ animation: 'fade', gestureEnabled: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SessionProvider>
    </SafeAreaProvider>
  );
}
