import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn';



const APP_ID = 2011837722;
const APP_SIGN = '6373f74bf33cb8cf1cd96c3447c275e34394056b71417c359b29408017b66d2f';

export default function VideoCallScreen({ navigation, route }: any) {
    const { userName, userID, callID } = route.params;

    return (
        <View style={styles.container}>
            <ZegoUIKitPrebuiltCall
                appID={APP_ID}
                appSign={APP_SIGN}
                userID={userID}
                userName={userName}
                callID={callID}
                config={{
                    ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
                    onCallEnd: () => navigation.goBack(),
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', zIndex: 0 },
});
