import React from 'react';
import ScanActions from "../actions/ProductDepositActions"
import {Button, Icon, Text} from 'native-base';

const ScanBarcodeButton = ({ isDisabled }) => {
    return (
        <Button
            iconLeft
            disabled={isDisabled}
            onPress={() => ScanActions.scanBarcode()}
            style={{backgroundColor: '#1ebbd7'}}
        >
            <Icon name='barcode-scan' type='MaterialCommunityIcons' />
            <Text>Skannaa uusi viivakoodi</Text>
        </Button>
    )
}

export default ScanBarcodeButton
