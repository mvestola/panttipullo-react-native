import i18n from "i18n-js"
import React from "react"
import { observer } from "mobx-react"
import { StyleSheet } from "react-native"
import { Text, View } from "native-base"
import { ProductDepositDomainStore } from "../productDeposit/state/ProductDepositDomainStore"
import { ProductDepositActions } from "../productDeposit/actions/ProductDepositActions"
import { MainStyles } from "./MainStyles"
import { MainViewHeader } from "./MainViewHeader"
import { formatCurrency, formatPieces } from "../common/util/NumberFormatter"

const TotalsRow = ({ value, description }) => (
  <View style={styles.totals}>
    <Text style={[styles.totalsValue, styles.totalsFont]}>
      {value}
    </Text>
    <Text style={styles.totalsDesc}>{description}</Text>
  </View>
)

export const TotalsView = observer(() => (
  [
    <MainViewHeader title={i18n.t("stats")} onClear={() => ProductDepositActions.clearStats()} key="header" />,
    <View style={MainStyles.sectionContent} key="content">
      <View style={styles.totalsContainer}>
        <TotalsRow
          value={formatPieces(ProductDepositDomainStore.totalScanCount)}
          description={i18n.t("totalsScan")}
        />
        <TotalsRow
          value={formatPieces(ProductDepositDomainStore.totalScanHavingDeposit)}
          description={i18n.t("totalsWithDeposit")}
        />
        <TotalsRow
          value={formatPieces(ProductDepositDomainStore.totalScanCountNoDeposit)}
          description={i18n.t("totalsWithoutDeposit")}
        />
        <TotalsRow
          value={formatCurrency(ProductDepositDomainStore.totalDepositAmount)}
          description={i18n.t("totalsDeposits")}
        />
      </View>
    </View>,
  ]
))

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
  },
})
