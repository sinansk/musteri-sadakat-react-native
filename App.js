import React from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons'; // Iconları eklemek için kullanılan kütüphane
import { useSelector } from 'react-redux';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import ProfileScreen from './Screens/ProfileScreen';
import RequestsScreen from './Screens/RequestsScreen';
import { Provider } from 'react-redux';
import { store } from "./redux/store";
import LogoutScreen from './Screens/LogoutScreen';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './Screens/RegisterScreen';
import ForgotPasswordScreen from './Screens/ForgotPasswordScreen';
import Toast from 'react-native-toast-message';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function StackNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
      }}>
      <Stack.Screen name="Tab" component={TabNav} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

function TabNav() {
  const user = useSelector(state => state.userSlice.user);
  const isLoggedIn = !!user;
  return (
    <Tab.Navigator
      initialRouteName={"Login"}
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: [
          {
            display: isLoggedIn ? 'flex' : 'none',
          },
          null,
        ],
        headerShown: false,
        headerTitle: ''
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
        }}

      />
      <Tab.Screen
        name="Requests"
        component={RequestsScreen}
        options={{
          tabBarLabel: 'Requests',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="shopping-cart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={"Login"}
        component={isLoggedIn ? LogoutScreen : LoginScreen}
        options={{
          tabBarLabel: isLoggedIn ? 'Logout' : 'Login',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name={isLoggedIn ? "sign-out-alt" : "user-circle"} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
      <Toast />
    </SafeAreaView>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' | Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
  },
});
