import React from "react"
import {observer} from "mobx-react"
import {Grid, Row, Text} from "native-base"
import AppSettingsDomainStore from "../settings/state/SettingsDomainStore"
import {ScrollView} from "react-native"
import ScanBarcodeButton from "../common/view/ScanBarcodeButton"
import TotalsView from "./TotalsView"
import RecentScansView from "./RecentScansView"
import MainStyles from "./MainStyles"

const MainView = observer(() => {
    return (
        <ScrollView>
            <Grid>
                <Row style={MainStyles.sectionHeader}>
                    <Text style={MainStyles.sectionHeaderText}>PANTIN TARKISTUS</Text>
                </Row>
                <Row style={{padding: 20}}>
                    <ScanBarcodeButton disabled={AppSettingsDomainStore.isBarcodeScanDisabled}/>
                </Row>
                <TotalsView/>
                <RecentScansView/>
            </Grid>
        </ScrollView>
    )
})

export default MainView
