import React from "react"
import {Button, Icon, Text} from "native-base"
import ScanActions from "../../productDeposit/actions/ProductDepositActions"

const ScanBarcodeButton = ({isDisabled}) => (
    <Button
        iconLeft
        disabled={isDisabled}
        onPress={() => ScanActions.scanBarcode()}
        style={{backgroundColor: "#000000"}}
    >
        <Icon name="barcode-scan" type="MaterialCommunityIcons"/>
        <Text>Skannaa uusi viivakoodi</Text>
    </Button>
)

export default ScanBarcodeButton