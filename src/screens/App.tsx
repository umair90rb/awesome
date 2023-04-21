import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinkingOptions, NavigationContainer, ParamListBase, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// import {configureStore} from 'react-redux'
import Todos from './Todos/Todos';
import { Provider } from 'react-redux';
import store from '../store';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function counter(state = 10, action: {type: string}) {
  console.log(action.type, state)
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state > 0 ? state - 1 : state;
    default:
      return state;
  }
}

// const store = createStore(counter)

const option = {headerTitle: (props) => "", headerTransparent: true}
const config = {
  prefixes: ['mychat://', 'http://mychat.com', 'https://mychat.com'],
  screens: {
    Home: 'home',
    Setting: 'setting',
    Profile: {
      path: 'profile/:user',
      parse: {
        user: (user: string) => `${user}-with-append`
      }

    }
  }
}
const getLinkingConfig = () => ({
  prefixes: ['mychat://', 'http://mychat.com', 'https://mychat.com'],
  config
});

function App(): JSX.Element {
  return <Provider store={store}>
    <Todos />
  </Provider>
}

function AppOld(): JSX.Element {
  const [auth, setAuth] = useState(true);
  return (
<NavigationContainer linking={getLinkingConfig()} fallback={<Text>Loading...</Text>}>
    <Navigation />
</NavigationContainer>
  );
}

function BottomTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Another' component={Home} />
      <Stack.Screen name='Bottom' component={TabScreen} />
    </Stack.Navigator>
  );
}

function TabScreen() {
  return (
    <Tab.Navigator screenOptions={{lazy: true}} initialRouteName='Profile' >
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Setting' component={Setting} />
      <Tab.Screen name='Profile' component={Profile} initialParams={{user:'bottom'}} />
    </Tab.Navigator>
  );
}

function Navigation() {
  return (
      <Stack.Navigator>
        <Stack.Screen component={Home} options={{...option, headerRight: () => <RightHeaderComponent />}} name='Home' />
        <Stack.Screen options={option} component={Setting} name='Setting' />
        <Stack.Screen options={{headerShown: true, headerBackVisible: true}} component={Profile} name='Profile' initialParams={{user: 'User'}} />
      </Stack.Navigator>
  );
}

function RightHeaderComponent() {
  
  return (
    <Text>{store.getState()}</Text>
  )
}

function Home({navigation}): JSX.Element {
  const [number, setNumber] = useState<Number>()
  
  useEffect(() => {
    const unsubscribe = store.subscribe(() => console.log('callback called'))
    return unsubscribe;
  }, [])

  return (
    <View style={styles.center}><Text>{store.getState()}</Text>
    <Button title='Increment' onPress={() => store.dispatch({type: 'increment'})} />
    <Button title='Decrement' onPress={() => store.dispatch({type: 'decrement'})} />
    <Button title='setting' onPress={() => navigation.navigate('Setting')} />
    </View>
  );
}

function Setting({route}): JSX.Element {
  useEffect(() => {
    console.log('Setting mounted!')
    return () => console.log('setting unmounted');
  }, [])

  return (
    <View style={[styles.center, styles.withBackground]}><Text>Setting</Text></View>
  );
}

function Profile({navigation, route}): JSX.Element {
  useEffect(() => console.log('Profile mounted!'))

  useEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => <Text>{route.params.user}</Text>
    })
  }, [])
  return (
    <View style={[styles.center, styles.withBackground]}><Text>Profile of {route.params.user}</Text></View>
  );
}
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  withBackground : {
    backgroundColor: 'transparent'
  }
})


export default App;
