import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';


type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
    const [userName, setUserName] = useState<string>('');
    const [userID, setUserID] = useState<string>('');
    const [callID, setCallID] = useState<string>('');

    useEffect(() => {
        return () => {
            setUserName('')
            setUserID('')
            setCallID('')
        }
    }, [])

    const handleStartCall = () => {
        navigation.navigate('VideoCall', { userName, userID, callID });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>ZEGOCLOUD Video Call App</Text>
            <TextInput
                style={styles.input}
                placeholder="User Name"
                value={userName}
                onChangeText={setUserName}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="User ID"
                value={userID}
                onChangeText={setUserID}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Caller ID (Room/Call ID)"
                value={callID}
                onChangeText={setCallID}
                autoCapitalize="none"
            />
            <Button
                title="Start Video Call"
                onPress={handleStartCall}
                disabled={!userID || !userName || !callID}
                color="#841584"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 18 },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 28 },
    input: { borderWidth: 1, borderColor: '#aaa', padding: 10, marginVertical: 8, width: '80%' },
});
