import React from 'react';
import {Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import ScanActions from "../actions/ProductDepositActions"

const ScanBarcodeButton = () => {
    return (
        <View  style={{
            flexDirection: 'column',
            alignItems: 'center',
            padding: 20,
        }}>
            <Ionicons onPress={() => ScanActions.scanBarcode()} name="md-camera" size={64} color="black"/>
            <Text>Skannaa viivakoodi kameralla</Text>
        </View>
    )
}

export default ScanBarcodeButton

