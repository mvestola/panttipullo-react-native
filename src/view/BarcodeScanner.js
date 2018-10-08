import React from "react"
import {StyleSheet} from "react-native"
import {BarCodeScanner} from "expo"
import ScanActions from "../actions/ProductDepositActions"

const handleBarCodeScanned = ({data}) => {
    ScanActions.barcodeScanComplete(data)
}

const BarcodeScanner = () => (
    <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={styles.scanner}
    />
)

const styles = StyleSheet.create({
    scanner: {
        flex: 1,
    },
})

export default BarcodeScanner
