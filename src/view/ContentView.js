import React from 'react';
import Modal from "react-native-modal";
import {
    Content,
    Spinner,
    Grid,
    Col,
    Row,
    View,
    Text,
    Icon,
    List,
    ListItem,
    Left,
    Card,
    CardItem,
    Body
} from 'native-base';
import {AdMobBanner} from 'expo';
import {observer} from "mobx-react"
import {toJS} from "mobx"
import {FlatList, ScrollView, StyleSheet} from 'react-native';
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
import ScanActions from "../actions/ProductDepositActions";

const getContent = () => {
    if (AppUiState.showBarcodeScanner) {
        return <BarcodeScanner />
    } else if (AppUiState.showLoadingSpinner) {
        return <Spinner color='blue' />
    } else if (AppUiState.showSettings) {
        return <SettingsView />
    } else if (AppUiState.showInfo) {
        return <Modal isVisible={true}>
                <View style={{ flex: 1 }}>
                    <InfoView />
                </View>
            </Modal>
    } else if (AppUiState.showHelp) {
        return <HelpView />
    } else if (AppUiState.showAppNotification) {
        return <AppNotification message={AppUiState.appNotificationText}/>
    } else if (AppUiState.showProductDepositResult) {
        return <ProductDepositView depositResponse={ProductDepositDomainStore.depositResponse} />
    } else if (AppUiState.showCameraButton) {
        return <ScrollView>
            <Grid>
                <Row style={{backgroundColor: "#E1E1D6", padding: 10}}>
                    <Text style={{color: "#989898", fontFamily: 'Roboto' }}>PANTIN TARKISTUS</Text>
                </Row>
                <Row>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', padding: 20}}>
                        <Icon name='barcode-scan' type='MaterialCommunityIcons' style={{fontSize: 26, color: '#989898'}} />
                        <Text onPress={() => ScanActions.scanBarcode()} style={{color: "#989898", fontSize: 12, marginLeft: 10}}>Skannaa uusi viivakoodi juomapakkauksesta</Text>
                    </View>
                </Row>
                <Row style={{backgroundColor: "#E1E1D6", padding: 10}}>
                    <Text style={{color: "#989898"}}>TILASTOSI</Text>
                </Row>
                <Row>
                    <Grid>
                        <Row><Text>Skannattu yhteensä: {ProductDepositDomainStore.totalScanCount}</Text></Row>
                        <Row><Text>Skannattu pantilliset yhteensä: {ProductDepositDomainStore.totalScanHavingDeposit}</Text></Row>
                        <Row><Text>Skannattu pantittomat yhteensä: {ProductDepositDomainStore.totalScanCountNoDeposit}</Text></Row>
                        <Row><Text>Skannatut pantit yhteensä: {ProductDepositDomainStore.totalDepositAmount}</Text></Row>
                    </Grid>
                </Row>
                <Row style={{backgroundColor: "#E1E1D6", padding: 10}}>
                    <Text style={{color: "#989898"}}>VIIMEISIMMÄT SKANNAUKSET</Text>
                </Row>
                <Row style={{padding: 10}}>
                    <FlatList
                        data={toJS(ProductDepositDomainStore.lastScanResults)}
                        renderItem={({item}) => <Text>{item.productName} {item.deposit}</Text>}
                    />
                </Row>
            </Grid>
        </ScrollView>
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
            <Grid style={{alignItems: 'flex-start', justifyContent: 'center' }}>
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
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ContentView
