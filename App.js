import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';

import AuthContextProvider, { AuthContext } from './store/auth-context';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import MyAccountScreen from './screens/MyAccountScreen';
import MyContentScreen from './screens/MyContentScreen';
import ManageContentModal from './screens/ManageContentModal';
import ChatScreen from './screens/ChatScreen';
import SettingsScreen from './screens/SettingsScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import { Colors } from './constants/styles';
import IconButton from './components/ui/IconButton';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

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

function Content() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="MyContent"
        component={MyContentScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageContent"
        component={ManageContentModal}
        options={{
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
}

function Account() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="MyAccount"
        component={MyAccountScreen}
        options={({ navigation }) => ({
          title: 'My Account',
          unstable_headerRightItems: () => [
            {
              type: 'custom',
              element: (
                <IconButton
                  icon="menu"
                  color="white"
                  size={28}
                  onPress={() => navigation.navigate('Settings')}
                />
              ),
              hidesSharedBackground: true,
            },
          ],
        })}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={({ navigation }) => ({
          title: 'Settings and activity',
          headerLeftBackgroundVisible: false,
          unstable_headerLeftItems: () => [
            {
              type: 'custom',
              element: (
                <IconButton
                  icon="chevron-back"
                  color="white"
                  size={28}
                  onPress={() => navigation.goBack()}
                />
              ),
              hidesSharedBackground: true,
            },
          ],
        })}
      />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: 'Favorites', headerLeftBackgroundVisible: false }}
      />
    </Stack.Navigator>
  );
}

function Home() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="MyHome"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Home',
          unstable_headerRightItems: () => [
            {
              type: 'custom',
              element: (
                <IconButton
                  icon="heart-outline"
                  color="white"
                  size={28}
                  onPress={() => navigation.navigate('Favorites')}
                />
              ),
              hidesSharedBackground: true,
            },
          ],
        })}
      />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={({ navigation }) => ({
          title: 'Favorites',
          headerLeftBackgroundVisible: false,
          unstable_headerLeftItems: () => [
            {
              type: 'custom',
              element: (
                <IconButton
                  icon="chevron-back"
                  color="white"
                  size={28}
                  onPress={() => navigation.goBack()}
                />
              ),
              hidesSharedBackground: true,
            },
          ],
        })}
      />
    </Stack.Navigator>
  );
}

// Not rendered at all initially
// we wait until we are authenticated to render those screens
// Screen Protection with AuthContext state
function AuthenticatedStack() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        tabBarActiveTintColor: Colors.primary500,
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <BottomTabs.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <BottomTabs.Screen
        name="Content"
        component={Content}
        options={({ navigation }) => ({
          title: 'My Content',
          tabBarLabel: 'My Content',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        })}
      />
      <BottomTabs.Screen
        name="ChatSupport"
        component={ChatScreen}
        options={({ navigation }) => ({
          title: 'Support',
          tabBarLabel: 'Support',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={size}
              color={color}
            />
          ),
        })}
      />
      <BottomTabs.Screen
        name="Account"
        component={Account}
        options={{
          title: 'My Account',
          tabBarLabel: 'My Account',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </BottomTabs.Navigator>
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
