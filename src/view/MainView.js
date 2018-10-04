import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {observer} from "mobx-react"
import AppUiState from "../state/AppUiState";
import ProductDepositDomainStore from "../state/ProductDepositDomainStore";
import ProductDepositView from "./ProductDepositView";
import ScanBarcodeButton from "./ScanBarcodeButton";
import AppSettingsDomainStore from "../state/AppSettingsDomainStore";
import AppNotification from "./AppNotification";
import BarcodeScanner from "./BarcodeScanner";

const MainView = observer(() => {
    if (AppUiState.showBarcodeScanner) {
        return <BarcodeScanner />
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
                {AppUiState.showCameraButton && <ScanBarcodeButton isDisabled={AppSettingsDomainStore.isBarcodeScanDisabled}/>}
            </View>
        )
    }
})

export default MainView
