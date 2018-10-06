import React from 'react';
import ScanActions from "../actions/ProductDepositActions"
import {Button, Icon, Text} from 'native-base';

const ScanBarcodeButton = ({ isDisabled }) => {
    return (
        <Button
            iconLeft
            disabled={isDisabled}
            onPress={() => ScanActions.scanBarcode()}
            style={{alignSelf: "center"}}
        >
            <Icon name='barcode-scan' type='MaterialCommunityIcons' />
            <Text>Skannaa viivakoodi</Text>
        </Button>
    )
}

export default ScanBarcodeButton
