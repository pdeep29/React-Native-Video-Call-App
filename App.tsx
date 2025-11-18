// // import React, { useEffect, useState } from 'react';
// // import {
// //   SafeAreaView,
// //   View,
// //   Text,
// //   TextInput,
// //   Button,
// //   StyleSheet,
// //   PermissionsAndroid,
// //   Platform
// // } from 'react-native';

// // import ZegoUIKitPrebuiltCall from "@zegocloud/zego-uikit-prebuilt-call-rn";

// // export default function App() {
// //   const [userID, setUserID] = useState("");
// //   const [inCall, setInCall] = useState(false);

// //   const APP_ID = 2011837722;
// //   const APP_SIGN = "6373f74bf33cb8cf1cd96c3447c275e34394056b71417c359b29408017b66d2f";

// //   const [userName, setUserName] = useState("User");
// //   const [callID, setCallID] = useState("room123");

// //   // Generate unique userID
// //   useEffect(() => {
// //     const randomID = "user" + Math.floor(Math.random() * 10000);
// //     setUserID(randomID);
// //   }, []);

// //   // ⭐ Initialize only the Prebuilt Call Kit
// //   useEffect(() => {
// //     ZegoUIKitPrebuiltCall.init(APP_ID, APP_SIGN);
// //   }, []);

// //   const requestPermissions = async () => {
// //     if (Platform.OS === "android") {
// //       const granted = await PermissionsAndroid.requestMultiple([
// //         PermissionsAndroid.PERMISSIONS.CAMERA,
// //         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
// //       ]);
// //       return (
// //         granted[PermissionsAndroid.PERMISSIONS.CAMERA] === "granted" &&
// //         granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === "granted"
// //       );
// //     }
// //     return true;
// //   };

// //   const startCall = async () => {
// //     const ok = await requestPermissions();
// //     if (!ok) return;
// //     setInCall(true);
// //   };

// //   if (inCall) {
// //     return (
// //       <View style={{ flex: 1 }}>
// //         {/* <ZegoUIKitPrebuiltCall
// //           appID={APP_ID}
// //           appSign={APP_SIGN}
// //           userID={userID}
// //           userName={userName}
// //           callID={callID}
// //           config={{
// //             ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
// //             onCallEnd: () => setInCall(false),
// //           }}
// //         /> */}
// //         <ZegoUIKitPrebuiltCall
// //           appID={APP_ID}
// //           appSign={APP_SIGN}
// //           userID={userID}
// //           userName={userName}
// //           callID={callID}

// //         />
// //       </View>
// //     );
// //   }

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <Text style={styles.header}>ZEGOCLOUD Call App</Text>

// //       <View style={styles.field}>
// //         <Text>User ID</Text>
// //         <TextInput style={styles.input} value={userID} onChangeText={setUserID} />
// //       </View>

// //       <View style={styles.field}>
// //         <Text>User Name</Text>
// //         <TextInput style={styles.input} value={userName} onChangeText={setUserName} />
// //       </View>

// //       <View style={styles.field}>
// //         <Text>Call ID</Text>
// //         <TextInput style={styles.input} value={callID} onChangeText={setCallID} />
// //       </View>

// //       <Button title="Start Call" onPress={startCall} />
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: 20, justifyContent: "center" },
// //   header: { fontSize: 22, fontWeight: "700", marginBottom: 25, textAlign: "center" },
// //   field: { marginBottom: 15 },
// //   input: { borderWidth: 1, borderRadius: 8, padding: 10, marginTop: 5 }
// // });
// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   PermissionsAndroid,
//   Platform,
//   SafeAreaView,
// } from "react-native";

// import ZegoExpressEngine, {
//   ZegoRoomConfig,
// } from "zego-express-engine-reactnative";

// const APP_ID = 2011837722;
// const APP_SIGN = "6373f74bf33cb8cf1cd96c3447c275e34394056b71417c359b29408017b66d2f";
// const ROOM_ID = "room1";

// export default function App() {
//   const engine = useRef<any>(null);

//   const [userID] = useState("user_" + Math.floor(Math.random() * 10000));
//   const [joined, setJoined] = useState(false);
//   const [remoteStreamID, setRemoteStreamID] = useState<string | null>(null);

//   const localViewRef = useRef(null);
//   const remoteViewRef = useRef(null);

//   // Create engine
//   useEffect(() => {
//     const init = async () => {
//       engine.current = await ZegoExpressEngine.createEngineWithProfile({
//         appID: APP_ID,
//         appSign: APP_SIGN,
//         scenario: 0,
//       });

//       addListeners();
//     };

//     init();

//     return () => {
//       ZegoExpressEngine.destroyEngine();
//     };
//   }, []);

//   const addListeners = () => {
//     engine.current.on(
//       "roomStreamUpdate",
//       (roomID: string, updateType: number, streamList: any[]) => {
//         console.log("Stream update:", updateType, streamList);

