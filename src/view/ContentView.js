import React from "react"
import {Col, Content, Grid, Spinner,} from "native-base"
import {observer} from "mobx-react"
import {StyleSheet} from "react-native"
import ProductDepositDomainStore from "../state/ProductDepositDomainStore"
import AppUiState from "../state/AppUiState"
import ProductDepositView from "./ProductDepositView"
import BarcodeScanner from "./BarcodeScanner"
import HelpView from "./HelpView"
import SettingsView from "./SettingsView"
import InfoView from "./InfoView"
import Advertisement from "./Advertisement"
import MainView from "./main/MainView"

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
        return <MainView/>
    }
    return null
}

const ContentView = observer(() => (
    <Content contentContainerStyle={styles.container}>
        <Advertisement />
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
