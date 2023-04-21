import {AppRegistry, Linking, ToastAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import {Incomingvideocall} from './incoming-call';
import RNCallKeep from 'react-native-callkeep';
import {name as appName} from './app.json';

const firebaseListener = async remoteMessage => {
  console.log(remoteMessage, 'remoteMessage');
  const {callerInfo, type} = JSON.parse(remoteMessage.data.info);
  console.log(callerInfo, type, 'type');
  if (type === 'CALL_INITIATED') {
    const incomingCallAnswer = ({callUUID}) => {
      Incomingvideocall.backToForeground();
      // Incomingvideocall.updateCallStatus({
      //   callerInfo,
      //   type: 'ACCEPTED',
      // });
      Incomingvideocall.endIncomingcallAnswer(callUUID);
      Linking.openURL('mychat://Calling').catch(err => {
        ToastAndroid.show('Error', err);
      });
    };

    const endIncomingCall = () => {
      Incomingvideocall.endIncomingcallAnswer();
    };

    Incomingvideocall.configure(incomingCallAnswer, endIncomingCall);
    Incomingvideocall.displayIncomingCall(callerInfo.name);
    Incomingvideocall.backToForeground();
  }
};

messaging().setBackgroundMessageHandler(firebaseListener);
AppRegistry.registerHeadlessTask(
  'RNCallKeepBackgroundMessage',
  () =>
    ({name, callUUID, handle}) => {
      console.log(name, callUUID, handle, 'from quit state');

      RNCallKeep.backToForeground();
      Incomingvideocall.displayIncomingCall(name);

      return Promise.resolve();
    },
);

RNCallKeep.addEventListener('answerCall', data => {
  console.log('answerCall index js event');
  RNCallKeep.endAllCalls();
  RNCallKeep.backToForeground();
});

RNCallKeep.addEventListener('endCall', data => {
  RNCallKeep.endAllCalls();
});

AppRegistry.registerComponent(appName, () => App);
