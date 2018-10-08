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
                    <Row style={{backgroundColor: "#4b86b4", padding: 10}}>
                        <Text style={{color: "white", fontWeight: "bold", fontSize: 14}}>PANTIN TARKISTUS</Text>
                    </Row>
                    <Row style={{padding: 20}}>
                        <ScanBarcodeButton disabled={AppSettingsDomainStore.isBarcodeScanDisabled}/>
                    </Row>
                    <Row style={{backgroundColor: "#4b86b4", padding: 10}}>
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
                    <Row>
                        <Grid style={{padding: 10}}>
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
                    <Row style={{backgroundColor: "#4b86b4", padding: 10}}>
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
                    <Row>
                        <FlatList
                            data={toJS(ProductDepositDomainStore.lastScanResultsSorted)}
                            ListHeaderComponent={(
                                <Grid style={{padding: 5, backgroundColor: "#87aecd"}}>
                                    <Col size={20}>
                                        <Text style={{fontSize: 15, color: "white", fontWeight: "bold"}}>Pantti</Text>
                                    </Col>
                                    <Col size={80}>
                                        <Text style={{fontSize: 15, color: "white", fontWeight: "bold"}}>Kuvaus</Text>
                                    </Col>
                                </Grid>
                            )}
                            renderItem={({item}) => (
                                <Grid style={{
                                    borderBottomColor: "#EEEEEE",
                                    borderBottomWidth: 1,
                                    padding: 5,
                                    borderStyle: "solid",
                                }}
                                >
                                    <Col size={20}>
                                        {
                                            item.deposit ?
                                            <Text style={{fontSize: 12, color: "green", fontWeight: "bold"}}>{item.deposit}</Text> :
                                            <Text style={{fontSize: 12, color: "#CCCCCC", fontWeight: "bold"}}>0 €</Text>
                                        }
                                    </Col>
                                    <Col size={80}>
                                        {item.productName && (
                                            <Text style={{fontSize: 12, color: "#989898", fontWeight: "bold"}}>
                                                {item.productName} ({item.productType})
                                            </Text>
                                        )}
                                        <Text style={{fontSize: 11, color: "#989898"}}>EAN: {item.ean}</Text>
                                        <Text
                                            style={{fontSize: 11, color: "#989898"}}>{moment(item.date).format("DD.MM.YYYY HH:mm:ss")}</Text>
                                    </Col>
                                </Grid>
                            )
                            }
                        />
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
