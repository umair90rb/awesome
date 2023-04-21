import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert, Linking, Platform } from "react-native";
import { PermissionsAndroid } from "react-native";
import messaging from '@react-native-firebase/messaging'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import OverlayPermissionModule from "videosdk-rn-android-overlay-permission";
import RNCallKeep from "react-native-callkeep";

function App() {
    const [loading, setLoading] = useState(true);

    const storeData = async (key: string, value) => {
        try {
          await AsyncStorage.setItem(key, value);
          return true;
        } catch (e) {
          console.log('error in writing', key, e);
        }
      }

      const getData = async (key: string) => {
        try {
          const value = await AsyncStorage.getItem(key)
          return value;
        } catch(e) {
          console.log('error in reading', key, e);
        }
      }

    const getToken = async () => {
        const fcmToken = await getData('fcmToken');
        if(fcmToken) {
            console.log(fcmToken, 'token from storage');
            return;
        }
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        await storeData('fcmToken', token);
        console.log(token);
    }

    useEffect(() => {
        const options = {
          ios: {
            appName: "VideoSDK",
          },
          android: {
            additionalPermissions: [],
            alertTitle: "Permissions required",
            alertDescription:
              "This application needs to access your phone accounts",
            cancelButton: "Cancel",
            okButton: "ok",
            imageName: "phone_account_icon",
          },
        };
        // RNCallKeep.setup(options);
        RNCallKeep.setAvailable(true);
    
        if (Platform.OS === "android") {
          OverlayPermissionModule.requestOverlayPermission();
        }
      }, []);

    useEffect(() => {
        const permissionRequest = PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
        console.log(permissionRequest, 'permissionRequest')

        getToken()

        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
            Linking.openURL('mychat://Calling')
          });

          messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
              'Notification caused app to open from background state:',
              remoteMessage,
            );
            Linking.openURL('mychat://Calling')
            Alert.alert('Notification caused app to open from background state', JSON.stringify(remoteMessage));
          });

          messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
          Alert.alert('Notification caused app to open from quit state:', JSON.stringify(remoteMessage));
        }
        console.log('loading false')
        setLoading(false);
    })
      
          return unsubscribe;

    }, [])

    if(loading) {
        return null;
    }

    return (
        <Navigation />
    );
}

function Navigation() {
    const Stack = createNativeStackNavigator();
    const linkingConfig = {
        prefixes: ['mychat://'],
        screens: {
          Home: 'home',
          Calling: 'calling'
        }
      }
    return (
        <NavigationContainer linking={linkingConfig}>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
            <Stack.Screen component={Home} name='Home' />
            <Stack.Screen component={Calling} name='Calling' />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function Home() {

    return (
        <View style={styles.container} >
            <Text>Home</Text>
        </View>
    );
}


function Calling() {
    return (
        <View style={styles.container} >
            <Text>Calling...</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default App;