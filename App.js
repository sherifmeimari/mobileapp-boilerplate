import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

import AuthContextProvider, { AuthContext } from './store/auth-context';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import IconButton from './components/ui/IconButton';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

// Not rendered at all initially
// we wait until we are authenticated to render those screens
// Screen Protection with AuthContext state
function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [finishedTryingLogin, setFinishedTryingLogin] = useState(false);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    // on App start, we fetch the token (if not expired) from the local storage
    async function fetchToken() {
      try {
        const storedToken = await SecureStore.getItem('token');
        if (storedToken) {
          authCtx.authenticate(storedToken);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setFinishedTryingLogin(true);
      }
    }
    fetchToken();
  }, []);

  useEffect(() => {
    if (finishedTryingLogin) {
      SplashScreen.hide();
    }
  }, [finishedTryingLogin]);

  if (!finishedTryingLogin) {
    return null;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      {/* since context is provided here in this App component, we cannot change it here
      workaround to manipulate the context (with useEffect) is to do this in another component -> Root  */}
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
