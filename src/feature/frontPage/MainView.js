import React from "react"
import { observer } from "mobx-react"
import { Text, View, Button, Icon } from "native-base"
import { ScrollView } from "react-native"
import AppSettingsDomainStore from "../settings/state/SettingsDomainStore"
import ScanBarcodeButton from "../common/view/ScanBarcodeButton"
import TotalsView from "./TotalsView"
import MainStyles from "./MainStyles"
import NavigationActions from "../app/actions/NavigationActions"

const MainView = observer(() => (
    <ScrollView>
        <View style={MainStyles.sectionHeader}>
            <Text style={MainStyles.sectionHeaderText}>PANTIN TARKISTUS</Text>
        </View>
        <View style={{
            padding: 20, flex: 1, flexDirection: "row", alignItems: "center",
        }}
        >
            <ScanBarcodeButton disabled={AppSettingsDomainStore.isBarcodeScanDisabled} />
        </View>
        <TotalsView />
        <View style={{
            padding: 20, flex: 1, flexDirection: "row", alignItems: "center",
        }}
        >
            <Button
                iconLeft
                onPress={() => NavigationActions.showRecentScans()}
            >
                <Icon name="history" type="MaterialCommunityIcons" />
                <Text>Viimeisimmät skannauksesi</Text>
            </Button>

        </View>
    </ScrollView>
))

export default MainView
