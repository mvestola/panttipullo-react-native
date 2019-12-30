import React from "react"
import { StyleSheet } from "react-native"
import { BarCodeScanner } from "expo-barcode-scanner"
import {ProductDepositActions} from "../../productDeposit/actions/ProductDepositActions"

const handleBarCodeScanned = ({ data }) => {
    ProductDepositActions.barcodeScanComplete(data)
}

export const BarcodeScanner = () => (
    <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={styles.scanner}
        barCodeTypes={[
            BarCodeScanner.Constants.BarCodeType.ean13,
            BarCodeScanner.Constants.BarCodeType.ean8,
            BarCodeScanner.Constants.BarCodeType.upc_a,
            BarCodeScanner.Constants.BarCodeType.upc_e,
        ]}
    />
)

const styles = StyleSheet.create({
    scanner: {
        flex: 1,
    },
})
