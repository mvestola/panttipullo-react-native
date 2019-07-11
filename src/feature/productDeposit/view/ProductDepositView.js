import React from "react"
import _ from "lodash"
import { StyleSheet } from "react-native"
import { Text } from "native-base"
import ProductDepositDomainStore from "../state/ProductDepositDomainStore"
import ProductDepositCard from "./ProductDepositResultCard"

const ProductDepositView = ({ depositResponse }) => {
    if (!_.isNil(depositResponse.deposit)) {
        return (
            <ProductDepositCard
                title="Tästä saa pantin!"
                titleStyle={styles.hasDepositTitle}
                iconStyle={styles.iconHasDeposit}
                iconName="check-circle"
                iconType="MaterialCommunityIcons"
            >
                <Text style={styles.depositValue}>
                    {`Pantin määrä: ${depositResponse.deposit}`}
                </Text>
                <Text style={styles.depositExtraInfo}>
                    {`EAN: ${depositResponse.ean}`}
                </Text>
                <Text style={styles.depositExtraInfo}>
                    {`Nimi: ${depositResponse.productName}`}
                </Text>
                <Text style={styles.depositExtraInfo}>
                    {`Tyyppi: ${depositResponse.productType}`}
                </Text>
                <Text style={[styles.depositExtraInfo, styles.depositExtraDesc]}>
                    {`Palpan kuvaus: "${depositResponse.message}"`}
                </Text>
            </ProductDepositCard>
        )
    }
        return (
            <ProductDepositCard
                title="Tästä ei ehkä saa panttia"
                titleStyle={styles.noDepositTitle}
                iconStyle={styles.iconHasNoDeposit}
                iconName="alert-circle"
                iconType="MaterialCommunityIcons"
            >
                <Text style={styles.depositExtraInfo}>
                    {`Viivakoodi: ${ProductDepositDomainStore.barcode}`}
                </Text>
                <Text style={[styles.depositExtraInfo, styles.depositExtraDesc]}>
                    {`Palpan kuvaus: "${depositResponse.message}"`}
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

export default ProductDepositView
