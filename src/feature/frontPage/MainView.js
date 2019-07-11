import React from "react"
import { observer } from "mobx-react"
import { Text, View } from "native-base"
import { ScrollView } from "react-native"
import AppSettingsDomainStore from "../settings/state/SettingsDomainStore"
import ScanBarcodeButton from "../common/view/ScanBarcodeButton"
import TotalsView from "./TotalsView"
import RecentScansView from "./RecentScansView"
import MainStyles from "./MainStyles"

const MainView = observer(() => (
        <ScrollView>
            <View style={MainStyles.sectionHeader}>
                <Text style={MainStyles.sectionHeaderText}>PANTIN TARKISTUS</Text>
            </View>
            <View style={{ padding: 20 }}>
                <ScanBarcodeButton disabled={AppSettingsDomainStore.isBarcodeScanDisabled} />
            </View>
            <TotalsView />
            <RecentScansView />
        </ScrollView>
    ))

export default MainView
