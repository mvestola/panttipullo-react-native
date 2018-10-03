import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {observer} from "mobx-react"
import ScanActions from "../actions/ProductDepositActions"
import AppUiState from "../state/AppUiState";
import ProductDepositDomainStore from "../state/ProductDepositDomainStore";
import { BarCodeScanner } from 'expo';
import ProductDepositView from "./ProductDepositView";
import ScanBarcodeButton from "./ScanBarcodeButton";
import AppSettingsDomainStore from "../state/AppSettingsDomainStore";
import AppNotification from "./AppNotification";

const handleBarCodeScanned = ({ data }) => {
    ScanActions.barcodeScanComplete(data)
}

const MainView = observer(() => {
    if (ProductDepositDomainStore.barcodeScanIsInProgress) {
        return (
            <BarCodeScanner
                onBarCodeScanned={handleBarCodeScanned}
                style={StyleSheet.absoluteFill}
            />
        )
    } else if (AppUiState.showLoadingSpinner) {
        return <ActivityIndicator size="large" color="#0000ff" />
    } else {
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                margin: 10
            }}>
                {AppUiState.showAppNotification && <AppNotification message={AppUiState.appNotificationText} />}
                {AppUiState.showProductDepositResult && <ProductDepositView depositResponse={ProductDepositDomainStore.depositResponse} />}
                {AppUiState.showCameraButton && <ScanBarcodeButton isDisabled={!AppSettingsDomainStore.isAppEnabled}/>}
            </View>
        )
    }
})


export default MainView

