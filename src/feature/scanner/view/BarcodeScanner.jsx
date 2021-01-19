import React from "react"
import { StyleSheet } from "react-native"
import { BarCodeScanner } from "expo-barcode-scanner"
import { ProductDepositActions } from "../../productDeposit/actions/ProductDepositActions"

const allowedBarCodes = [
  BarCodeScanner.Constants.BarCodeType.ean13,
  BarCodeScanner.Constants.BarCodeType.ean8,
  BarCodeScanner.Constants.BarCodeType.upc_a,
  BarCodeScanner.Constants.BarCodeType.upc_e,
]

const handleBarCodeScanned = (event) => {
  if (!allowedBarCodes.includes(event.type)) {
    // barcode not allowed, ignore this event
    return
  }
  ProductDepositActions.barcodeScanComplete(event.data)
}

export const BarcodeScanner = () => (
  <BarCodeScanner
    onBarCodeScanned={handleBarCodeScanned}
    style={styles.scanner}
    barCodeTypes={allowedBarCodes}
  />
)

const styles = StyleSheet.create({
  scanner: {
    flex: 1,
  },
})
