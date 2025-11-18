declare module '@zegocloud/zego-uikit-prebuilt-call-rn' {
    import React from 'react';

    export interface ZegoCallProps {
        appID: number;
        appSign?: string;
        token?: string;
        userID: string;
        userName: string;
        callID: string;
        onHangUp?: () => void;
        config?: any;
    }

    export default class ZegoUIKitPrebuiltCall extends React.Component<ZegoCallProps> {
        static init(APP_ID: number, APP_SIGN: string) {
            throw new Error('Method not implemented.');
        }
    }
}
