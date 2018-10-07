import React from 'react';
import {Content, Spinner, Grid, Col, Row, View, Text, Icon} from 'native-base';
import {AdMobBanner} from 'expo';
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
import SettingsView from "./SettingsView";
import InfoView from "./InfoView";

const getContent = () => {
    if (AppUiState.showBarcodeScanner) {
        return <BarcodeScanner />
    } else if (AppUiState.showLoadingSpinner) {
        return <Spinner color='blue' />
    } else if (AppUiState.showSettings) {
        return <SettingsView />
    } else if (AppUiState.showInfo) {
        return <InfoView />
    } else if (AppUiState.showHelp) {
        return <HelpView />
    } else if (AppUiState.showAppNotification) {
        return <AppNotification message={AppUiState.appNotificationText}/>
    } else if (AppUiState.showProductDepositResult) {
        return <ProductDepositView depositResponse={ProductDepositDomainStore.depositResponse} />
    } else if (AppUiState.showCameraButton) {
        return <View>
            <ScanBarcodeButton isDisabled={AppSettingsDomainStore.isBarcodeScanDisabled}/>
        </View>
    } else {
        return null
    }
}

const ContentView = observer(() => {
    return (
        <Content contentContainerStyle={styles.container}>
            <AdMobBanner
                style={{borderBottomColor: "#011f4b", borderBottomWidth: 1, backgroundColor: "#005b96", padding: 0,
                    borderTopColor: "#011f4b", borderStyle: "solid", borderTopWidth: 1}}
                bannerSize="smartBannerPortrait"
                adUnitID="ca-app-pub-0260854390576047/9007788100"
                testDeviceID="EMULATOR"
                onDidFailToReceiveAdWithError={() => alert("mainosten lataaminen epäonnistui")} />
            <Grid style={{alignItems: 'flex-start', justifyContent: 'center', padding: 10 }}>
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
        backgroundColor: '#b3cde0',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ContentView
