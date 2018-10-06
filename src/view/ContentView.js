import React from 'react';
import {Content, Spinner, Grid, Col, Row, View, Text, Icon} from 'native-base';
import {observer} from "mobx-react"
import {StyleSheet} from 'react-native';
import ProductDepositDomainStore from "../state/ProductDepositDomainStore";
import AppUiState from "../state/AppUiState";
import AppSettingsDomainStore from "../state/AppSettingsDomainStore";
import ScanBarcodeButton from "./ScanBarcodeButton";
import ProductDepositView from "./ProductDepositView";
import AppNotification from "./AppNotification";
import BarcodeScanner from "./BarcodeScanner";
import HelpView from "./HelpView";

const getContent = () => {
    if (AppUiState.showBarcodeScanner) {
        return <BarcodeScanner />
    } else if (AppUiState.showLoadingSpinner) {
        return <Spinner color='blue' />
    } else if (AppUiState.showAppNotification) {
        return <AppNotification message={AppUiState.appNotificationText}/>
    } else if (AppUiState.showProductDepositResult) {
        return <ProductDepositView depositResponse={ProductDepositDomainStore.depositResponse} />
    } else if (AppUiState.showCameraButton) {
        return <View>
            <HelpView />
            <ScanBarcodeButton isDisabled={AppSettingsDomainStore.isBarcodeScanDisabled}/>
        </View>
    } else {
        return null
    }
}

const ContentView = observer(() => {
    return (
        <Content contentContainerStyle={styles.container} style={{padding: 10}}>
            <Grid style={{alignItems: 'center',justifyContent: 'center' }}>
                <Col>
                    {getContent()}
                </Col>
            </Grid>
        </Content>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ContentView
