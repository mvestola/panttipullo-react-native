import i18n from "i18n-js"
import React from "react"
import { Button, Icon, Text } from "native-base"
import { ActivityIndicator } from "react-native"
import { observer } from "mobx-react"
import { ProductDepositActions } from "../../productDeposit/actions/ProductDepositActions"
import { ProductDepositDomainStore } from "../../productDeposit/state/ProductDepositDomainStore"
import { SettingsDomainStore } from "../../settings/state/SettingsDomainStore"

export const ScanBarcodeButton = observer(() => (
  <Button
    iconLeft
    disabled={SettingsDomainStore.isBarcodeScanDisabled}
    onPress={() => ProductDepositActions.scanBarcode()}
    style={{ backgroundColor: "#000000", height: 80 }}
  >
    {ProductDepositDomainStore.barcodeScanIsInProgress
      ? <ActivityIndicator size="small" color="#ffffff" style={{ marginLeft: 20 }} />
      : <Icon name="barcode-scan" type="MaterialCommunityIcons" />}
    <Text>{i18n.t("scanNewBarCode")}</Text>
  </Button>
))
