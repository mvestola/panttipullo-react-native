import React from 'react';
import {Button} from 'react-native-elements'
import {StyleSheet, View} from "react-native";
import {BarCodeScanner} from 'expo';
import ScanActions from "../actions/ProductDepositActions"

const handleBarCodeScanned = ({ data }) => {
    ScanActions.barcodeScanComplete(data)
}

const BarcodeScanner = () => {
    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            backgroundColor: "black",
            padding: 10,
        }}>
            <BarCodeScanner
                onBarCodeScanned={handleBarCodeScanned}
                style={styles.scanner}
            />
            <Button
                large
                raised
                onPress={() => ScanActions.cancelBarcodeScan()}
                icon={{name: 'cancel', type: 'material'}}
                title='Takaisin' />
        </View>
    )
}

const styles = StyleSheet.create({
    scanner: {
        flex: 1,
        marginTop: 25,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
    }
});


export default BarcodeScanner