//         if (updateType === 0) {
//           const streamID = streamList[0].streamID;
//           setRemoteStreamID(streamID);

//           setTimeout(() => {
//             const tag = (remoteViewRef.current as any)?._nativeTag;
//             if (tag) {
//               engine.current.startPlayingStream(streamID, { reactTag: tag });
//             }
//           }, 500);
//         }
//       }
//     );
//   };

//   const requestPermission = async () => {
//     if (Platform.OS === "android") {
//       await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//       ]);
//     }
//   };

//   const startCall = async () => {
//     await requestPermission();

//     const config = new ZegoRoomConfig();
//     config.userID = userID;
//     config.userName = userID;

//     await engine.current.loginRoom(ROOM_ID, config);

//     setTimeout(() => {
//       const tag = (localViewRef.current as any)?._nativeTag;
//       if (tag) {
//         engine.current.startPreview({ reactTag: tag });
//       }
//     }, 500);

//     engine.current.startPublishingStream(userID);

//     setJoined(true);
//   };

//   const endCall = async () => {
//     if (remoteStreamID) {
//       engine.current.stopPlayingStream(remoteStreamID);
//     }

//     engine.current.stopPreview();
//     engine.current.stopPublishingStream();
//     engine.current.logoutRoom(ROOM_ID);

//     setJoined(false);
//     setRemoteStreamID(null);
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <Text style={{ margin: 10, fontSize: 20 }}>Zego Video Call (3.22.0)</Text>

//       {!joined ? (
//         <Button title="Join Call" onPress={startCall} />
//       ) : (
//         <>
//           <Text style={{ margin: 10 }}>You: {userID}</Text>

//           {/* Local Video */}
//           <View
//             ref={localViewRef}
//             style={{
//               width: "100%",
//               height: 250,
//               backgroundColor: "black",
//             }}
//           />

//           {/* Remote Video */}
//           <View
//             ref={remoteViewRef}
//             style={{
//               width: "100%",
//               height: 250,
//               marginTop: 10,
//               backgroundColor: "gray",
//             }}
//           />

//           <Button title="End Call" color="red" onPress={endCall} />
//         </>
//       )}
//     </SafeAreaView>
//   );
// }



// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './HomeScreen';
// import VideoCallScreen from './VideoCallScreen';

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="VideoCall" component={VideoCallScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// import React, { useState } from 'react';
// import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
// import { ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn';


// const APP_ID = 2011837722;
// const APP_SIGN = "6373f74bf33cb8cf1cd96c3447c275e34394056b71417c359b29408017b66d2f";
// const ROOM_ID = "room1";
// const USER_ID = 'user_' + Math.floor(Math.random() * 100000); // Replace or randomize as needed




// // App.js
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';


// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="VideoCall" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }



// export function HomeScreen() {
//   const [userName, setUserName] = useState('');
//   const [userID, setUserID] = useState('');
//   const [callID, setCallID] = useState('');
//   const [startCall, setStartCall] = useState(false);

//   // When startCall is true, render the call UI
//   if (startCall) {
//     return <VideoCallScreen userName={userName} userID={userID} callID={callID} onEndCall={() => setStartCall(false)} />;
//   }

//   return (
//     <View style={styles.containerh}>
//       <Text style={styles.header}>ZEGOCLOUD Video Call</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="User Name"
//         value={userName}
//         onChangeText={setUserName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="User ID"
//         value={userID}
//         onChangeText={setUserID}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Caller ID (Room/Call ID)"
//         value={callID}
//         onChangeText={setCallID}
//       />
//       <Button
//         title="Start Video Call"
//         onPress={() => setStartCall(true)}
//         disabled={!userID || !userName || !callID}
//       />
//     </View>
//   );
// }




// export function VideoCallScreen({ userName, userID, callID, onEndCall }) {
//   return (
//     <View style={styles.container}>
//       <ZegoUIKitPrebuiltCall
//         appID={APP_ID}
//         appSign={APP_SIGN}
//         userID={userID}
//         userName={userName}
//         callID={callID}
//         config={{
//           ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
//           onCallEnd: (callID, reason, duration) => {
//             // Invoke the callback to show home
//             if (onEndCall) onEndCall();
//           }
//         }}
//       />

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 0,
//   },
//   containerh: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 18 },
//   header: { fontSize: 22, fontWeight: 'bold', marginBottom: 28 },
//   input: { borderWidth: 1, borderColor: '#aaa', padding: 10, marginVertical: 8, width: '80%' },

// });


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import VideoCallScreen from './src/screens/VideoCallScreen';

export type RootStackParamList = {
  Home: undefined;
  VideoCall: {
    userName: string;
    userID: string;
    callID: string;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="VideoCall" component={VideoCallScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

