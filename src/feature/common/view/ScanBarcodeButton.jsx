import i18n from "i18n-js"
import React from "react"
import { Button, Icon, Text } from "native-base"
import ProductDepositActions from "../../productDeposit/actions/ProductDepositActions"
import {ActivityIndicator} from "react-native"
import ProductDepositDomainStore from "../../productDeposit/state/ProductDepositDomainStore"
import AppSettingsDomainStore from "../../settings/state/SettingsDomainStore"
import {observer} from "mobx-react"

export const ScanBarcodeButton = observer(() => (
    <Button
        iconLeft
        disabled={AppSettingsDomainStore.isBarcodeScanDisabled}
        onPress={() => ProductDepositActions.scanBarcode()}
        style={{ backgroundColor: "#000000" }}
    >
        {ProductDepositDomainStore.barcodeScanIsInProgress ?
            <ActivityIndicator size="small" color="#ffffff" style={{ marginLeft: 20 }} /> :
            <Icon name="barcode-scan" type="MaterialCommunityIcons" />}
        <Text>{i18n.t("scanNewBarCode")}</Text>
    </Button>
))
