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
import moment from "moment";

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
                <Row style={{padding: 20}}>
                    <ScanBarcodeButton disabled={AppSettingsDomainStore.isBarcodeScanDisabled} />
                </Row>
                <Row style={{backgroundColor: "#E1E1D6", padding: 10}}>
                    <Text style={{color: "#989898"}}>TILASTOSI</Text>
                </Row>
                <Row>
                    <Grid style={{padding: 10}}>
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
                        ListHeaderComponent={<Grid style={{padding: 5, backgroundColor: "#EEEEEE"}}>
                            <Col size={20}>
                                <Text>Pantti</Text>
                            </Col>
                            <Col size={80}>
                                <Text>Kuvaus</Text>
                            </Col>
                        </Grid>}
                        renderItem={({item}) => {
                            return(
                                <Grid style={{borderBottomColor: "#EEEEEE", borderBottomWidth: 1, padding: 5,
                                    borderStyle: "solid"}}>
                                    <Col size={20}>
                                        <Text style={{fontSize: 10}}>{item.deposit || "0 €"}</Text>
                                    </Col>
                                    <Col size={80}>
                                        {item.productName && <Text style={{fontSize: 10}}>{item.productName} ({item.productType})</Text>}
                                        <Text style={{fontSize: 10}}>{item.ean}</Text>
                                        <Text style={{fontSize: 10}}>{moment(item.date).format("DD.MM.YYYY HH:mm:ss")}</Text>
                                    </Col>
                                </Grid>
                            )}
                        }
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
            {AppSettingsDomainStore.showAds && <AdMobBanner
                style={{borderBottomColor: "#011f4b", borderBottomWidth: 1, backgroundColor: "#005b96", padding: 0,
                    borderTopColor: "#011f4b", borderStyle: "solid", borderTopWidth: 1}}
                bannerSize="smartBannerPortrait"
                adUnitID="ca-app-pub-0260854390576047/9007788100"
                testDeviceID="EMULATOR"
                onDidFailToReceiveAdWithError={() => console.log("mainosten lataaminen epäonnistui")} />}
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
