import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StyleSheet, View, Dimensions } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import ControlPad from './ControlPad';
import MainView from './MainView';
import { PsyMemoryProvider } from '@/contexts/PsyMemoryContext';
import ContextBar from '@/contexts/ContextBar';
import ColorThemes from "@/styles/variables/ColorThemes";
import { Platform } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const ControlPadHeight = 250;
  const [foundationHeight, setFoundationHeight] = useState(Dimensions.get('window').height);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    FacultyGlyphic: require('@/assets/fonts/FacultyGlyphic-Regular.ttf'),
  });

  // Components
  const GetDeviceHeight = ({children} : {children:React.ReactNode}) => {
    return(
      <View
      style={Styles.Foundation}
      onLayout={(event) => {
      const { height } = event.nativeEvent.layout;
      setFoundationHeight(height);
      }}>
        {children}
      </View>
    )
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PsyMemoryProvider>
        <StatusBar style={"auto"} hidden={true} />
        <GetDeviceHeight>
          <View style={Platform.OS === 'web' ? Styles.AlignForWeb : Styles.AlignForIOS}>
            <ContextBar />
            <View style={{flex: 1}}>
              <View style={[Styles.MainViewDimensions, {height: (foundationHeight - ControlPadHeight) }]}>
                <MainView/>
              </View>
              <View style={[Styles.ControlPadDimensions, {height: ControlPadHeight}]}>
                <ControlPad/>
              </View>
            </View>
          </View>
        </GetDeviceHeight>
      </PsyMemoryProvider>
    </ThemeProvider>
  );
};

const Styles = StyleSheet.create({
  Foundation: {
    backgroundColor: ColorThemes.dark,
    width: '100%',
    height: '100%'
  },
  AlignForWeb: {
    flexDirection: 'column-reverse',
    height: '100%'
  },
  AlignForIOS: {
    flexDirection: 'column',
    height: '100%'
  },
  MainViewDimensions: {
    flex: 1, //update dimensions as device is rotated
    width: '100%'
  },
  ControlPadDimensions: {
    width: '100%'
  }
})


/*
      <View
      style={Styles.Foundation}
      onLayout={(event) => {
      const { height } = event.nativeEvent.layout;
      setFoundationHeight(height);
      }}></View>
*/