import React from "react"
import {
    Button, Col, Content, Grid, Icon, Row, Spinner, Text, View,
} from "native-base"
import {AdMobBanner} from "expo"
import {observer} from "mobx-react"
import {toJS} from "mobx"
import {FlatList, ScrollView, StyleSheet} from "react-native"
import moment from "moment"
import ProductDepositDomainStore from "../state/ProductDepositDomainStore"
import AppUiState from "../state/AppUiState"
import AppSettingsDomainStore from "../state/AppSettingsDomainStore"
import ScanBarcodeButton from "./ScanBarcodeButton"
import ProductDepositView from "./ProductDepositView"
import BarcodeScanner from "./BarcodeScanner"
import HelpView from "./HelpView"
import SettingsView from "./SettingsView"
import InfoView from "./InfoView"
import ProductDepositActions from "../actions/ProductDepositActions"
import NumberFormatter from "../util/NumberFormatter"
import RecentScanList from "./RecentScanList"

const getContent = () => {
    if (AppUiState.showBarcodeScanner) {
        return <BarcodeScanner/>
    } else if (AppUiState.showLoadingSpinner) {
        return <Spinner color="blue"/>
    } else if (AppUiState.showSettings) {
        return <SettingsView/>
    } else if (AppUiState.showInfo) {
        return <InfoView/>
    } else if (AppUiState.showHelp) {
        return <HelpView/>
    } else if (AppUiState.showProductDepositResult) {
        return <ProductDepositView depositResponse={ProductDepositDomainStore.depositResponse}/>
    } else {
        return (
            <ScrollView>
                <Grid>
                    <Row style={{backgroundColor: "#009A49", padding: 10}}>
                        <Text style={{color: "white", fontWeight: "bold", fontSize: 14}}>PANTIN TARKISTUS</Text>
                    </Row>
                    <Row style={{padding: 20}}>
                        <ScanBarcodeButton disabled={AppSettingsDomainStore.isBarcodeScanDisabled}/>
                    </Row>
                    <Row style={{backgroundColor: "#009A49", padding: 10}}>
                        <View style={{
                            flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center",
                        }}
                        >
                            <Text style={{color: "white", fontWeight: "bold", fontSize: 14}}>TILASTOSI</Text>
                            <Button
                                small
                                onPress={() => ProductDepositActions.clearStats()}
                                style={{backgroundColor: "#c30101"}}
                            >
                                <Icon name="delete-forever" type="MaterialCommunityIcons"/>
                            </Button>
                        </View>
                    </Row>
                    <Row style={{backgroundColor: "white", padding: 10}}>
                        <Grid>
                            <Row>
                                <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                                    <Text style={{color: "#989898", fontSize: 18}}>{NumberFormatter.formatPieces(ProductDepositDomainStore.totalScanCount)}</Text>
                                    <Text style={{color: "#989898", fontSize: 14, paddingLeft: 10}}>skannattu yhteensä</Text>
                                </View>
                            </Row>
                            <Row>
                                <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                                    <Text style={{color: "#989898", fontSize: 18}}>{NumberFormatter.formatPieces(ProductDepositDomainStore.totalScanHavingDeposit)}</Text>
                                    <Text style={{color: "#989898", fontSize: 14, paddingLeft: 10}}>skannattu pantillisia yhteensä</Text>
                                </View>
                            </Row>
                            <Row>
                                <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                                    <Text style={{color: "#989898", fontSize: 18}}>{NumberFormatter.formatPieces(ProductDepositDomainStore.totalScanCountNoDeposit)}</Text>
                                    <Text style={{color: "#989898", fontSize: 14, paddingLeft: 10}}>skannattu pantittomia yhteensä</Text>
                                </View>
                            </Row>
                            <Row>
                                <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                                    <Text style={{color: "#989898", fontSize: 18}}>{NumberFormatter.formatCurrency(ProductDepositDomainStore.totalDepositAmount)}</Text>
                                    <Text style={{color: "#989898", fontSize: 14, paddingLeft: 10}}>pantit yhteensä</Text>
                                </View>
                            </Row>
                        </Grid>
                    </Row>
                    <Row style={{backgroundColor: "#009A49", padding: 10}}>
                        <View style={{
                            flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center",
                        }}
                        >
                            <Text style={{color: "white", fontWeight: "bold", fontSize: 14}}>VIIMEISIMMÄT
                                SKANNAUKSESI</Text>
                            <Button
                                small
                                onPress={() => ProductDepositActions.clearRecentScans()}
                                style={{backgroundColor: "#c30101"}}
                            >
                                <Icon name="delete-forever" type="MaterialCommunityIcons"/>
                            </Button>
                        </View>
                    </Row>
                    <Row style={{backgroundColor: "white", padding: 5}}>
                        <RecentScanList/>
                    </Row>
                </Grid>
            </ScrollView>
        )
    }
    return null
}

const ContentView = observer(() => (
    <Content contentContainerStyle={styles.container}>
        {AppSettingsDomainStore.showAds && (
            <AdMobBanner
                style={{
                    backgroundColor: "#EEEEEE",
                }}
                bannerSize="smartBannerPortrait"
                adUnitID="ca-app-pub-0260854390576047/9007788100"
                testDeviceID="EMULATOR"
            />
        )}
        <Grid style={{alignItems: "flex-start", justifyContent: "center"}}>
            <Col>
                {getContent()}
            </Col>
        </Grid>
    </Content>
))

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
    },
})

export default ContentView
