import {AppRegistry, Linking, NativeModules} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import {Incomingvideocall} from './incoming-call'

import {name as appName} from './app.json';


const firebaseListener = async (remoteMessage) => {
    console.log(remoteMessage, "remoteMessage");
    const { callerInfo, type } = JSON.parse(
      remoteMessage.data.info
    );
    console.log(callerInfo, type)
    if (type === "CALL_INITIATED") {
      const incomingCallAnswer = ({ callUUID }) => {
        Incomingvideocall.backToForeground();
        updateCallStatus({
          callerInfo,
          type: "ACCEPTED",
        });
        Incomingvideocall.endIncomingcallAnswer(callUUID);
        Linking.openURL(
          `mychat://Calling`
        ).catch((err) => {
          Toast.show(`Error`, err);
        });
      };
  
      const endIncomingCall = () => {
        Incomingvideocall.endIncomingcallAnswer();
        updateCallStatus({ callerInfo, type: "REJECTED" });
      };
  
      Incomingvideocall.configure(incomingCallAnswer, endIncomingCall);
      Incomingvideocall.displayIncomingCall(callerInfo.name);
      Incomingvideocall.backToForeground();
    }
  };
  
  // Register background handler
  messaging().setBackgroundMessageHandler(firebaseListener);

  

AppRegistry.registerComponent(appName, () => App);
