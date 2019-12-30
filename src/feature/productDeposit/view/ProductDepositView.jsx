import i18n from "i18n-js"
import React from "react"
import _ from "lodash"
import { StyleSheet } from "react-native"
import { Text } from "native-base"
import ProductDepositDomainStore from "../state/ProductDepositDomainStore"
import {ProductDepositCard} from "./ProductDepositResultCard"

export const ProductDepositView = ({ depositResponse }) => {
    if (!_.isNil(depositResponse.deposit)) {
        return (
            <ProductDepositCard
                title={i18n.t("thisHasDeposit")}
                titleStyle={styles.hasDepositTitle}
                iconStyle={styles.iconHasDeposit}
                iconName="check-circle"
                iconType="MaterialCommunityIcons"
            >
                <Text style={styles.depositValue}>
                    {`${i18n.t("depositAmount")}: ${depositResponse.deposit}`}
                </Text>
                <Text style={styles.depositExtraInfo}>
                    {`${i18n.t("ean")}: ${depositResponse.ean}`}
                </Text>
                <Text style={styles.depositExtraInfo}>
                    {`${i18n.t("productName")}: ${depositResponse.productName}`}
                </Text>
                <Text style={styles.depositExtraInfo}>
                    {`${i18n.t("productType")}: ${depositResponse.productType}`}
                </Text>
                <Text style={[styles.depositExtraInfo, styles.depositExtraDesc]}>
                    {`${i18n.t("palpaDescription")}: "${depositResponse.message}"`}
                </Text>
            </ProductDepositCard>
        )
    }
        return (
            <ProductDepositCard
                title={i18n.t("thisHasNoDeposit")}
                titleStyle={styles.noDepositTitle}
                iconStyle={styles.iconHasNoDeposit}
                iconName="alert-circle"
                iconType="MaterialCommunityIcons"
            >
                <Text style={styles.depositExtraInfo}>
                    {`${i18n.t("barcode")}: ${ProductDepositDomainStore.barcode}`}
                </Text>
                <Text style={[styles.depositExtraInfo, styles.depositExtraDesc]}>
                    {`${i18n.t("palpaDescription")}: "${depositResponse.message}"`}
                </Text>
            </ProductDepositCard>
        )
}

const styles = StyleSheet.create({
    hasDepositTitle: {
        color: "green",
        fontSize: 18,
    },
    noDepositTitle: {
        color: "red",
        fontSize: 18,
    },
    depositValue: {
        fontSize: 20,
        marginBottom: 20,
    },
    depositExtraInfo: {
        color: "#525252",
    },
    depositExtraDesc: {
        fontStyle: "italic",
        marginTop: 10,
    },
    iconHasDeposit: {
        fontSize: 26,
        color: "green",
    },
    iconHasNoDeposit: {
        fontSize: 26,
        color: "red",
    },
})
