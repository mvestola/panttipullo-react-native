import React from "react"
import {observer} from "mobx-react"
import {StyleSheet} from "react-native"
import {Row, Text, View} from "native-base"
import NumberFormatter from "../common/util/NumberFormatter"
import ProductDepositDomainStore from "../productDeposit/state/ProductDepositDomainStore"
import ProductDepositActions from "../productDeposit/actions/ProductDepositActions"
import MainStyles from "./MainStyles"
import MainViewHeader from "./MainViewHeader"

const TotalsRow = ({value, description}) => (
    <View style={styles.totals}>
        <Text style={[styles.totalsValue, styles.totalsFont]}>
            {value}
        </Text>
        <Text style={styles.totalsDesc}>{description}</Text>
    </View>
)

const TotalsView = observer(() => {
    return (
        [
            <MainViewHeader title="TILASTOSI" onClear={() => ProductDepositActions.clearStats()} key="header"/>,
            <Row style={MainStyles.sectionContent} key="content">
                <View style={styles.totalsContainer}>
                    <TotalsRow
                        value={NumberFormatter.formatPieces(ProductDepositDomainStore.totalScanCount)}
                        description="skannattu yhteensä"
                    />
                    <TotalsRow
                        value={NumberFormatter.formatPieces(ProductDepositDomainStore.totalScanHavingDeposit)}
                        description="pantillisia yhteensä"
                    />
                    <TotalsRow
                        value={NumberFormatter.formatPieces(ProductDepositDomainStore.totalScanCountNoDeposit)}
                        description="pantittomia yhteensä"
                    />
                    <TotalsRow
                        value={NumberFormatter.formatCurrency(ProductDepositDomainStore.totalDepositAmount)}
                        description="pantit yhteensä"
                    />
                </View>
            </Row>
        ]
    )
})

const styles = StyleSheet.create({
    totalsContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    totals: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    totalsFont: {
        color: "#989898",
    },
    totalsValue: {
        fontSize: 18,
    },
    totalsDesc: {
        color: "#989898",
        fontSize: 14,
        paddingLeft: 10,
    }
})

export default TotalsView
