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
import ManagePreferencesModal from './screens/ManagePreferencesModal';
import PreferencesScreen from './screens/PreferencesScreen';
import ChatsScreen from './screens/ChatsScreen';
import ChatScreen from './screens/ChatScreen';
import ContentDetailsScreen from './screens/ContentDetailsScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import SearchScreen from './screens/SearchScreen';
import SavedScreen from './screens/SavedScreen';
import { Colors } from './constants/styles';
import IconButton from './components/ui/IconButton';
import PreferencesContextProvider from './store/preferences-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReactQueryDevTools } from '@dev-plugins/react-query';

const queryClient = new QueryClient();
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

function BottomTabsNavigator() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        tabBarActiveTintColor: Colors.primary500,
        contentStyle: { backgroundColor: Colors.primary100 },
        // tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          paddingTop: 6,
          paddingBottom: 14,
        },

        // Make the icon itself larger
        tabBarIconStyle: {
          flex: 1,
        },
      }}
    >
      <BottomTabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={32} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Search"
        component={SearchScreen}
        options={({ navigation }) => ({
          title: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={32} color={color} />
          ),
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="bookmark-outline"
              size={24}
              color={tintColor}
              onPress={() => navigation.navigate('Saved')}
            />
          ),
        })}
      />
      <BottomTabs.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          title: 'Chats',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="send" size={32} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Account"
        component={MyAccountScreen}
        options={({ navigation }) => ({
          title: 'My Account',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={32} color={color} />
          ),
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="menu"
              size={24}
              color={tintColor}
              onPress={() => navigation.navigate('Preferences')}
            />
          ),
        })}
      />
    </BottomTabs.Navigator>
  );
}

// Not rendered at all initially
// we wait until we are authenticated to render those screens
// Screen Protection with AuthContext state
function AuthenticatedStack() {
  return (
    <PreferencesContextProvider>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: 'white',
          contentStyle: { backgroundColor: Colors.primary100 },
        }}
      >
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabsNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={ContentDetailsScreen}
          options={({ navigation }) => ({
            title: 'Details',
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
          name="Saved"
          component={SavedScreen}
          options={({ navigation }) => ({
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
          name="Chat"
          component={ChatScreen}
          options={({ navigation }) => ({
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
          name="Preferences"
          component={PreferencesScreen}
          options={({ navigation }) => ({
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
        <Stack.Screen
          name="ManagePreferences"
          component={ManagePreferencesModal}
          options={({ navigation }) => ({
            presentation: 'modal',
            title: 'Manage Preferences',
            headerLeftBackgroundVisible: false,
            unstable_headerLeftItems: () => [
              {
                type: 'custom',
                element: (
                  <IconButton
                    icon="arrow-down-right-box-outline"
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
          name="DetailsScreen"
          component={ContentDetailsScreen}
          options={({ navigation }) => ({
            title: 'Details',
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
    </PreferencesContextProvider>
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
  useReactQueryDevTools(queryClient);
  return (
    <>
      {/* since context is provided here in this App component, we cannot change it here
      workaround to manipulate the context (with useEffect) is to do this in another component -> Root  */}
      <StatusBar style="light" />
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Root />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}
