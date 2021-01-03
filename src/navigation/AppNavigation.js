import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { MainScreen } from '../screens/MainScreen'
import { PostScreen } from '../screens/PostScreen'
import { BookedScreen } from '../screens/BookedScreen'
import { AboutScreen } from '../screens/AboutScreen'
import { CreateScreen } from '../screens/CreateScreen'
import { THEME } from '../theme'

const Stack = createStackNavigator();

function RootStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
        headerStyle: { backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff' }
      }}
    >
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={({ navigation }) => {
          return {
            headerTitle: 'My blog!!',
            headerRight: (props) => (
              <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item title='Add-circle' iconName='add-circle' onPress={() => console.log('Press add-circle')} />
                <Item title='Take photo' iconName='ios-camera' onPress={() => navigation.navigate('Create')} />
              </HeaderButtons>
            ),
            headerLeft: (props) => (
              <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item title='Toggle Drawer' iconName='ios-menu' onPress={() => navigation.toggleDrawer()} />
              </HeaderButtons>
            )
          }
        }}
      />
      <Stack.Screen
        name="Post"
        component={PostScreen}
        options={({ navigation, route }) => {

          const booked = route.params?.booked ?? false
          const iconName = booked ? 'ios-star' : 'ios-star-outline'

          return {
            headerTitle: 'Post №' + route.params?.postId + ' Date: ' + new Date(route.params?.date).toLocaleDateString(),
            headerTintColor: '#fff',
            headerStyle: { backgroundColor: 'red' },
            headerRight: (props) => (
              <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item title='Take photo' iconName={iconName} onPress={() => console.log('Press ios-star')} />
              </HeaderButtons>
            ),
          }
        }}
      // initialParams={{ title: 'PostScreen' }}
      />
    </Stack.Navigator >
  );
}
const StackBooked = createStackNavigator();

function StackBookedNavigator() {
  return (
    <StackBooked.Navigator
      initialRouteName="Booked"
      screenOptions={{
        headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
        headerStyle: { backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff' }
      }}
    >
      <StackBooked.Screen
        name="Booked"
        component={BookedScreen}
        options={({ navigation }) => {
          return {
            headerTitle: 'My Favorites',
            headerLeft: (props) => (
              <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item title='Toggle Drawer' iconName='ios-menu' onPress={() => navigation.toggleDrawer()} />
              </HeaderButtons>
            )
          }
        }}
      />
    </StackBooked.Navigator >
  );
}

const Tab = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Posts"
      tabBarOptions={{
        activeTintColor: Platform.OS === 'android' ? '#fff' : '#e91e63',
        inactiveTintColor: THEME.MAIN_COLOR,
        barStyle: { backgroundColor: THEME.MAIN_COLOR },
        shifting: true // не сработало:((( , по идее на Android убирает label не активных вкладок (если вкладок >3 то true по дефолту)
      }}
    >
      <Tab.Screen
        name="Posts"
        component={RootStackNavigator}
        options={{
          tabBarIcon: (info) => (
            <Ionicons name="ios-albums" size={25} color={info.color} />
          ),
          tabBarLabel: 'All'
        }}
      />
      <Tab.Screen
        name="Booked"
        component={StackBookedNavigator}
        options={() => {
          return {
            tabBarIcon: (info) => (
              <Ionicons name="ios-star" size={25} color={info.color} />
            ),
            tabBarLabel: 'Favorites'
          }
        }}
      />
    </Tab.Navigator>
  );
}

const StackAboutNavigator = createStackNavigator();

function StackAbout() {
  return (
    <StackAboutNavigator.Navigator
      initialRouteName="About"
      screenOptions={{
        headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
        headerStyle: { backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff' }
      }}
    >
      <StackAboutNavigator.Screen
        name="About"
        component={AboutScreen}
        options={({ navigation }) => {
          return {
            headerTitle: 'AboutScreen',
            headerLeft: (props) => (
              <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item title='Toggle Drawer' iconName='ios-menu' onPress={() => navigation.toggleDrawer()} />
              </HeaderButtons>
            )
          }
        }}
      />
    </StackAboutNavigator.Navigator >
  );
}
const StackCreateNavigator = createStackNavigator();

function StackCreate() {
  return (
    <StackCreateNavigator.Navigator
      initialRouteName="Create"
      screenOptions={{
        headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
        headerStyle: { backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff' }
      }}
    >
      <StackCreateNavigator.Screen
        name="Create"
        component={CreateScreen}
        options={({ navigation }) => {
          return {
            headerTitle: 'CreateScreen',
            headerLeft: (props) => (
              <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item title='Toggle Drawer' iconName='ios-menu' onPress={() => navigation.toggleDrawer()} />
              </HeaderButtons>
            )
          }
        }}
      />
    </StackCreateNavigator.Navigator >
  );
}

const MainDrawerNavigator = createDrawerNavigator();

export function MainDrawer() {
  return (
    <MainDrawerNavigator.Navigator initialRouteName="Main"
      drawerContentOptions={{
        activeTintColor: THEME.MAIN_COLOR,
        itemStyle: { marginVertical: 10 },
        labelStyle: { fontFamily: 'open-bold' }
      }}
    >
      <MainDrawerNavigator.Screen
        name="Main"
        component={MyTabs}
        options={{ drawerLabel: 'All Posts', drawerIcon: () => <Ionicons name="newspaper" size={25} /> }}
      />
      <MainDrawerNavigator.Screen
        name="About"
        component={StackAbout}
        options={{ drawerLabel: 'About App' }}
      />
      <MainDrawerNavigator.Screen
        name="Create"
        component={StackCreate}
        options={{ drawerLabel: 'Create Post' }}
      />
    </MainDrawerNavigator.Navigator>
  );
}