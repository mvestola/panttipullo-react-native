import i18n from "i18n-js"
import React from "react"
import { observer } from "mobx-react"
import { Text, View, Button, Icon } from "native-base"
import { ScrollView } from "react-native"
import {ScanBarcodeButton} from "../common/view/ScanBarcodeButton"
import {TotalsView} from "./TotalsView"
import {MainStyles} from "./MainStyles"
import {NavigationActions} from "../app/actions/NavigationActions"

export const MainView = observer(() => (
    <ScrollView>
        <View style={MainStyles.sectionHeader}>
            <Text style={MainStyles.sectionHeaderText}>{i18n.t("depositCheck")}</Text>
        </View>
        <View style={{
            padding: 20, flex: 1, flexDirection: "row", alignItems: "center",
        }}
        >
            <ScanBarcodeButton />
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
                <Text>{i18n.t("latestScans")}</Text>
            </Button>

        </View>
    </ScrollView>
))
