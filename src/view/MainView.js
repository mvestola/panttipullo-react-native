import React from 'react';
import {StyleSheet, Button, Text, View} from 'react-native';
import {observer} from "mobx-react"
import ScanActions from "../actions/ProductDepositActions"
import AppUiState from "../state/AppUiState";
import ProductDepositDomainStore from "../state/ProductDepositDomainStore";
import { BarCodeScanner } from 'expo';
import {LOADED} from "../constants/domainStoreStatusConstants";
import ProductDepositView from "./ProductDepositView";

const handleBarCodeScanned = ({ type, data }) => {
    console.log('Barcode: ' + data);
    console.log('Type: ' + type);
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
            <View>
                <Button
                    style={{marginTop: 75}}
                    onPress={() => ScanActions.scanBarcode()}
                    title="Skannaa viivakoodi"
                    color="#841584"
                    accessibilityLabel="Skannaa viivakoodi"
                />
                {AppUiState.showLoadingSpinner ? <Text style={{color: 'red'}}>Ladataan...</Text> : null}
                {ProductDepositDomainStore.status === LOADED ? <ProductDepositView depositResponse={ProductDepositDomainStore.depositResponse} /> : null}
            </View>
        )
    }
})


export default MainView

