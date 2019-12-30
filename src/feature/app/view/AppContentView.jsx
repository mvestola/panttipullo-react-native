import React from "react"
import {
  Col, Grid, Spinner, View,
} from "native-base"
import { observer } from "mobx-react"
import { StyleSheet } from "react-native"
import { ProductDepositDomainStore } from "../../productDeposit/state/ProductDepositDomainStore"
import { AppUiState } from "../state/AppUiState"
import { ProductDepositView } from "../../productDeposit/view/ProductDepositView"
import { BarcodeScanner } from "../../scanner/view/BarcodeScanner"
import { HelpView } from "../../support/HelpView"
import { SettingsView } from "../../settings/view/SettingsView"
import { InfoView } from "../../support/InfoView"
import { Advertisement } from "../../common/view/Advertisement"
import { MainView } from "../../frontPage/MainView"
import { RecentScansView } from "../../frontPage/RecentScansView"

const getContent = () => {
  if (AppUiState.showLoadingSpinner) {
    return <Spinner color="blue" />
  }
  if (AppUiState.showBarcodeScanner) {
    return <BarcodeScanner />
  }
  if (AppUiState.showSettings) {
    return <SettingsView />
  }
  if (AppUiState.showInfo) {
    return <InfoView />
  }
  if (AppUiState.showHelp) {
    return <HelpView />
  }
  if (AppUiState.showRecentScans) {
    return <RecentScansView />
  }
  if (AppUiState.showProductDepositResult) {
    return <ProductDepositView depositResponse={ProductDepositDomainStore.depositResponse} />
  }
  return <MainView />
}

export const AppContentView = observer(() => (
  <View style={styles.container}>
    <Advertisement />
    <Grid style={{ alignItems: "flex-start", justifyContent: "center" }}>
      <Col>
        {getContent()}
      </Col>
    </Grid>
  </View>
))

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
})
