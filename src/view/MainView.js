import React from 'react';
import {StyleSheet, Button, Text, View, ActivityIndicator} from 'react-native';
import {observer} from "mobx-react"
import ScanActions from "../actions/ProductDepositActions"
import AppUiState from "../state/AppUiState";
import ProductDepositDomainStore from "../state/ProductDepositDomainStore";
import { BarCodeScanner } from 'expo';
import ProductDepositView from "./ProductDepositView";
import ScanBarcodeButton from "./ScanBarcodeButton";

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
    } else {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10
            }}>
                {AppUiState.showCameraButton && <ScanBarcodeButton />}
                {AppUiState.showLoadingSpinner && <ActivityIndicator size="large" color="#0000ff" />}
                {AppUiState.showProductDepositResult && <ProductDepositView depositResponse={ProductDepositDomainStore.depositResponse} />}
            </View>
        )
    }
})


export default MainView

