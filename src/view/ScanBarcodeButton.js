import React from "react"
import {Button, Icon, Text} from "native-base"
import ScanActions from "../actions/ProductDepositActions"

const ScanBarcodeButton = ({isDisabled}) => (
    <Button
        iconLeft
        disabled={isDisabled}
        onPress={() => ScanActions.scanBarcode()}
        style={{backgroundColor: "#1ebbd7"}}
    >
        <Icon name="barcode-scan" type="MaterialCommunityIcons"/>
        <Text>Skannaa uusi viivakoodi</Text>
    </Button>
)

export default ScanBarcodeButton
