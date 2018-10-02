import React from 'react';
import ScanActions from "../actions/ProductDepositActions"
import { Button } from 'react-native-elements'

const ScanBarcodeButton = () => {
    return (
        <Button
            large
            raised
            backgroundColor="#2095F3"
            onPress={() => ScanActions.scanBarcode()}
            icon={{name: 'barcode-scan', type: 'material-community'}}
            title='Skannaa viivakoodi' />
    )
}

export default ScanBarcodeButton

